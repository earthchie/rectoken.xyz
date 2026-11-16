#!/usr/bin/env node
/**
 * Build-time OG image generator (1200×630).
 *
 *   node scripts/generate-og.mjs
 *
 * Outputs PNGs to public/og/. Run again whenever the template or copy changes.
 * Uses Satori + Resvg with self-hosted TTF fonts (Resvg cannot read WOFF2).
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = resolve(process.cwd());
const outDir = join(root, 'public', 'og');
mkdirSync(outDir, { recursive: true });

const regular = readFileSync(join(root, 'src/assets/fonts/IBMPlexSansThai-Regular.ttf'));
const semibold = readFileSync(join(root, 'src/assets/fonts/IBMPlexSansThai-SemiBold.ttf'));
const bold = readFileSync(join(root, 'src/assets/fonts/IBMPlexSansThai-Bold.ttf'));

const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#0b1610"/><path d="M19.1 4.6 8.7 18.2h5.2l-.7 9.3L24 13.4h-5.6l.7-8.8Z" fill="#c6f24e"/></svg>`;
const mark = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString('base64')}`;

const h = (type, style, children, extra = {}) => ({
  type,
  props: { style: { display: 'flex', ...style }, children, ...extra },
});

function template({ kicker, title, subtitle, locale }) {
  const brandSub = locale === 'th' ? 'โดย บล็อกเอจ' : 'BY BLOCKEDGE';
  const footer =
    locale === 'th'
      ? '1 โทเคน = 1 MWh · รองรับด้วย I-REC · ThaiFi'
      : '1 token = 1 MWh · I-REC backed · ThaiFi';
  const issuer = locale === 'th' ? 'บริษัท บล็อกเอจ จำกัด' : 'BlockEdge Co., Ltd.';

  return h(
    'div',
    {
      width: '1200px',
      height: '630px',
      position: 'relative',
      flexDirection: 'column',
      background: '#070f0a',
      color: '#f1f7f3',
      overflow: 'hidden',
      fontFamily: 'Plex',
    },
    [
      // grid
      h('div', {
        position: 'absolute',
        inset: '0',
        backgroundImage:
          'linear-gradient(to right, rgba(197,232,212,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(197,232,212,0.09) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        opacity: 0.9,
      }),
      // glows
      h('div', {
        position: 'absolute',
        right: '-140px',
        top: '-180px',
        width: '620px',
        height: '620px',
        borderRadius: '50%',
        backgroundImage: 'radial-gradient(circle, rgba(198,242,78,0.24), rgba(198,242,78,0))',
      }),
      h('div', {
        position: 'absolute',
        left: '-160px',
        bottom: '-220px',
        width: '560px',
        height: '560px',
        borderRadius: '50%',
        backgroundImage: 'radial-gradient(circle, rgba(120,200,110,0.16), rgba(120,200,110,0))',
      }),

      // top row
      h('div', { position: 'absolute', top: '44px', left: '64px', right: '64px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, [
        h('div', { flexDirection: 'row', alignItems: 'center', gap: '14px' }, [
          h('img', { width: '42px', height: '42px', borderRadius: '9px' }, undefined, { src: mark }),
          h('div', { flexDirection: 'column' }, [
            h('div', { fontSize: '21px', fontWeight: 700, letterSpacing: '-0.02em' }, 'RECTOKEN'),
            h('div', { fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.16em', color: '#7f9480' }, brandSub),
          ]),
        ]),
        h('div', { width: '340px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#d9ff6a', textAlign: 'right', justifyContent: 'flex-end' }, kicker),
      ]),

      // middle
      h('div', { position: 'absolute', top: '176px', left: '64px', right: '64px', flexDirection: 'column', gap: '14px' }, [
        h('div', { width: '52px', height: '3px', background: '#d9ff6a', borderRadius: '2px' }, ''),
        h('div', { fontSize: locale === 'th' ? '48px' : '50px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.035em', maxWidth: '1040px' }, title),
        h('div', { fontSize: '21px', fontWeight: 400, lineHeight: 1.4, color: '#a5b99a', maxWidth: '900px' }, subtitle),
      ]),

      // bottom
      h('div', { position: 'absolute', bottom: '34px', left: '64px', right: '64px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(198,242,78,0.16)', paddingTop: '16px' }, [
        h('div', { flexDirection: 'column', gap: '5px' }, [
          h('div', { fontSize: '15px', fontWeight: 600, color: '#f0f7ea' }, footer),
          h('div', { fontSize: '12px', color: '#7f9480' }, issuer),
        ]),
        h('div', { fontSize: '14px', fontWeight: 700, color: '#d9ff6a' }, 'rectoken.xyz'),
      ]),
    ]
  );
}

const images = [
  {
    file: 'default.png',
    locale: 'en',
    kicker: 'REGULATORY EVIDENCE · LIVE DATA',
    title: 'Verified megawatt-hours, on-chain.',
    subtitle: 'REC Token is a blockchain-based digital twin of I-RECs. 1 token = 1 MWh, locked in the registry and traceable to retirement.',
  },
  {
    file: 'default-th.png',
    locale: 'th',
    kicker: 'หลักฐานเพื่อการกำกับ · ข้อมูลสด',
    title: 'เมกะวัตต์ชั่วโมงที่ตรวจสอบแล้ว บนบล็อกเชน',
    subtitle: 'REC Token คือตัวแทนดิจิทัลบนบล็อกเชนของ I-REC 1 โทเคน = 1 MWh ล็อกในทะเบียนและตรวจสอบได้จนถึงการเกษียณ',
  },
  {
    file: 'home-en.png',
    locale: 'en',
    kicker: 'UTILITY TOKEN · I-REC · THAFI',
    title: 'The verified megawatt-hour, on-chain.',
    subtitle: 'Issued 1:1 against locked I-RECs. Redeemable, auditable and built for regulator-grade scrutiny.',
  },
  {
    file: 'home-th.png',
    locale: 'th',
    kicker: 'ยูทิลิตี้โทเคน · I-REC · THAIFI',
    title: 'เมกะวัตต์ชั่วโมงที่ตรวจสอบแล้ว บนบล็อกเชน',
    subtitle: 'ออก 1:1 เทียบกับ I-REC ที่ล็อก แลกคืนได้ ตรวจสอบได้ และพร้อมสำหรับการตรวจสอบระดับหน่วยงานกำกับ',
  },
  {
    file: 'compliance-en.png',
    locale: 'en',
    kicker: 'SEC · AMLO · T-VER',
    title: 'Built for scrutiny, not just the homepage.',
    subtitle: 'Issuer, classification, controls, custody and appeals - with the primary source for every statement.',
  },
  {
    file: 'compliance-th.png',
    locale: 'th',
    kicker: 'ก.ล.ต. · ปปง. · T-VER',
    title: 'ออกแบบมาเพื่อการตรวจสอบ',
    subtitle: 'ผู้ออก การจำแนก การควบคุม การดูแลทรัพย์สิน และการอุทธรณ์ พร้อมแหล่งต้นฉบับของทุกข้อความ',
  },
  {
    file: 'whitepaper-en.png',
    locale: 'en',
    kicker: 'PRIMARY SOURCE · VERSION 1.0',
    title: 'Whitepaper v1.0',
    subtitle: '48 pages on token design, governance, operating model, risk factors and glossary.',
  },
  {
    file: 'whitepaper-th.png',
    locale: 'th',
    kicker: 'ต้นฉบับหลัก · เวอร์ชัน 1.0',
    title: 'ไวท์เปเปอร์ v1.0',
    subtitle: '48 หน้าว่าด้วยการออกแบบโทเคน การกำกับดูแล โมเดลการดำเนินงาน ความเสี่ยง และอภิธานศัพท์',
  },
  {
    file: 'data-en.png',
    locale: 'en',
    kicker: 'LIVE TRANSPARENCY',
    title: 'Numbers read from chain, not from a slide.',
    subtitle: 'Pool supply, retirements and bridged balances, read from ThaiFi and public chains.',
  },
  {
    file: 'data-th.png',
    locale: 'th',
    kicker: 'ความโปร่งใสสด',
    title: 'ตัวเลขที่อ่านจากเชน ไม่ใช่จากสไลด์',
    subtitle: 'อุปทานพูล การเกษียณ และยอดเชื่อมข้าม อ่านจาก ThaiFi และเชนสาธารณะ',
  },
  {
    file: 'projects-en.png',
    locale: 'en',
    kicker: 'TOKENISED PROJECTS',
    title: 'Hydropower, verified project by project.',
    subtitle: 'Southeast Asian hydropower projects backing the Central Pool, with REDEX origin checks.',
  },
  {
    file: 'projects-th.png',
    locale: 'th',
    kicker: 'โครงการที่แปลงเป็นโทเคน',
    title: 'พลังน้ำ ทวนสอบทีละโครงการ',
    subtitle: 'โครงการพลังน้ำในเอเชียตะวันออกเฉียงใต้ที่รองรับ Central Pool พร้อมลิงก์ตรวจสอบแหล่งกำเนิดจาก REDEX',
  },
];

const fonts = [
  { name: 'Plex', data: regular, weight: 400, style: 'normal' },
  { name: 'Plex', data: semibold, weight: 600, style: 'normal' },
  { name: 'Plex', data: bold, weight: 700, style: 'normal' },
];

for (const image of images) {
  const svg = await satori(template(image), { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(join(outDir, image.file), png);
  console.log(`\u2713 public/og/${image.file}`);
}

console.log(`\n${images.length} OG images written to public/og/`);
