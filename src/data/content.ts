import type { Bi } from './whitepaper';
import {
  LIFECYCLE,
  STANDARDS,
  WHY,
  COMPARISON,
  ASSET_SECTION,
} from './home';
import {
  GOVERNANCE_PRINCIPLES,
  RECONCILIATION,
  CONTROL_MECHANISMS,
  APPEAL_STEPS,
  CUSTODY_POINTS,
} from './compliance';
import {
  CHAPTERS,
  WHITEPAPER_TOC,
  GLOSSARY,
  EXECUTIVE_FACTS,
} from './whitepaper';
import { CONTRACTS, MARKET, SITE } from './site';

export type Block =
  | { type: 'prose'; id: string; title: Bi; body: Bi[]; bullets?: Bi[] }
  | {
      type: 'cards';
      id: string;
      title: Bi;
      intro?: Bi;
      columns?: 2 | 3;
      items: Array<{ icon: string; title: Bi; body: Bi; tag?: Bi }>;
    }
  | { type: 'facts'; id: string; title: Bi; intro?: Bi; rows: Array<{ label: Bi; value: Bi; note?: Bi }> }
  | { type: 'table'; id: string; title: Bi; intro?: Bi; columns: Bi[]; rows: Bi[][]; note?: Bi }
  | { type: 'steps'; id: string; title: Bi; intro?: Bi; items: Array<{ no: string; title: Bi; body: Bi; who?: Bi }> }
  | { type: 'accordion'; id: string; title: Bi; intro?: Bi; items: Array<{ q: Bi; a: Bi }> }
  | {
      type: 'links';
      id: string;
      title: Bi;
      intro?: Bi;
      items: Array<{ title: Bi; body: Bi; href: string; meta?: Bi; external?: boolean }>;
    }
  | { type: 'callout'; kind: 'info' | 'warning' | 'danger' | 'brand'; title: Bi; body: Bi }
  | { type: 'contracts'; id: string; title: Bi; intro?: Bi }
  | { type: 'partners'; id: string; title: Bi; intro?: Bi }
  | { type: 'team'; id: string; title: Bi; intro?: Bi }
  | { type: 'glossary'; id: string; title: Bi; intro?: Bi }
  | { type: 'risk'; id: string; title: Bi; intro?: Bi }
  | { type: 'toc'; id: string; title: Bi; intro?: Bi }
  | { type: 'frameworks'; id: string; title: Bi; intro?: Bi };

export type PageDoc = {
  slug: string;
  hero: {
    eyebrow: Bi;
    title: Bi;
    description: Bi;
    chips?: Bi[];
    warning?: Bi;
  };
  actions?: Array<{ label: Bi; href: string; variant?: string; external?: boolean }>;
  blocks: Block[];
};

const t = (en: string, th: string): Bi => ({ en, th });

const legalIndex = [
  { label: t('Whitepaper v1.1', 'ไวท์เปเปอร์ v1.1'), value: t('48 pages, PDF', '48 หน้า, PDF'), note: t('Primary source document', 'เอกสารต้นฉบับหลัก') },
  { label: t('Monthly reports', 'รายงานรายเดือน'), value: t('Monthly, PDF', 'รายเดือน, PDF'), note: t('Portfolio and reconciliation', 'พอร์ตและการกระทบยอด') },
  { label: t('Issuer liability announcement', 'ประกาศความรับผิดของผู้ออก'), value: t('Statement', 'แถลงการณ์'), note: t('Legal disclosure', 'การเปิดเผยทางกฎหมาย') },
  { label: t('Terms of service', 'ข้อกำหนดการให้บริการ'), value: t('Policy', 'นโยบาย'), note: t('Governing law: Thailand', 'กฎหมายที่ใช้บังคับ: ไทย') },
];

export const CONTENT_PAGES: Record<string, PageDoc> = {
  about: {
    slug: 'about',
    hero: {
      eyebrow: t('The asset', 'สินทรัพย์'),
      title: t('What REC Token is - and what it is not.', 'REC Token คืออะไร และไม่ใช่อะไร'),
      description: t(
        'REC Token makes a registry-verified renewable energy certificate easier to hold, transfer and retire. It does not create a new environmental asset, and it does not change what the certificate proves.',
        'REC Token ทำให้การถือ โอน และไถ่ถอนใบรับรองพลังงานหมุนเวียนที่ผ่านการทวนสอบในทะเบียนทำได้ง่ายขึ้น โดยไม่ได้สร้างสินทรัพย์ด้านสิ่งแวดล้อมใหม่หรือเปลี่ยนสิ่งที่ใบรับรองพิสูจน์'
      ),
      chips: [t('I-REC backed', 'รองรับด้วย I-REC'), t('1 token = 1 MWh', '1 โทเคน = 1 MWh'), t('ThaiFi', 'ThaiFi')],
    },
    actions: [
      { label: t('Read the whitepaper', 'อ่านไวท์เปเปอร์'), href: 'whitepaper', variant: 'primary' },
      { label: t('Claims & eligibility', 'การกล่าวอ้างและสิทธิ์'), href: 'compliance/claims' },
    ],
    blocks: [
      {
        type: 'prose',
        id: 'why',
        title: t('Why tokenise a certificate at all?', 'ทำไมต้องแปลงใบรับรองเป็นโทเคน'),
        body: [
          t(
            'Global demand for renewable electricity and Energy Attribute Certificates keeps rising, driven by regulators, investors and consumers seeking tangible climate action. The traditional certificate market still faces three structural problems: limited traceability that creates double-counting risk, complex and inefficient procurement processes, and credibility concerns around greenwashing.',
            'ความต้องการไฟฟ้าหมุนเวียนและใบรับรองคุณลักษณะพลังงานทั่วโลกเพิ่มขึ้นอย่างต่อเนื่อง โดยได้รับแรงผลักดันจากหน่วยงานกำกับ นักลงทุน และผู้บริโภคที่ต้องการการดำเนินการด้านสภาพภูมิอากาศอย่างเป็นรูปธรรม ตลาดใบรับรองแบบเดิมยังมีปัญหาเชิงโครงสร้างสามประการ: การตรวจสอบย้อนกลับที่จำกัดซึ่งก่อให้เกิดความเสี่ยงในการนับซ้ำ กระบวนการจัดซื้อที่ซับซ้อนและไม่มีประสิทธิภาพ และความกังวลเรื่องความน่าเชื่อถือจากการฟอกเขียว'
          ),
          t(
            'REC Token addresses these problems by making the certificate itself the source of truth. The token is a digital twin of an I-REC that has already been issued and locked. The registry record is what gives the token its value.',
            'REC Token แก้ปัญหาเหล่านี้โดยใช้ใบรับรองเป็นแหล่งข้อมูลอ้างอิงหลัก โทเคนเป็นตัวแทนดิจิทัลของ I-REC ที่ออกและล็อกแล้ว บันทึกในทะเบียนคือสิ่งที่ทำให้โทเคนมีมูลค่า'
          ),
        ],
        bullets: [
          t('Fewer reconciliation gaps between the certificate and the claim.', 'ลดช่องว่างในการกระทบยอดระหว่างใบรับรองกับการกล่าวอ้าง'),
          t('A transferable unit without losing the audit trail.', 'หน่วยที่โอนได้โดยยังคงร่องรอยการตรวจสอบ'),
          t('A redemption path that ends with a registry retirement.', 'เส้นทางการแลกคืนที่จบด้วยการไถ่ถอนในทะเบียน'),
        ],
      },
      {
        type: 'cards',
        id: 'layers',
        title: t('Three layers of verification', 'สามชั้นของการทวนสอบ'),
        intro: t(
          'The system separates the certificate, the lock and the token. Each layer has a different operator and a different evidence trail.',
          'ระบบแยกใบรับรอง การล็อก และโทเคนออกจากกัน แต่ละชั้นมีผู้ดำเนินการและร่องรอยหลักฐานที่แตกต่างกัน'
        ),
        items: ASSET_SECTION.cards.map((card, i) => ({
          icon: i === 0 ? 'FileCheck2' : i === 1 ? 'Lock' : 'Coins',
          title: card.title,
          body: card.body,
          tag: card.tag,
        })),
      },
      {
        type: 'prose',
        id: 'irec',
        title: t('What an I-REC is', 'I-REC คืออะไร'),
        body: [
          t(
            'An International Renewable Energy Certificate is a globally recognised Energy Attribute Certificate. When a renewable plant generates 1 MWh and injects it into the grid, one I-REC is issued. It proves that 1 MWh of renewable electricity was generated and assigns the environmental attributes of that electricity to the certificate holder.',
            'International Renewable Energy Certificate เป็นใบรับรองคุณลักษณะพลังงานที่ได้รับการยอมรับทั่วโลก เมื่อโรงไฟฟ้าพลังงานหมุนเวียนผลิตไฟฟ้า 1 MWh และจ่ายเข้าโครงข่าย จะมีการออก I-REC หนึ่งหน่วย ซึ่งยืนยันว่ามีการผลิตไฟฟ้าหมุนเวียน 1 MWh และมอบคุณลักษณะด้านสิ่งแวดล้อมของไฟฟ้านั้นให้แก่ผู้ถือใบรับรอง'
          ),
          t(
            'Under the GHG Protocol, I-RECs support market-based Scope 2 reporting. They are not carbon credits and they are not T-VER credits. A REC evidences renewable electricity; a carbon credit or T-VER credit evidences a greenhouse-gas reduction or removal.',
            'ภายใต้ GHG Protocol นั้น I-REC รองรับการรายงาน Scope 2 แบบ market-based โดยไม่ใช่คาร์บอนเครดิตหรือเครดิต T-VER REC เป็นหลักฐานแสดงการผลิตไฟฟ้าหมุนเวียน ส่วนคาร์บอนเครดิตหรือเครดิต T-VER เป็นหลักฐานแสดงการลดหรือกำจัดก๊าซเรือนกระจก'
          ),
        ],
      },
      {
        type: 'table',
        id: 'compare',
        title: t('REC, carbon credit and T-VER', 'REC คาร์บอนเครดิต และ T-VER'),
        intro: t('The three instruments are not interchangeable.', 'เครื่องมือทั้งสามใช้แทนกันไม่ได้'),
        columns: [t('Instrument', 'เครื่องมือ'), t('Unit', 'หน่วย'), t('Typical use', 'การใช้งานทั่วไป'), t('Backs REC Token?', 'รองรับ REC Token?')],
        rows: [
          [t('I-REC', 'I-REC'), t('1 MWh renewable electricity', 'ไฟฟ้าหมุนเวียน 1 MWh'), t('Scope 2, market-based', 'Scope 2, market-based'), t('Yes - exclusively', 'ใช่ - รองรับด้วย I-REC เท่านั้น')],
          [t('Carbon credit', 'คาร์บอนเครดิต'), t('1 tCO₂e reduced or removed', 'การลดหรือกำจัด 1 tCO₂e'), t('Scope 1 and Scope 3', 'Scope 1 และ Scope 3'), t('Never', 'ไม่ใช่')],
          [t('T-VER credit', 'เครดิต T-VER'), t('Verified GHG reduction or removal', 'การลดหรือกำจัดก๊าซเรือนกระจกที่ผ่านการทวนสอบ'), t('Thai TGO framework', 'กรอบ อบก. ไทย'), t('Never', 'ไม่ใช่')],
        ],
      },
      {
        type: 'steps',
        id: 'lifecycle',
        title: t('From generation to retirement', 'จากการผลิตถึงการไถ่ถอน'),
        intro: LIFECYCLE.lede,
        items: LIFECYCLE.steps.map((s) => ({ no: s.no, title: s.title, body: s.body, who: s.who })),
      },
      {
        type: 'prose',
        id: 'not',
        title: t('What REC Token is not', 'REC Token ไม่ใช่อะไร'),
        body: [t('Clear boundaries matter more than broad claims.', 'ขอบเขตที่ชัดเจนสำคัญกว่าการกล่าวอ้างที่กว้างเกินไป')],
        bullets: [
          t('Not a carbon credit, carbon offset or T-VER credit.', 'ไม่ใช่คาร์บอนเครดิต ออฟเซตคาร์บอน หรือเครดิต T-VER'),
          t('Not a financial instrument, security or investment product.', 'ไม่ใช่เครื่องมือทางการเงิน หลักทรัพย์ หรือผลิตภัณฑ์ลงทุน'),
          t('Not a promise of dividends, returns, profit or price support.', 'ไม่ใช่คำสัญญาเงินปันผล ผลตอบแทน กำไร หรือการพยุงราคา'),
          t('Not a claim on a specific certificate chosen by the holder. Pool tokens are fungible until FIFO allocation at redemption.', 'ไม่ใช่สิทธิ์ในใบรับรองเฉพาะที่ผู้ถือเลือก พูลโทเคนสามารถทดแทนกันได้จนกว่าจะมีการจัดสรรแบบ FIFO เมื่อแลกคืน'),
          t('Not protected from insolvency. Underlying I-RECs are held in the issuer’s name and are not insolvency-remote.', 'ไม่ได้รับการคุ้มครองจากภาวะล้มละลาย I-REC อ้างอิงถืออยู่ในนามผู้ออกและไม่ได้แยกออกจากกองทรัพย์สินในกรณีล้มละลาย'),
        ],
      },
      { type: 'partners', id: 'partners', title: t('Who does what', 'ใครทำอะไร') },
      {
        type: 'callout',
        kind: 'warning',
        title: t('Risk warning', 'คำเตือนความเสี่ยง'),
        body: t(
          'Purchasing digital tokens involves risk. You may lose all funds used for purchase. REC Tokens are utility tokens designed for the management and verification of renewable energy certificates. They are not intended for speculative purposes.',
          'การซื้อโทเคนดิจิทัลมีความเสี่ยง คุณอาจสูญเสียเงินทั้งหมดที่ใช้ซื้อ REC Token เป็นยูทิลิตี้โทเคนที่ออกแบบสำหรับจัดการและทวนสอบใบรับรองพลังงานหมุนเวียน ไม่ได้มุ่งหมายเพื่อการเก็งกำไร'
        ),
      },
      {
        type: 'links',
        id: 'next',
        title: t('Continue', 'อ่านต่อ'),
        items: [
          { title: t('Token details', 'รายละเอียดโทเคน'), body: t('Supply, allocation, contracts and vintage policy.', 'จำนวนโทเคน การจัดสรร สัญญา และนโยบายวินเทจ'), href: 'token', meta: t('Reference', 'ข้อมูลอ้างอิง') },
          { title: t('Technical architecture', 'สถาปัตยกรรมทางเทคนิค'), body: t('ThaiFi, bridges, minting and security controls.', 'ThaiFi สะพาน การออกโทเคน และการควบคุมความปลอดภัย'), href: 'architecture', meta: t('Technical', 'ทางเทคนิค') },
          { title: t('Regulatory overview', 'ภาพรวมการกำกับดูแล'), body: t('Issuer, classification, custody and appeals.', 'ผู้ออก การจำแนก การดูแลทรัพย์สิน และการอุทธรณ์'), href: 'compliance', meta: t('Compliance', 'การกำกับดูแล') },
        ],
      },
    ],
  },

  token: {
    slug: 'token',
    hero: {
      eyebrow: t('Token details', 'รายละเอียดโทเคน'),
      title: t('Capped supply. Verified backing.', 'จำนวนโทเคนมีเพดาน การรองรับตรวจสอบได้'),
      description: t(
        'REC Token is an ERC-20 token on ThaiFi with a hard cap of 100,000,000, no pre-mint, and a supply that only moves with verified locked certificates. Pool Tokens are the fungible instrument intended for exchange trading.',
        'REC Token เป็นโทเคน ERC-20 บน ThaiFi มีจำนวนโทเคนสูงสุด 100,000,000 โทเคน ไม่มีการออกล่วงหน้า และจำนวนโทเคนเปลี่ยนแปลงตามใบรับรองที่ผ่านการทวนสอบและล็อกแล้วเท่านั้น Pool Token เป็นเครื่องมือที่ทดแทนกันได้และมีไว้เพื่อซื้อขายบนศูนย์ซื้อขาย'
      ),
      chips: [t('ERC-20', 'ERC-20'), t('18 decimals', '18 ตำแหน่ง'), t('100M cap', 'เพดาน 100 ล้าน'), t('ThaiFi chain 17', 'ThaiFi chain 17')],
    },
    actions: [
      { label: t('View live supply', 'ดูจำนวนโทเคนแบบเรียลไทม์'), href: 'data', variant: 'primary' },
      { label: t('Read the whitepaper', 'อ่านไวท์เปเปอร์'), href: 'whitepaper' },
    ],
    blocks: [
      {
        type: 'facts',
        id: 'info',
        title: t('Token information', 'ข้อมูลโทเคน'),
        rows: [
          { label: t('Token name', 'ชื่อโทเคน'), value: t('REC Token', 'REC Token') },
          { label: t('Token name (Thai)', 'ชื่อโทเคนภาษาไทย'), value: t('โทเคนดิจิทัลเพื่อพลังงานหมุนเวียน (REC)', 'โทเคนดิจิทัลเพื่อพลังงานหมุนเวียน (REC)') },
          ...EXECUTIVE_FACTS.tokenInfo.slice(1).map((row) => ({ label: row.label, value: row.value })),
        ],
      },
      {
        type: 'prose',
        id: 'supply',
        title: t('Supply mechanism', 'กลไกการกำหนดจำนวนโทเคน'),
        body: [
          t(
            'The maximum supply cap is 100,000,000 tokens with no pre-minting. Circulating supply is dynamic and strictly tied to the underlying assets: tokens are minted only when verified I-RECs are deposited and locked in ReHash, and burned when tokens are redeemed - whether the certificates are transferred to the holder’s account or retired.',
            'จำนวนโทเคนสูงสุดคือ 100,000,000 โทเคน โดยไม่มีการออกล่วงหน้า จำนวนโทเคนหมุนเวียนเปลี่ยนแปลงได้และผูกกับสินทรัพย์อ้างอิงอย่างเคร่งครัด: โทเคนจะออกเฉพาะเมื่อ I-REC ที่ผ่านการทวนสอบแล้วถูกฝากและล็อกใน ReHash และจะถูกเผาเมื่อแลกคืน ไม่ว่าใบรับรองจะถูกโอนเข้าบัญชีผู้ถือหรือถูกไถ่ถอน'
          ),
          t(
            'This preserves continuous 1:1 backing: 1 REC Token = 1 MWh of verified renewable energy, represented by a locked I-REC. Replacement of aging assets does not automatically increase supply.',
            'กลไกนี้รักษาการรองรับในอัตรา 1:1 อย่างต่อเนื่อง: 1 REC Token = พลังงานหมุนเวียน 1 MWh ที่ผ่านการทวนสอบและแสดงด้วย I-REC ที่ล็อกไว้ การเปลี่ยนสินทรัพย์ที่มีอายุเพิ่มขึ้นไม่ทำให้จำนวนโทเคนเพิ่มขึ้นโดยอัตโนมัติ'
          ),
        ],
      },
      {
        type: 'cards',
        id: 'allocation',
        title: t('Allocation', 'การจัดสรร'),
        intro: t('Allocation is fixed at issuance policy level. Neither category creates a yield or profit right.', 'การจัดสรรกำหนดไว้ในระดับนโยบายการออกโทเคน ทั้งสองประเภทไม่ได้สร้างผลตอบแทนหรือสิทธิ์ในกำไร'),
        columns: 2,
        items: [
          { icon: 'Users', title: t('40% - Direct user allocation', '40% - จัดสรรให้ผู้ใช้โดยตรง'), body: t('Minted and allocated to organisations or users who supply the underlying I-REC assets. These tokens may be used for claims, trading or storage.', 'ออกและจัดสรรให้องค์กรหรือผู้ใช้ที่จัดหาสินทรัพย์ I-REC อ้างอิง โทเคนเหล่านี้อาจใช้เพื่อการกล่าวอ้าง ซื้อขาย หรือเก็บรักษา'), tag: t('40%', '40%') },
          { icon: 'Landmark', title: t('60% - System liquidity reserve', '60% - สำรองสภาพคล่องของระบบ'), body: t('Reserved to support liquidity and market access. May be introduced into the Central Pool and exchanges. Strictly operational; not a profit or yield mechanism.', 'สำรองเพื่อสนับสนุนสภาพคล่องและการเข้าถึงตลาด อาจนำเข้า Central Pool และศูนย์ซื้อขาย เพื่อการดำเนินงานเท่านั้น ไม่ใช่กลไกกำไรหรือผลตอบแทน'), tag: t('60%', '60%') },
        ],
      },
      {
        type: 'prose',
        id: 'dual',
        title: t('Dual-token structure', 'โครงสร้างสองชั้น'),
        body: [
          t(
            'The system separates project-specific tokens from pool tokens. Project tokens represent a claim tied to a specific project’s locked certificates. Holders may deposit them into the Central Pool 1:1 and receive Pool Tokens. Pool Tokens are fungible and are the tokens intended for trading on digital asset exchanges.',
            'ระบบแยกโทเคนรายโครงการออกจากพูลโทเคน โทเคนรายโครงการแสดงสิทธิ์ที่ผูกกับใบรับรองที่ล็อกไว้ของโครงการหนึ่ง ผู้ถือสามารถฝากโทเคนรายโครงการเข้า Central Pool ในอัตรา 1:1 และรับ Pool Token ได้ Pool Token สามารถทดแทนกันได้และมีไว้เพื่อซื้อขายบนศูนย์ซื้อขายสินทรัพย์ดิจิทัล'
          ),
        ],
        bullets: [
          t('1 Pool Token = 1 Project Token = 1 I-REC = 1 MWh', '1 Pool Token = 1 Project Token = 1 I-REC = 1 MWh'),
          t('Allocation at redemption is FIFO by vintage year, oldest first.', 'การจัดสรรเมื่อแลกคืนใช้ FIFO ตามปีวินเทจ โดยจัดสรรปีที่เก่ากว่าก่อน'),
          t('Pool Tokens do not represent a specific certificate, project, country or vintage until allocation.', 'Pool Token ไม่ได้แสดงถึงใบรับรอง โครงการ ประเทศ หรือวินเทจที่เฉพาะเจาะจงจนกว่าจะมีการจัดสรร'),
        ],
      },
      { type: 'contracts', id: 'contracts', title: t('Contract registry', 'ทะเบียนสัญญา'), intro: t('Always verify the contract address and network before interacting. A bridge address is not a token address.', 'ตรวจสอบที่อยู่สัญญาและเครือข่ายก่อนโต้ตอบทุกครั้ง ที่อยู่สะพานไม่ใช่ที่อยู่โทเคน') },
      {
        type: 'prose',
        id: 'vintage',
        title: t('Vintage management', 'การจัดการวินเทจ'),
        body: [
          t(
            'I-RECs do not expire for registry purposes, but market acceptance varies with vintage. BlockEdge’s inclusion policy accepts only certificates no older than two years from the electricity generation year, and monitors aging assets continuously.',
            'I-REC ไม่หมดอายุในทางทะเบียน แต่การยอมรับของตลาดขึ้นอยู่กับวินเทจ นโยบายการรับเข้าของ BlockEdge ยอมรับเฉพาะใบรับรองที่มีอายุไม่เกินสองปีนับจากปีที่ผลิตไฟฟ้า และติดตามสินทรัพย์ที่มีอายุเพิ่มขึ้นอย่างต่อเนื่อง'
          ),
          t(
            'Before an aging asset is removed from the pool or reallocated, replacement I-RECs of sufficient quantity must be locked to preserve 1:1 backing. Such actions are disclosed through the public dashboard.',
            'ก่อนนำสินทรัพย์ที่มีอายุเพิ่มขึ้นออกจากพูลหรือจัดสรรใหม่ ต้องล็อก I-REC ทดแทนในจำนวนที่เพียงพอเพื่อรักษาการรองรับ 1:1 โดยเปิดเผยการดำเนินการดังกล่าวผ่านแดชบอร์ดสาธารณะ'
          ),
        ],
      },
      {
        type: 'table',
        id: 'sell-orders',
        title: t('Initial sell order plan', 'แผนคำสั่งขายเริ่มต้น'),
        intro: t('The Company does not offer tokens in a primary market. It plans to place sell orders for 300,000 tokens through Bitkub Exchange from the first trading day, in 50 price levels of THB 0.20 from THB 10.00 to THB 19.80.', 'บริษัทไม่ได้เสนอขายโทเคนในตลาดแรก แต่มีแผนส่งคำสั่งขาย 300,000 โทเคนผ่าน Bitkub Exchange ตั้งแต่วันซื้อขายวันแรก โดยแบ่งเป็น 50 ระดับราคา ห่างกันระดับละ 0.20 บาท ตั้งแต่ 10.00 ถึง 19.80 บาท'),
        columns: [t('Price range (THB)', 'ช่วงราคา (บาท)'), t('Levels', 'ระดับ'), t('Tokens per level', 'โทเคนต่อระดับ'), t('Total tokens', 'โทเคนรวม')],
        rows: MARKET.initialSellOrder.table.map((row) => [
          t(row.range, row.range),
          t(String(row.levels), String(row.levels)),
          t(row.perLevel.toLocaleString('en-US'), row.perLevel.toLocaleString('en-US')),
          t(row.total.toLocaleString('en-US'), row.total.toLocaleString('en-US')),
        ]).concat([
          [t('Total', 'รวม'), t('50', '50'), t('-', '-'), t('300,000', '300,000')],
        ]),
        note: t('Sell-side only. No buy-back commitment, price floor or liquidity guarantee. Prices and quantities may be adjusted or cancelled.', 'เฉพาะฝั่งขาย ไม่มีข้อผูกพันรับซื้อคืน ราคาขั้นต่ำ หรือการรับประกันสภาพคล่อง ราคาและปริมาณอาจปรับหรือยกเลิกได้'),
      },
      {
        type: 'callout',
        kind: 'info',
        title: t('Contract address verification', 'ตรวจสอบที่อยู่สัญญา'),
        body: t('The active ThaiFi pool contract is 0x7269992Ea88ec64fF65f9B03F8D6Ea4AADb5EAE9. The Kubchain bridge lock is a separate contract at 0x18c8F43c456e3947C37D3604d891De914d592776. Always verify the active address on the explorer before sending tokens.', 'สัญญาพูลบน ThaiFi ที่ใช้งานอยู่คือ 0x7269992Ea88ec64fF65f9B03F8D6Ea4AADb5EAE9 ส่วนสัญญาล็อกสะพาน Kubchain คือ 0x18c8F43c456e3947C37D3604d891De914d592776 ซึ่งเป็นคนละสัญญา ตรวจสอบที่อยู่ที่ใช้งานบน explorer ก่อนส่งโทเคนทุกครั้ง'),
      },
    ],
  },

  architecture: {
    slug: 'architecture',
    hero: {
      eyebrow: t('Technical architecture', 'สถาปัตยกรรมทางเทคนิค'),
      title: t('Three Chains, One Audit Trail', 'สามเชน ตรวจสอบครบ จบในที่เดียว'),
      description: t(
        'REC Tokens are ERC-20 contracts on ThaiFi, with bridged deployments on Optimism and Kubchain. Minting, transfers and burns are recorded on-chain and controlled by multi-signature operations.',
        'REC Token เป็นสัญญา ERC-20 บน ThaiFi โดยมีการติดตั้งที่เชื่อมข้ามเชนบน Optimism และ Kubchain การออก โอน และเผาโทเคนจะถูกบันทึกบนเชนและควบคุมด้วยการดำเนินงานที่ใช้ลายมือชื่อหลายฝ่าย'
      ),
      chips: [t('ThaiFi', 'ThaiFi'), t('ERC-20', 'ERC-20'), t('Multi-sig', 'Multi-sig'), t('Valix audited', 'ตรวจสอบโดย Valix')],
    },
    actions: [
      { label: t('Controls & audit', 'การควบคุมและการตรวจสอบ'), href: 'compliance/controls', variant: 'primary' },
      { label: t('Live dashboard', 'แดชบอร์ดเรียลไทม์'), href: 'data' },
    ],
    blocks: [
      {
        type: 'table',
        id: 'chains',
        title: t('Multi-chain deployment', 'การติดตั้งหลายเชน'),
        intro: t('The primary deployment is ThaiFi. Optimism and Kubchain exist for bridged liquidity; a balance on one chain is not a balance on another.', 'การติดตั้งหลักอยู่บน ThaiFi ส่วน Optimism และ Kubchain มีไว้สำหรับสภาพคล่องที่เชื่อมข้ามเชน ยอดบนเชนหนึ่งไม่ใช่ยอดบนอีกเชนหนึ่ง'),
        columns: [t('Network', 'เครือข่าย'), t('Role', 'บทบาท'), t('Token contract', 'สัญญาโทเคน'), t('Explorer', 'Explorer')],
        rows: [
          [t('ThaiFi (chain 17)', 'ThaiFi (chain 17)'), t('Primary issuance and retirement', 'การออกและการไถ่ถอนหลัก'), t('0x7269992Ea88ec64fF65f9B03F8D6Ea4AADb5EAE9', '0x7269992Ea88ec64fF65f9B03F8D6Ea4AADb5EAE9'), t('exp.thaifi.com', 'exp.thaifi.com')],
          [t('Optimism (chain 10)', 'Optimism (chain 10)'), t('Bridged liquidity and swap', 'สภาพคล่องเชื่อมข้ามและการแลกเปลี่ยน'), t('0xF4fEfEe4730Cf174608766877911F8D33735f9D7', '0xF4fEfEe4730Cf174608766877911F8D33735f9D7'), t('optimistic.etherscan.io', 'optimistic.etherscan.io')],
          [t('Kubchain', 'Kubchain'), t('Bridged liquidity', 'สภาพคล่องเชื่อมข้าม'), t(CONTRACTS.poolKubchain, CONTRACTS.poolKubchain), t('kubscan.com', 'kubscan.com')],
        ],
      },
      {
        type: 'steps',
        id: 'process',
        title: t('Tokenisation process', 'กระบวนการแปลงเป็นโทเคน'),
        intro: t('How a renewable energy project becomes a token - and how the token gets back to a certificate.', 'โครงการพลังงานหมุนเวียนกลายเป็นโทเคนได้อย่างไร และโทเคนกลับไปเป็นใบรับรองได้อย่างไร'),
        items: [
          { no: '01', title: t('Project registration', 'ขึ้นทะเบียนโครงการ'), body: t('A renewable project registers generation data with Evident and is verified against the I-REC standard.', 'โครงการพลังงานหมุนเวียนขึ้นทะเบียนข้อมูลการผลิตกับ Evident และได้รับการทวนสอบตามมาตรฐาน I-REC'), who: t('Evident', 'Evident') },
          { no: '02', title: t('Asset aggregation', 'รวบรวมสินทรัพย์'), body: t('NetZero Carbon sources qualifying hydropower certificates in Southeast Asia with a vintage no older than two years.', 'NetZero Carbon จัดหาใบรับรองพลังน้ำที่เข้าเกณฑ์ในเอเชียตะวันออกเฉียงใต้ ซึ่งมีวินเทจไม่เกินสองปี'), who: t('NetZero Carbon', 'NetZero Carbon') },
          { no: '03', title: t('Lock in ReHash', 'ล็อกใน ReHash'), body: t('Certificates are transferred to BlockEdge’s account and locked. The lock is the precondition for minting.', 'ใบรับรองถูกโอนเข้าบัญชี BlockEdge และล็อก การล็อกเป็นเงื่อนไขก่อนการออกโทเคน'), who: t('REDEX / ReHash', 'REDEX / ReHash') },
          { no: '04', title: t('Mint project tokens', 'ออกโทเคนรายโครงการ'), body: t('After REDEX confirms the lock, BlockEdge mints project-specific tokens 1:1 under multi-signature approval.', 'หลัง REDEX ยืนยันการล็อก BlockEdge ออกโทเคนรายโครงการ 1:1 ภายใต้การอนุมัติด้วยลายมือชื่อหลายฝ่าย'), who: t('BlockEdge', 'BlockEdge') },
          { no: '05', title: t('Pool and bridge', 'รวมพูลและเชื่อมข้าม'), body: t('Project tokens can enter the Central Pool 1:1. Pool Tokens may be bridged to Optimism or Kubchain, with equivalent amounts locked on ThaiFi.', 'โทเคนรายโครงการสามารถเข้าสู่ Central Pool ในอัตรา 1:1 ได้ และอาจเชื่อม Pool Token ข้ามไปยัง Optimism หรือ Kubchain โดยล็อกโทเคนจำนวนเทียบเท่าไว้บน ThaiFi'), who: t('Central Pool / bridges', 'Central Pool / สะพาน') },
          { no: '06', title: t('Redeem and retire', 'แลกคืนและไถ่ถอน'), body: t('Tokens are burned and certificates are allocated FIFO by vintage, then transferred or retired with evidence.', 'โทเคนถูกเผาและใบรับรองถูกจัดสรรแบบ FIFO ตามวินเทจ จากนั้นใบรับรองจะถูกโอนหรือไถ่ถอนพร้อมหลักฐาน'), who: t('BlockEdge / REDEX', 'BlockEdge / REDEX') },
        ],
      },
      {
        type: 'facts',
        id: 'specs',
        title: t('Technical specifications', 'ข้อมูลทางเทคนิค'),
        rows: [
          { label: t('Standard', 'มาตรฐาน'), value: t('ERC-20', 'ERC-20') },
          { label: t('Decimals', 'ตำแหน่งทศนิยม'), value: t('18', '18') },
          { label: t('Maximum supply', 'จำนวนโทเคนสูงสุด'), value: t('100,000,000', '100,000,000') },
          { label: t('Primary chain', 'เชนหลัก'), value: t('ThaiFi (chain ID 17)', 'ThaiFi (chain ID 17)') },
          { label: t('Bridges', 'สะพาน'), value: t('Optimism, Kubchain', 'Optimism, Kubchain') },
          { label: t('Backing', 'การรองรับ'), value: t('REDEX / ReHash locked I-RECs', 'I-REC ที่ล็อกใน REDEX / ReHash') },
          { label: t('Ratio', 'อัตราส่วน'), value: t('1 token = 1 MWh', '1 โทเคน = 1 MWh') },
          { label: t('Verification', 'การทวนสอบ'), value: t('On-chain and registry', 'บนเชนและทะเบียน') },
        ],
      },
      {
        type: 'prose',
        id: 'thaifi',
        title: t('ThaiFi network', 'เครือข่าย ThaiFi'),
        body: [
          t(
            'ThaiFi is a Tempo-compatible network supporting EVM smart contracts. It uses Simplex BFT with DKG consensus and documents a 0.5-second block time. Transaction fees are paid in TIP-20 tokens, with pathTHB as the default. Actual costs and confirmation times depend on network conditions and the resources each transaction consumes.',
            'ThaiFi เป็นเครือข่ายที่รองรับ Tempo และสัญญาอัจฉริยะ EVM ใช้ฉันทามติ Simplex BFT with DKG และระบุเวลาบล็อก 0.5 วินาที ค่าธรรมเนียมชำระด้วย TIP-20 โดยใช้ pathTHB เป็นค่าเริ่มต้น ต้นทุนและเวลายืนยันจริงขึ้นกับสภาพเครือข่ายและทรัพยากรที่แต่ละธุรกรรมใช้'
          ),
          t(
            'Security and operational continuity depend on the consensus mechanism, validators, smart contracts, infrastructure providers and key management. Using ThaiFi does not imply that the network inherits Ethereum Layer 1 security guarantees.',
            'ความปลอดภัยและความต่อเนื่องในการดำเนินงานขึ้นกับกลไกฉันทามติ validator สัญญาอัจฉริยะ ผู้ให้บริการโครงสร้างพื้นฐาน และการจัดการกุญแจ การใช้ ThaiFi ไม่ได้หมายความว่าเครือข่ายได้รับการรับประกันความปลอดภัยจาก Ethereum Layer 1'
          ),
        ],
      },
      {
        type: 'prose',
        id: 'interop',
        title: t('Interoperability and transfer limits', 'การทำงานร่วมกันและข้อจำกัดการโอน'),
        body: [
          t(
            'REC Tokens are ERC-20 and may be transferred between compatible wallets peer-to-peer, subject to applicable law, exchange rules, security measures and emergency procedures. Multiple network addresses do not imply direct cross-chain transfers; users must select the correct network and contract. Reconciliation must distinguish project tokens, pool tokens and underlying assets to prevent double counting.',
            'REC Token เป็นโทเคน ERC-20 และอาจโอนระหว่างกระเป๋าที่รองรับได้โดยตรงระหว่างผู้ใช้ ทั้งนี้อยู่ภายใต้กฎหมายที่ใช้บังคับ กฎของศูนย์ซื้อขาย มาตรการรักษาความปลอดภัย และขั้นตอนฉุกเฉิน การมีที่อยู่บนหลายเครือข่ายไม่ได้หมายความว่าสามารถโอนข้ามเชนได้โดยตรง ผู้ใช้ต้องเลือกเครือข่ายและสัญญาที่ถูกต้อง การกระทบยอดต้องแยกโทเคนรายโครงการ พูลโทเคน และสินทรัพย์อ้างอิง เพื่อป้องกันการนับซ้ำ'
          ),
        ],
      },
      {
        type: 'prose',
        id: 'redex',
        title: t('REDEX ecosystem integration', 'การเชื่อมต่อระบบนิเวศ REDEX'),
        body: [
          t(
            'REDEX provides technology that enables companies to adopt renewable energy with ease. Headquartered in Singapore, REDEX operates a leading trading platform for Renewable Energy Certificates in Asia. REC Token uses REDEX and its ReHash platform for recording, locking, tracking and management of I-RECs.',
            'REDEX ให้บริการเทคโนโลยีที่ช่วยให้องค์กรเปลี่ยนมาใช้พลังงานหมุนเวียนได้ง่าย โดยมีสำนักงานใหญ่ในสิงคโปร์และดำเนินแพลตฟอร์มซื้อขายใบรับรองพลังงานหมุนเวียนชั้นนำในเอเชีย REC Token ใช้ REDEX และแพลตฟอร์ม ReHash สำหรับบันทึก ล็อก ติดตาม และจัดการ I-REC'
          ),
        ],
        bullets: [
          t('One-stop ecosystem for RECs', 'ระบบนิเวศครบวงจรสำหรับ REC'),
          t('Full REC lifecycle support', 'รองรับวงจรชีวิต REC ทั้งหมด'),
          t('2023 Emerging Enterprise Sustainability Award', 'รางวัล Emerging Enterprise Sustainability Award 2023'),
          t('Verified backing, regulatory alignment and market access', 'การรองรับที่ผ่านการทวนสอบ ความสอดคล้องกับกฎระเบียบ และการเข้าถึงตลาด'),
        ],
      },
      {
        type: 'links',
        id: 'resources',
        title: t('Ecosystem resources', 'แหล่งข้อมูลในระบบนิเวศ'),
        items: [
          { title: t('REDEX platform', 'แพลตฟอร์ม REDEX'), body: t('Asia’s leading REC trading platform, headquartered in Singapore.', 'แพลตฟอร์มซื้อขาย REC ชั้นนำในเอเชีย สำนักงานใหญ่ที่สิงคโปร์'), href: SITE.external.redex, meta: t('External', 'ภายนอก'), external: true },
          { title: t('Retirement certificates', 'ใบรับรองการไถ่ถอน'), body: t('View the NFT certificates issued for retired tokens.', 'ดู NFT ใบรับรองที่ออกสำหรับโทเคนที่ไถ่ถอนแล้ว'), href: SITE.external.certificates, meta: t('External', 'ภายนอก'), external: true },
          { title: t('ReHash framework', 'กรอบ ReHash'), body: t('The locking and tracking layer operated by REDEX.', 'ชั้นการล็อกและติดตามที่ REDEX ดำเนินการ'), href: SITE.external.rehash, meta: t('External', 'ภายนอก'), external: true },
        ],
      },
      {
        type: 'callout',
        kind: 'warning',
        title: t('Wrong network, permanent loss', 'ผิดเครือข่าย สูญเสียถาวร'),
        body: t('Sending tokens on an unsupported network or to the wrong contract may make them unrecoverable. Verify the contract address and network in the registry before every transfer.', 'การส่งโทเคนบนเครือข่ายที่ไม่รองรับหรือไปยังสัญญาที่ผิดอาจทำให้กู้คืนไม่ได้ ตรวจสอบที่อยู่สัญญาและเครือข่ายในทะเบียนก่อนโอนทุกครั้ง'),
      },
      {
        type: 'links',
        id: 'next',
        title: t('Related', 'เนื้อหาที่เกี่ยวข้อง'),
        items: [
          { title: t('Controls & audit', 'การควบคุมและการตรวจสอบ'), body: t('Multi-sig, pause, audit scope and BCDR.', 'Multi-sig การหยุด ขอบเขตการตรวจสอบ และ BCDR'), href: 'compliance/controls', meta: t('Security', 'ความปลอดภัย') },
          { title: t('Live dashboard', 'แดชบอร์ดเรียลไทม์'), body: t('Read supply, retirement and bridge balances from chain.', 'อ่านจำนวนโทเคน การไถ่ถอน และยอดสะพานจากเชน'), href: 'data', meta: t('Data', 'ข้อมูล') },
          { title: t('Contract registry', 'ทะเบียนสัญญา'), body: t('Every active address with explorer links.', 'ทุกที่อยู่ที่ใช้งานพร้อมลิงก์ explorer'), href: 'token', meta: t('Reference', 'ข้อมูลอ้างอิง') },
        ],
      },
    ],
  },

  compliance: {
    slug: 'compliance',
    hero: {
      eyebrow: t('Regulatory overview', 'ภาพรวมการกำกับดูแล'),
      title: t('The evidence a regulator or assurance provider needs.', 'หลักฐานที่หน่วยงานกำกับหรือผู้ให้ความเชื่อมั่นต้องการ'),
      description: t(
        'Issuer identity, token classification, control framework, custody treatment, redemption rights and the appeal process - with the primary source for each statement.',
        'ข้อมูลผู้ออก การจำแนกประเภทโทเคน กรอบการควบคุม การดูแลทรัพย์สิน สิทธิ์ในการแลกคืน และกระบวนการอุทธรณ์ พร้อมแหล่งข้อมูลต้นฉบับของแต่ละข้อความ'
      ),
      chips: [t('Thai law', 'กฎหมายไทย'), t('Utility token', 'ยูทิลิตี้โทเคน'), t('Multi-party control', 'การควบคุมหลายฝ่าย')],
    },
    actions: [
      { label: t('Controls & audit', 'การควบคุมและการตรวจสอบ'), href: 'compliance/controls', variant: 'primary' },
      { label: t('Claims & eligibility', 'การกล่าวอ้างและสิทธิ์'), href: 'compliance/claims' },
      { label: t('Risk factors', 'ปัจจัยความเสี่ยง'), href: 'compliance/risk' },
    ],
    blocks: [
      {
        type: 'facts',
        id: 'snapshot',
        title: t('Regulatory snapshot', 'ข้อมูลสรุปเพื่อการกำกับ'),
        rows: [
          { label: t('Issuer', 'ผู้ออกโทเคน'), value: t('BlockEdge Co., Ltd.', 'บริษัท บล็อกเอจ จำกัด'), note: t('Registration No. 0205566011711', 'ทะเบียนเลขที่ 0205566011711') },
          { label: t('Instrument', 'เครื่องมือ'), value: t('ERC-20 utility token (ready-to-use)', 'ยูทิลิตี้โทเคน ERC-20 (พร้อมใช้งาน)'), note: t('Not a carbon credit, offset or financial instrument', 'ไม่ใช่คาร์บอนเครดิต ออฟเซต หรือเครื่องมือทางการเงิน') },
          { label: t('Underlying asset', 'สินทรัพย์อ้างอิง'), value: t('I-REC, 1 token = 1 MWh', 'I-REC, 1 โทเคน = 1 MWh'), note: t('Hydropower, Southeast Asia, vintage ≤ 2 years', 'พลังน้ำ เอเชียตะวันออกเฉียงใต้ วินเทจ ≤ 2 ปี') },
          { label: t('Registry', 'ทะเบียน'), value: t('Evident (official registry); REDEX / ReHash (registrar and lock)', 'Evident (ทะเบียนอย่างเป็นทางการ); REDEX / ReHash (นายทะเบียนและการล็อก)') },
          { label: t('Audit and counsel', 'การตรวจสอบและที่ปรึกษา'), value: t('Valix Consulting (smart contract audit); Baker & McKenzie (legal counsel)', 'Valix Consulting (ตรวจสอบสัญญา); Baker & McKenzie (ที่ปรึกษากฎหมาย)') },
          { label: t('Governing law', 'กฎหมายที่ใช้บังคับ'), value: t('Kingdom of Thailand', 'ราชอาณาจักรไทย') },
          { label: t('Contact', 'ติดต่อ'), value: t('info@blockedge.co', 'info@blockedge.co') },
        ],
      },
      {
        type: 'prose',
        id: 'classification',
        title: t('Classification and nature of the offering', 'การจำแนกและลักษณะของการเสนอ'),
        body: [
          t(
            'REC Token is issued by BlockEdge as a ready-to-use utility token for the management and verification of renewable energy certificates. It is not offered in a primary market by the Company and is not marketed as an investment product. Trading, where available, occurs on a licensed digital asset exchange through its order-matching system.',
            'REC Token ออกโดย BlockEdge ในฐานะยูทิลิตี้โทเคนพร้อมใช้งานสำหรับจัดการและทวนสอบใบรับรองพลังงานหมุนเวียน บริษัทไม่ได้เสนอขายในตลาดแรกและไม่ได้ทำการตลาดว่าเป็นผลิตภัณฑ์ลงทุน การซื้อขาย (หากมี) เกิดขึ้นบนศูนย์ซื้อขายสินทรัพย์ดิจิทัลที่ได้รับอนุญาตผ่านระบบจับคู่คำสั่ง'
          ),
          t(
            'The token provides no guarantee of dividends, returns or profits. It is not a financial instrument and is not intended for speculative purposes. The publication of the whitepaper does not constitute a guarantee of price, returns or project success.',
            'โทเคนไม่มีการรับประกันเงินปันผล ผลตอบแทน หรือกำไร ไม่ใช่เครื่องมือทางการเงินและไม่ได้มุ่งหมายเพื่อการเก็งกำไร การเผยแพร่ไวท์เปเปอร์ไม่ถือเป็นการรับประกันราคา ผลตอบแทน หรือความสำเร็จของโครงการ'
          ),
        ],
      },
      {
        type: 'cards',
        id: 'governance',
        title: t('Governance principles', 'หลักการกำกับดูแล'),
        items: GOVERNANCE_PRINCIPLES.map((item) => ({
          icon: 'ShieldCheck',
          title: item.title,
          body: item.body,
        })),
      },
      {
        type: 'prose',
        id: 'controls',
        title: t('Control framework', 'กรอบการควบคุม'),
        body: [
          t(
            'Double counting is addressed through one-way binding, quarterly reconciliation, a public transparency dashboard and annual asset quality review. Minting requires multi-signature approval after the registrar confirms the lock. The contracts include an emergency pause and a documented recovery process.',
            'การนับซ้ำได้รับการจัดการผ่านการผูกทางเดียว การกระทบยอดรายไตรมาส แดชบอร์ดความโปร่งใสสาธารณะ และการทบทวนคุณภาพสินทรัพย์ประจำปี การออกโทเคนต้องได้รับการอนุมัติด้วยลายมือชื่อหลายฝ่ายหลังนายทะเบียนยืนยันการล็อก สัญญามีกลไกหยุดฉุกเฉินและกระบวนการกู้คืนที่จัดทำเป็นเอกสาร'
          ),
        ],
      },
      {
        type: 'prose',
        id: 'custody',
        title: t('Custody and insolvency treatment', 'การดูแลทรัพย์สินและภาวะล้มละลาย'),
        body: [
          t(
            'The underlying I-RECs are held in BlockEdge’s name and are not subject to any trust, segregated account or other insolvency-remote arrangement separating them from BlockEdge’s own assets. REDEX, ReHash and Evident do not act as independent custodians for token holders. If BlockEdge becomes insolvent, the I-RECs may form part of its general estate and token holders may rank as unsecured creditors.',
            'I-REC อ้างอิงถืออยู่ในนาม BlockEdge และไม่ได้อยู่ในทรัสต์ บัญชีแยก หรือข้อตกลงอื่นที่แยกสินทรัพย์ดังกล่าวออกจากสินทรัพย์ของ BlockEdge เพื่อคุ้มครองในกรณีล้มละลาย REDEX, ReHash และ Evident ไม่ได้ทำหน้าที่เป็นผู้ดูแลทรัพย์สินอิสระสำหรับผู้ถือโทเคน หาก BlockEdge ล้มละลาย I-REC อาจเป็นส่วนหนึ่งของกองทรัพย์สินทั่วไป และผู้ถือโทเคนอาจอยู่ในฐานะเจ้าหนี้ไม่มีหลักประกัน'
          ),
        ],
        bullets: CUSTODY_POINTS.map((p) => ({ en: `${p.title.en}: ${p.body.en}`, th: `${p.title.th}: ${p.body.th}` })),
      },
      {
        type: 'prose',
        id: 'rights',
        title: t('Holder rights and redemption', 'สิทธิ์ผู้ถือและการแลกคืน'),
        body: [
          t(
            'Holders may use tokens for retirement, enabling verified renewable energy claims for Scope 2 reporting. Redemption is available to legal entities and individuals with a minimum of 100 tokens per request. After verification, tokens are transferred to a segregated redemption wallet, held pending final checks, and then burned. I-RECs are allocated FIFO by vintage year.',
            'ผู้ถือสามารถใช้โทเคนเพื่อไถ่ถอน ทำให้สามารถกล่าวอ้างพลังงานหมุนเวียนที่ตรวจสอบได้สำหรับการรายงาน Scope 2 การแลกคืนเปิดให้นิติบุคคลและบุคคลธรรมดา โดยมีขั้นต่ำ 100 โทเคนต่อคำขอ หลังการตรวจสอบ โทเคนจะถูกโอนไปยังกระเป๋าแลกคืนที่แยกไว้เพื่อรอการตรวจสอบขั้นสุดท้าย แล้วจึงถูกเผา ส่วน I-REC จะถูกจัดสรรแบบ FIFO ตามปีวินเทจ'
          ),
        ],
        bullets: [
          t('Option 1: receive the I-REC without retirement (legal entities only).', 'ตัวเลือก 1: รับ I-REC โดยไม่ไถ่ถอน (นิติบุคคลเท่านั้น)'),
          t('Option 2: retirement under a legal entity with an official certificate.', 'ตัวเลือก 2: ไถ่ถอนในนามนิติบุคคลพร้อมใบรับรองอย่างเป็นทางการ'),
          t('Option 3: retirement on behalf of an individual, with the name recorded.', 'ตัวเลือก 3: ไถ่ถอนในนามบุคคลธรรมดา โดยบันทึกชื่อไว้'),
          t('Retirement is final and irreversible.', 'การไถ่ถอนเป็นขั้นสุดท้ายและย้อนกลับไม่ได้'),
        ],
      },
      {
        type: 'prose',
        id: 'complaints',
        title: t('Appeals and disputes', 'การอุทธรณ์และข้อพิพาท'),
        body: [
          t(
            'Before burning tokens, BlockEdge discloses the allocated asset details and the holder may cancel without penalty. If a functional usability issue arises after confirmation, the holder may appeal within 14 days with transaction details, a description of the issue and supporting documents. BlockEdge responds within 7 days of a complete appeal. Personal preference or a change of mind after a confirmed burn is not covered.',
            'ก่อนเผาโทเคน BlockEdge จะเปิดเผยรายละเอียดสินทรัพย์ที่จัดสรร และผู้ถือสามารถยกเลิกได้โดยไม่มีค่าปรับ หากเกิดปัญหาที่กระทบต่อการใช้งานหลังการยืนยัน ผู้ถืออาจอุทธรณ์ภายใน 14 วัน พร้อมรายละเอียดธุรกรรม คำอธิบายปัญหา และเอกสารประกอบ BlockEdge จะตอบกลับภายใน 7 วันนับจากได้รับคำอุทธรณ์ครบถ้วน การอุทธรณ์ไม่ครอบคลุมความชอบส่วนตัวหรือการเปลี่ยนใจหลังยืนยันการเผาโทเคนแล้ว'
          ),
        ],
      },
      {
        type: 'table',
        id: 'documents',
        title: t('Primary documents', 'เอกสารต้นฉบับ'),
        columns: [t('Document', 'เอกสาร'), t('Format', 'รูปแบบ'), t('What it covers', 'เนื้อหา')],
        rows: legalIndex.map((row) => [row.label, row.value, row.note]),
      },
    ],
  },

  'compliance/controls': {
    slug: 'compliance/controls',
    hero: {
      eyebrow: t('Controls & audit', 'การควบคุมและการตรวจสอบ'),
      title: t('How double counting is prevented - and how it is checked.', 'การนับซ้ำถูกป้องกันอย่างไร และตรวจสอบอย่างไร'),
      description: t(
        'Ten controls span the asset lifecycle: locking before minting, one-way binding, quarterly reconciliation, on-chain transparency, annual asset review, audit, multi-signature control, emergency pause, recovery and business continuity.',
        'การควบคุมสิบข้อครอบคลุมวงจรสินทรัพย์: ล็อกก่อนออกโทเคน การผูกทางเดียว การกระทบยอดรายไตรมาส ความโปร่งใสบนเชน การทบทวนสินทรัพย์ประจำปี การตรวจสอบ การควบคุมด้วยลายมือชื่อหลายฝ่าย การหยุดฉุกเฉิน การกู้คืน และความต่อเนื่องทางธุรกิจ'
      ),
      chips: [t('Mint-on-lock', 'Mint-on-lock'), t('Quarterly reconciliation', 'กระทบยอดรายไตรมาส'), t('Valix audit', 'ตรวจสอบโดย Valix')],
    },
    blocks: [
      {
        type: 'prose',
        id: 'why',
        title: t('The risk being controlled', 'ความเสี่ยงที่ถูกควบคุม'),
        body: [
          t(
            'Double counting occurs when the same environmental attribute is claimed more than once. In renewable energy markets it can arise when a certificate backs a token and is also sold or retired elsewhere. BlockEdge’s framework makes that outcome structurally difficult.',
            'การนับซ้ำเกิดขึ้นเมื่อคุณลักษณะด้านสิ่งแวดล้อมเดียวกันถูกกล่าวอ้างมากกว่าหนึ่งครั้ง ในตลาดพลังงานหมุนเวียนอาจเกิดขึ้นเมื่อใบรับรองรองรับโทเคนและถูกขายหรือไถ่ถอนที่อื่นด้วย กรอบของ BlockEdge ทำให้การเกิดเหตุการณ์ดังกล่าวเป็นไปได้ยากในเชิงโครงสร้าง'
          ),
        ],
      },
      {
        type: 'steps',
        id: 'mechanisms',
        title: t('Control mechanisms', 'กลไกการควบคุม'),
        items: CONTROL_MECHANISMS.map((m) => ({ no: m.no, title: m.title, body: m.body })),
      },
      {
        type: 'table',
        id: 'reconciliation',
        title: t('Reconciliation', 'การกระทบยอด'),
        columns: [t('Item', 'หัวข้อ'), t('Practice', 'แนวปฏิบัติ')],
        rows: RECONCILIATION.map((row) => [row.label, row.value]),
      },
      {
        type: 'prose',
        id: 'audit',
        title: t('Smart contract audit', 'การตรวจสอบสัญญาอัจฉริยะ'),
        body: [
          t(
            'All smart contracts related to REC Tokens undergo security assessments including static code analysis, dynamic testing and expert review. The independent auditor is Valix Consulting Co., Ltd. Reliance on audit findings must match ThaiFi, the contract address in the whitepaper and the deployed code version; an earlier report does not automatically cover a new contract or version.',
            'สัญญาอัจฉริยะทั้งหมดที่เกี่ยวข้องกับ REC Token ผ่านการประเมินความปลอดภัย รวมถึงการวิเคราะห์โค้ดแบบ static การทดสอบแบบ dynamic และการทบทวนโดยผู้เชี่ยวชาญ ผู้ตรวจสอบอิสระคือ Valix Consulting Co., Ltd. การอ้างอิงผลตรวจสอบต้องสอดคล้องกับ ThaiFi ที่อยู่สัญญาในไวท์เปเปอร์ และเวอร์ชันโค้ดที่ติดตั้ง รายงานเดิมไม่ครอบคลุมสัญญาหรือเวอร์ชันใหม่โดยอัตโนมัติ'
          ),
        ],
      },
      {
        type: 'prose',
        id: 'continuity',
        title: t('Business continuity and recovery', 'ความต่อเนื่องและการกู้คืน'),
        body: [
          t(
            'Platform data is hosted on high-availability cloud infrastructure with regular backups and geographically separated storage. Blockchain state recovery relies on network records and backups rather than Ethereum L1 guarantees. If automated integrations fail, authorised personnel may run controlled manual procedures. The emergency pause can suspend operations during a security incident under multi-signature approval.',
            'ข้อมูลแพลตฟอร์มจัดเก็บบนโครงสร้างพื้นฐานคลาวด์ที่มีความพร้อมใช้งานสูง มีการสำรองข้อมูลเป็นประจำและจัดเก็บแยกกันตามพื้นที่ การกู้คืนสถานะบล็อกเชนอาศัยบันทึกเครือข่ายและข้อมูลสำรอง ไม่ได้อาศัยการรับประกันจาก Ethereum L1 หากการเชื่อมต่ออัตโนมัติล้มเหลว บุคลากรที่ได้รับอนุญาตอาจดำเนินกระบวนการด้วยมือภายใต้การควบคุม กลไกหยุดฉุกเฉินสามารถระงับการดำเนินงานระหว่างเหตุการณ์ด้านความปลอดภัยโดยได้รับการอนุมัติด้วยลายมือชื่อหลายฝ่าย'
          ),
        ],
      },
      {
        type: 'callout',
        kind: 'info',
        title: t('Audit scope caveat', 'ข้อจำกัดขอบเขตการตรวจสอบ'),
        body: t('An audit is a point-in-time assessment, not a guarantee. It must be read against the exact chain, contract address and deployed version.', 'การตรวจสอบเป็นการประเมิน ณ ช่วงเวลาหนึ่ง ไม่ใช่การรับประกัน ต้องพิจารณาให้ตรงกับเชน ที่อยู่สัญญา และเวอร์ชันที่ติดตั้งจริง'),
      },
    ],
  },

  'compliance/claims': {
    slug: 'compliance/claims',
    hero: {
      eyebrow: t('Claims & eligibility', 'การกล่าวอ้างและสิทธิ์'),
      title: t('The certificate is real. The claim still has rules.', 'ใบรับรองมีจริง แต่การกล่าวอ้างยังมีกฎ'),
      description: t(
        'REC Token does not replace the GHG Protocol, RE100, SBTi, CDP, T-VER or Thai domestic programmes. This page sets out what each framework requires and where the issuer cannot guarantee eligibility.',
        'REC Token ไม่ได้แทนที่ GHG Protocol, RE100, SBTi, CDP, T-VER หรือโครงการในประเทศไทย หน้านี้ระบุข้อกำหนดของแต่ละกรอบและจุดที่ผู้ออกไม่สามารถรับประกันสิทธิ์ได้'
      ),
      chips: [t('Scope 2', 'Scope 2'), t('Same market boundary', 'ขอบเขตตลาดเดียวกัน'), t('Case-by-case', 'รายกรณี')],
    },
    blocks: [
      {
        type: 'prose',
        id: 'boundary',
        title: t('Start with the instrument', 'เริ่มจากประเภทเครื่องมือ'),
        body: [
          t(
            'An I-REC evidences 1 MWh of renewable electricity and supports market-based Scope 2 reporting. A carbon credit evidences a greenhouse-gas reduction or removal and is generally used for Scope 1 and Scope 3. A T-VER credit is a Thai TGO-certified greenhouse-gas reduction or removal. REC Tokens are backed exclusively by I-RECs.',
            'I-REC เป็นหลักฐานแสดงไฟฟ้าหมุนเวียน 1 MWh และรองรับการรายงาน Scope 2 แบบ market-based คาร์บอนเครดิตเป็นหลักฐานแสดงการลดหรือกำจัดก๊าซเรือนกระจกและมักใช้กับ Scope 1 และ Scope 3 ส่วนเครดิต T-VER แสดงการลดหรือกำจัดก๊าซเรือนกระจกที่รับรองโดย อบก. REC Token มี I-REC รองรับเท่านั้น'
          ),
        ],
      },
      { type: 'frameworks', id: 'frameworks', title: t('Framework eligibility', 'สิทธิ์ตามกรอบรายงาน') },
      {
        type: 'prose',
        id: 'cross-border',
        title: t('Cross-border conditions', 'เงื่อนไขข้ามพรมแดน'),
        body: [
          t(
            'Use of certificates sourced from another country may be permitted only where the relevant conditions are satisfied, including market boundary, source disclosure, generation period, technology type, project age and any specific requirements of the reporting framework or assurance provider.',
            'การใช้ใบรับรองจากต่างประเทศอาจได้รับอนุญาตเฉพาะเมื่อเป็นไปตามเงื่อนไขที่เกี่ยวข้อง รวมถึงขอบเขตตลาด การเปิดเผยแหล่งกำเนิด ช่วงเวลาการผลิต ประเภทเทคโนโลยี อายุโครงการ และข้อกำหนดเฉพาะของกรอบรายงานหรือผู้ให้ความเชื่อมั่น'
          ),
        ],
        bullets: [
          t('Check the country of origin before redemption.', 'ตรวจสอบประเทศแหล่งกำเนิดก่อนแลกคืน'),
          t('Check the vintage against the reporting period.', 'ตรวจสอบวินเทจเทียบกับรอบรายงาน'),
          t('Check whether the framework requires cancellation in the reporting entity’s name.', 'ตรวจสอบว่ากรอบกำหนดให้ยกเลิกในนามองค์กรที่รายงานหรือไม่'),
          t('Confirm with the authority, assurance provider or advisor for domestic programmes.', 'ยืนยันกับหน่วยงาน ผู้ให้ความเชื่อมั่น หรือที่ปรึกษาสำหรับโครงการในประเทศ'),
        ],
      },
      {
        type: 'prose',
        id: 'domestic',
        title: t('Thai domestic policy', 'นโยบายในประเทศไทย'),
        body: [
          t(
            'Certain programmes - including green electricity tariffs (UGT), tax incentives and some procurement requirements - may require certificates originating in Thailand or impose conditions on technology, project age or generation year. Central Pool certificates are Southeast Asian and may not satisfy every domestic condition. The issuer does not guarantee eligibility for any specific programme.',
            'บางโครงการ เช่น อัตราค่าไฟฟ้าสีเขียว (UGT) สิทธิประโยชน์ทางภาษี และข้อกำหนดการจัดซื้อบางประเภท อาจกำหนดให้ใบรับรองมาจากประเทศไทย หรือมีเงื่อนไขด้านเทคโนโลยี อายุโครงการ หรือปีที่ผลิต ใบรับรองจาก Central Pool มาจากเอเชียตะวันออกเฉียงใต้และอาจไม่ตรงตามเงื่อนไขในประเทศทุกข้อ ผู้ออกไม่รับประกันสิทธิ์ในโครงการใดโดยเฉพาะ'
          ),
        ],
      },
      {
        type: 'callout',
        kind: 'danger',
        title: t('Not a guaranteed claim', 'ไม่ใช่การกล่าวอ้างที่รับประกัน'),
        body: t('Holding or redeeming REC Tokens does not guarantee eligibility for RE100, SBTi, CDP, T-VER, tax incentives or any domestic programme. Verify before you buy, redeem or retire.', 'การถือหรือแลกคืน REC Token ไม่รับประกันสิทธิ์ใน RE100, SBTi, CDP, T-VER สิทธิประโยชน์ทางภาษี หรือโครงการในประเทศใด ๆ ตรวจสอบก่อนซื้อ แลกคืน หรือไถ่ถอน'),
      },
    ],
  },

  'compliance/risk': {
    slug: 'compliance/risk',
    hero: {
      eyebrow: t('Risk factors', 'ปัจจัยความเสี่ยง'),
      title: t('Read this before you buy.', 'อ่านก่อนซื้อ'),
      description: t(
        'Digital tokens involve risk, including total loss of funds. The risks below are drawn from Chapter 07 of Whitepaper v1.1 and are not exhaustive.',
        'โทเคนดิจิทัลมีความเสี่ยง รวมถึงการสูญเสียเงินทั้งหมด ความเสี่ยงด้านล่างมาจากบทที่ 07 ของไวท์เปเปอร์ v1.1 และไม่ได้ครอบคลุมความเสี่ยงทั้งหมด'
      ),
      chips: [t('Regulatory', 'กฎระเบียบ'), t('Technology', 'เทคโนโลยี'), t('Market', 'ตลาด'), t('Operational', 'การดำเนินงาน')],
      warning: t('You may lose all funds used for purchase.', 'คุณอาจสูญเสียเงินทั้งหมดที่ใช้ซื้อ'),
    },
    blocks: [
      { type: 'risk', id: 'risks', title: t('Risk categories', 'ประเภทความเสี่ยง') },
      {
        type: 'callout',
        kind: 'danger',
        title: t('Total loss warning', 'คำเตือนการสูญเสียทั้งหมด'),
        body: t('The purchase of digital tokens involves risks. Purchasers may lose all funds used for the purchase. Prior to making any decision, purchasers should carefully review the whitepaper and assess the associated risks. REC Tokens are not financial instruments and are not intended for speculative purposes.', 'การซื้อโทเคนดิจิทัลมีความเสี่ยง ผู้ซื้ออาจสูญเสียเงินทั้งหมดที่ใช้ซื้อ ก่อนตัดสินใจ ผู้ซื้อควรอ่านไวท์เปเปอร์อย่างละเอียดและประเมินความเสี่ยงที่เกี่ยวข้อง REC Token ไม่ใช่เครื่องมือทางการเงินและไม่ได้มุ่งหมายเพื่อการเก็งกำไร'),
      },
      {
        type: 'links',
        id: 'next',
        title: t('Related', 'เนื้อหาที่เกี่ยวข้อง'),
        items: [
          { title: t('Custody & governance', 'การดูแลทรัพย์สินและการกำกับ'), body: t('How the assets are held and what happens on insolvency.', 'สินทรัพย์ถูกถืออย่างไรและเกิดอะไรขึ้นเมื่อล้มละลาย'), href: 'compliance', meta: t('Compliance', 'การกำกับดูแล') },
          { title: t('Appeals', 'การอุทธรณ์'), body: t('Pre-burn confirmation and the 14-day appeal window.', 'การยืนยันก่อนเผาและช่วงอุทธรณ์ 14 วัน'), href: 'compliance/appeals', meta: t('Process', 'กระบวนการ') },
          { title: t('Whitepaper', 'ไวท์เปเปอร์'), body: t('The full risk chapter and source text.', 'บทว่าด้วยความเสี่ยงฉบับเต็มและข้อความต้นฉบับ'), href: 'whitepaper', meta: t('Source', 'ต้นฉบับ') },
        ],
      },
    ],
  },

  'compliance/appeals': {
    slug: 'compliance/appeals',
    hero: {
      eyebrow: t('Appeals & disputes', 'การอุทธรณ์และข้อพิพาท'),
      title: t('You see the allocation before the burn.', 'คุณเห็นการจัดสรรก่อนการเผา'),
      description: t(
        'Redemption is not a black box. BlockEdge discloses the assets to be allocated before burning tokens, lets the holder cancel without penalty, and provides a 14-day window for functional usability appeals after confirmation.',
        'กระบวนการแลกคืนไม่ได้ปิดบังข้อมูล BlockEdge จะเปิดเผยสินทรัพย์ที่จะจัดสรรก่อนเผาโทเคน ให้ผู้ถือยกเลิกได้โดยไม่มีค่าปรับ และเปิดระยะเวลา 14 วันสำหรับอุทธรณ์ปัญหาที่กระทบต่อการใช้งานหลังการยืนยัน'
      ),
      chips: [t('14-day appeal', 'อุทธรณ์ 14 วัน'), t('7-day response', 'ตอบกลับ 7 วัน'), t('Pre-burn disclosure', 'เปิดเผยก่อนเผา')],
    },
    blocks: [
      {
        type: 'steps',
        id: 'process',
        title: t('The process', 'กระบวนการ'),
        items: APPEAL_STEPS.map((step) => ({ no: step.no, title: step.title, body: step.body })),
      },
      {
        type: 'prose',
        id: 'covered',
        title: t('What an appeal covers - and what it does not', 'อุทธรณ์ครอบคลุมอะไร และไม่ครอบคลุมอะไร'),
        body: [
          t(
            'Appeals are considered for functional usability issues: for example, an ESG eligibility concern, a regulatory limitation or a registry technical issue that prevents the allocated certificate from being used as intended. They do not cover personal preference, a change of mind after a confirmed burn, or dissatisfaction with market price.',
            'การอุทธรณ์จะได้รับการพิจารณาสำหรับปัญหาที่กระทบต่อการใช้งาน เช่น ปัญหาสิทธิ์ตามเกณฑ์ ESG ข้อจำกัดทางกฎระเบียบ หรือปัญหาทางเทคนิคของทะเบียนที่ทำให้ใบรับรองที่จัดสรรไม่สามารถใช้งานตามวัตถุประสงค์ การอุทธรณ์ไม่ครอบคลุมความชอบส่วนตัว การเปลี่ยนใจหลังยืนยันการเผาโทเคนแล้ว หรือความไม่พอใจในราคาตลาด'
          ),
        ],
      },
      {
        type: 'facts',
        id: 'timeline',
        title: t('Timeline', 'ระยะเวลา'),
        rows: [
          { label: t('Pre-burn disclosure', 'เปิดเผยก่อนเผา'), value: t('Before token burn', 'ก่อนเผาโทเคน') },
          { label: t('Cancellation', 'การยกเลิก'), value: t('Any time before burn, without penalty', 'ได้ตลอดเวลาก่อนเผา โดยไม่มีค่าปรับ') },
          { label: t('Appeal window', 'ช่วงอุทธรณ์'), value: t('14 days after confirmation', '14 วันหลังการยืนยัน') },
          { label: t('Response', 'การตอบกลับ'), value: t('Within 7 days of a complete appeal', 'ภายใน 7 วันนับจากได้รับคำอุทธรณ์ครบถ้วน') },
          { label: t('Total redemption period', 'ระยะเวลารวม'), value: t('Maximum 30 business days', 'ไม่เกิน 30 วันทำการ') },
        ],
      },
      {
        type: 'callout',
        kind: 'brand',
        title: t('How to submit', 'วิธีส่งอุทธรณ์'),
        body: t('Email info@blockedge.co with the transaction hash, a description of the issue and any supporting documents. Include your request ID if you have one.', 'อีเมล info@blockedge.co พร้อมแฮชธุรกรรม คำอธิบายปัญหา และเอกสารสนับสนุน หากมีรหัสคำขอให้ระบุด้วย'),
      },
    ],
  },

  documents: {
    slug: 'documents',
    hero: {
      eyebrow: t('Document library', 'คลังเอกสาร'),
      title: t('Documents and disclosures.', 'เอกสารและการเปิดเผยข้อมูล'),
      description: t(
        'The whitepaper, monthly reports, official announcements, regulatory evidence and legal policies in one index.',
        'ไวท์เปเปอร์ รายงานรายเดือน ประกาศอย่างเป็นทางการ หลักฐานการกำกับดูแล และนโยบายทางกฎหมายในที่เดียว'
      ),
      chips: [t('Whitepaper v1.1', 'ไวท์เปเปอร์ v1.1'), t('Monthly reports', 'รายงานรายเดือน'), t('Legal', 'กฎหมาย')],
    },
    blocks: [
      {
        type: 'links',
        id: 'core',
        title: t('Core disclosure', 'การเปิดเผยหลัก'),
        items: [
          { title: t('Whitepaper v1.1', 'ไวท์เปเปอร์ v1.1'), body: t('48 pages: tokenomics, governance, risk, redemption and glossary.', '48 หน้า: tokenomics การกำกับดูแล ความเสี่ยง การแลกคืน และอภิธานศัพท์'), href: 'whitepaper', meta: t('Version 1.1', 'เวอร์ชัน 1.1') },
          { title: t('Issuer liability announcement', 'ประกาศความรับผิดของผู้ออก'), body: t('The official statement on issuer responsibility and the Adverse Incident definition.', 'แถลงการณ์อย่างเป็นทางการเกี่ยวกับความรับผิดของผู้ออกและคำนิยามเหตุการณ์ไม่พึงประสงค์'), href: 'announcement', meta: t('Statement', 'แถลงการณ์') },
          { title: t('Monthly reports', 'รายงานรายเดือน'), body: t('Portfolio, asset composition, retirement and reconciliation status.', 'พอร์ต องค์ประกอบสินทรัพย์ การไถ่ถอน และสถานะการกระทบยอด'), href: 'reports', meta: t('Monthly', 'รายเดือน') },
          { title: t('Live data', 'ข้อมูลสด'), body: t('Supply, retirements and contract registry read from chain.', 'จำนวนโทเคน การไถ่ถอน และทะเบียนสัญญาที่อ่านจากเชน'), href: 'data', meta: t('Live', 'สด') },
        ],
      },
      {
        type: 'links',
        id: 'compliance',
        title: t('Regulatory evidence', 'หลักฐานการกำกับดูแล'),
        items: [
          { title: t('Regulatory overview', 'ภาพรวมการกำกับดูแล'), body: t('Issuer, classification, control framework, custody and appeals.', 'ผู้ออก การจำแนก กรอบการควบคุม การดูแลทรัพย์สิน และการอุทธรณ์'), href: 'compliance', meta: t('Hub', 'ศูนย์รวม') },
          { title: t('Controls & audit', 'การควบคุมและการตรวจสอบ'), body: t('Mint-on-lock, reconciliation, multi-sig and audit scope.', 'Mint-on-lock การกระทบยอด Multi-sig และขอบเขตการตรวจสอบ'), href: 'compliance/controls', meta: t('Controls', 'การควบคุม') },
          { title: t('Claims & eligibility', 'การกล่าวอ้างและสิทธิ์'), body: t('Scope 2, RE100, SBTi, CDP, T-VER and domestic limits.', 'Scope 2, RE100, SBTi, CDP, T-VER และข้อจำกัดในประเทศ'), href: 'compliance/claims', meta: t('Claims', 'การกล่าวอ้าง') },
          { title: t('Risk factors', 'ปัจจัยความเสี่ยง'), body: t('Regulatory, technology, market, operational and continuity risk.', 'ความเสี่ยงด้านกฎระเบียบ เทคโนโลยี ตลาด การดำเนินงาน และความต่อเนื่อง'), href: 'compliance/risk', meta: t('Risk', 'ความเสี่ยง') },
        ],
      },
      {
        type: 'table',
        id: 'register',
        title: t('Register', 'ทะเบียนเอกสาร'),
        columns: [t('Document', 'เอกสาร'), t('Type', 'ประเภท'), t('Status', 'สถานะ')],
        rows: [
          [t('Whitepaper v1.1', 'ไวท์เปเปอร์ v1.1'), t('PDF, 48 pages', 'PDF, 48 หน้า'), t('Published 2026', 'เผยแพร่ 2026')],
          [t('REC Portfolio Report - May 2026', 'รายงานพอร์ต REC - พฤษภาคม 2026'), t('Web report', 'รายงานเว็บ'), t('Published 31 May 2026', 'เผยแพร่ 31 พ.ค. 2026')],
          [t('Issuer liability announcement', 'ประกาศความรับผิดของผู้ออก'), t('Web statement', 'แถลงการณ์บนเว็บ'), t('Published', 'เผยแพร่')],
          [t('Privacy policy', 'นโยบายความเป็นส่วนตัว'), t('Policy', 'นโยบาย'), t('Version 1.0', 'เวอร์ชัน 1.0')],
          [t('Terms of service', 'ข้อกำหนดการให้บริการ'), t('Policy', 'นโยบาย'), t('Version 1.0', 'เวอร์ชัน 1.0')],
          [t('Cookie policy', 'นโยบายคุกกี้'), t('Policy', 'นโยบาย'), t('Version 1.0', 'เวอร์ชัน 1.0')],
        ],
      },
      {
        type: 'links',
        id: 'legal',
        title: t('Legal', 'กฎหมาย'),
        items: [
          { title: t('Privacy policy', 'นโยบายความเป็นส่วนตัว'), body: t('What data is collected and how it is used.', 'ข้อมูลที่เก็บและวิธีใช้'), href: 'legal/privacy', meta: t('Policy', 'นโยบาย') },
          { title: t('Terms of service', 'ข้อกำหนดการให้บริการ'), body: t('Access, user responsibilities, liability and governing law.', 'การเข้าถึง ความรับผิดชอบของผู้ใช้ ความรับผิด และกฎหมายที่ใช้บังคับ'), href: 'legal/terms', meta: t('Policy', 'นโยบาย') },
          { title: t('Cookie policy', 'นโยบายคุกกี้'), body: t('Cookie categories and how to control them.', 'ประเภทคุกกี้และวิธีควบคุม'), href: 'legal/cookies', meta: t('Policy', 'นโยบาย') },
        ],
      },
    ],
  },

  whitepaper: {
    slug: 'whitepaper',
    hero: {
      eyebrow: t('Primary source', 'ต้นฉบับหลัก'),
      title: t('Whitepaper v1.1', 'ไวท์เปเปอร์ v1.1'),
      description: t(
        'Comprehensive documentation of the REC Token ecosystem by BlockEdge: token design, governance, operating model, risk factors and glossary.',
        'เอกสารฉบับสมบูรณ์ของระบบนิเวศ REC Token โดย BlockEdge: การออกแบบโทเคน การกำกับดูแล โมเดลการดำเนินงาน ปัจจัยความเสี่ยง และอภิธานศัพท์'
      ),
      chips: [t('48 pages', '48 หน้า'), t('Version 1.1', 'เวอร์ชัน 1.1'), t('Updated 2026', 'อัปเดต 2026')],
    },
    actions: [
      { label: t('Download PDF', 'ดาวน์โหลด PDF'), href: SITE.whitepaper.url, variant: 'primary', external: true },
      { label: t('Read the summary', 'อ่านบทสรุป'), href: '#about' },
    ],
    blocks: [
      {
        type: 'prose',
        id: 'about',
        title: t('About this document', 'เกี่ยวกับเอกสารนี้'),
        body: [
          t(
            'This whitepaper presents the concept of tokenising International Renewable Energy Certificates using blockchain technology to create a transparent, verifiable and cross-border accessible system.',
            'ไวท์เปเปอร์นี้นำเสนอแนวคิดการแปลงใบรับรองพลังงานหมุนเวียนระหว่างประเทศเป็นโทเคนด้วยเทคโนโลยีบล็อกเชน เพื่อสร้างระบบที่โปร่งใส ตรวจสอบได้ และเข้าถึงได้ข้ามพรมแดน'
          ),
          t(
            'The REC Token operates under a multi-party framework with clear segregation of duties between the issuer (BlockEdge), asset aggregator (NetZero Carbon) and registrar (REDEX), ensuring environmental claims are transparent, verifiable and tamper-resistant.',
            'REC Token ดำเนินงานภายใต้โครงสร้างหลายฝ่ายที่มีการแยกหน้าที่ชัดเจนระหว่างผู้ออกโทเคน (BlockEdge) ผู้รวบรวมสินทรัพย์ (NetZero Carbon) และนายทะเบียน (REDEX) ทำให้การกล่าวอ้างด้านสิ่งแวดล้อมโปร่งใส ตรวจสอบได้ และทนต่อการแก้ไขโดยมิชอบ'
          ),
        ],
      },
      {
        type: 'facts',
        id: 'summary-facts',
        title: t('Token information', 'ข้อมูลโทเคน'),
        rows: [
          { label: t('Token name', 'ชื่อโทเคน'), value: t('REC Token', 'REC Token') },
          { label: t('Token type', 'ประเภทโทเคน'), value: t('Utility Token (ready-to-use)', 'ยูทิลิตี้โทเคน (พร้อมใช้งาน)') },
          { label: t('Underlying asset', 'สินทรัพย์อ้างอิง'), value: t('1 token = 1 MWh of I-REC', '1 โทเคน = 1 MWh ของ I-REC') },
          { label: t('Blockchain', 'บล็อกเชน'), value: t('ThaiFi (Tempo-compatible EVM)', 'ThaiFi (EVM ที่รองรับ Tempo)') },
          { label: t('Maximum supply', 'จำนวนโทเคนสูงสุด'), value: t('100,000,000 tokens', '100,000,000 โทเคน') },
          { label: t('Certification standard', 'มาตรฐานการรับรอง'), value: t('I-REC under the I-TRACK standard', 'I-REC ภายใต้มาตรฐาน I-TRACK') },
        ],
      },
      {
        type: 'contracts',
        id: 'contracts',
        title: t('Smart contract addresses', 'ที่อยู่สัญญาอัจฉริยะ'),
        intro: t('Always verify the active address on the explorer before interacting.', 'ตรวจสอบที่อยู่ที่ใช้งานบน explorer ก่อนโต้ตอบทุกครั้ง'),
      },
      {
        type: 'cards',
        id: 'features',
        title: t('Key features', 'คุณสมบัติสำคัญ'),
        intro: t('The mechanisms that make the 1:1 claim checkable.', 'กลไกที่ทำให้การกล่าวอ้าง 1:1 ตรวจสอบได้'),
        items: [
          { icon: 'Lock', title: t('Mint-on-Lock', 'Mint-on-Lock'), body: t('Tokens are minted only after I-RECs are verified and locked by REDEX.', 'โทเคนออกหลัง I-REC ผ่านการทวนสอบและถูกล็อกโดย REDEX เท่านั้น') },
          { icon: 'Fingerprint', title: t('Traceability', 'การตรวจสอบย้อนกลับ'), body: t('Certificate metadata and blockchain records preserve an immutable audit trail.', 'ข้อมูลกำกับของใบรับรองและบันทึกบนบล็อกเชนช่วยรักษาร่องรอยการตรวจสอบที่แก้ไขไม่ได้') },
          { icon: 'ShieldCheck', title: t('Double counting prevention', 'การป้องกันการนับซ้ำ'), body: t('One-way binding, periodic reconciliation and a public dashboard.', 'การผูกทางเดียว การกระทบยอดเป็นระยะ และแดชบอร์ดสาธารณะ') },
          { icon: 'Globe2', title: t('Cross-border recognition', 'การยอมรับข้ามพรมแดน'), body: t('Supports ASEAN cross-border I-REC use under GHG Protocol Scope 2, subject to eligibility.', 'รองรับการใช้ I-REC ข้ามพรมแดนในอาเซียนภายใต้ GHG Protocol Scope 2 โดยขึ้นอยู่กับการเข้าเกณฑ์') },
          { icon: 'Activity', title: t('Quarterly reconciliation', 'การกระทบยอดรายไตรมาส'), body: t('Circulating tokens are reconciled against locked I-RECs every quarter.', 'กระทบยอดโทเคนที่หมุนเวียนกับ I-REC ที่ล็อกทุกไตรมาส') },
          { icon: 'Recycle', title: t('FIFO by vintage', 'FIFO ตามวินเทจ'), body: t('Oldest vintages are allocated first during redemption.', 'วินเทจที่เก่าที่สุดถูกจัดสรรก่อนในการแลกคืน') },
        ],
      },
      {
        type: 'facts',
        id: 'whitelist',
        title: t('Asset whitelisting criteria', 'เกณฑ์การรับสินทรัพย์'),
        rows: [
          { label: t('Geographic boundary', 'ขอบเขตภูมิศาสตร์'), value: t('Southeast Asia only', 'เฉพาะเอเชียตะวันออกเฉียงใต้') },
          { label: t('Asset exclusivity', 'ประเภทสินทรัพย์'), value: t('Hydropower only - no solar, wind or biomass', 'พลังน้ำเท่านั้น - ไม่มีโซลาร์ ลม หรือชีวมวล') },
          { label: t('Vintage limit', 'ข้อจำกัดวินเทจ'), value: t('No older than two years from the generation year', 'ไม่เก่ากว่าสองปีนับจากปีที่ผลิต') },
          { label: t('Due diligence', 'การตรวจสอบ'), value: t('Generation data and documentation verified before sourcing', 'ตรวจสอบข้อมูลการผลิตและเอกสารก่อนจัดหา') },
        ],
      },
      {
        type: 'cards',
        id: 'allocation',
        title: t('Token allocation', 'การจัดสรรโทเคน'),
        columns: 2,
        items: [
          { icon: 'Users', title: t('40% - Direct user allocation', '40% - จัดสรรให้ผู้ใช้โดยตรง'), body: t('Minted and allocated to organisations or users who supply the underlying I-REC assets.', 'ออกและจัดสรรให้องค์กรหรือผู้ใช้ที่จัดหาสินทรัพย์ I-REC อ้างอิง'), tag: t('40%', '40%') },
          { icon: 'Landmark', title: t('60% - System liquidity reserve', '60% - สำรองสภาพคล่องของระบบ'), body: t('Reserved for liquidity and market access. Strictly operational; not a yield mechanism.', 'สำรองเพื่อสภาพคล่องและการเข้าถึงตลาด เพื่อการดำเนินงานเท่านั้น ไม่ใช่กลไกผลตอบแทน'), tag: t('60%', '60%') },
        ],
      },
      {
        type: 'cards',
        id: 'redemption-options',
        title: t('Redemption options', 'ตัวเลือกการแลกคืน'),
        items: [
          { icon: 'FileCheck2', title: t('Option 1 - receive I-REC', 'ตัวเลือก 1 - รับ I-REC'), body: t('I-RECs are transferred to the holder’s REDEX account without retirement. Legal entities only.', 'I-REC ถูกโอนเข้าบัญชี REDEX ของผู้ถือโดยไม่ไถ่ถอน นิติบุคคลเท่านั้น') },
          { icon: 'BadgeCheck', title: t('Option 2 - retire as legal entity', 'ตัวเลือก 2 - ไถ่ถอนในนามนิติบุคคล'), body: t('I-RECs are retired on REDEX and an official retirement certificate is issued.', 'I-REC ถูกไถ่ถอนบน REDEX และออกใบรับรองการไถ่ถอนอย่างเป็นทางการ') },
          { icon: 'Users', title: t('Option 3 - retire for an individual', 'ตัวเลือก 3 - ไถ่ถอนในนามบุคคล'), body: t('I-RECs are retired under BlockEdge’s account with the individual’s name recorded.', 'I-REC ถูกไถ่ถอนภายใต้บัญชี BlockEdge โดยบันทึกชื่อบุคคลไว้') },
        ],
      },
      {
        type: 'prose',
        id: 'pricing',
        title: t('Pricing mechanism', 'กลไกราคา'),
        body: [
          t(
            'REC Tokens are not offered in the primary market. Trading prices arise from exchange order matching and depend on supply, demand, liquidity and market conditions. The underlying I-REC OTC value and platform operating costs are factors the Company may consider when setting sell orders - not a formula, a price floor or a guarantee.',
            'REC Token ไม่ได้เสนอขายในตลาดแรก ราคาซื้อขายเกิดจากการจับคู่คำสั่งบนศูนย์ซื้อขาย และขึ้นอยู่กับอุปทาน อุปสงค์ สภาพคล่อง และสภาวะตลาด มูลค่า I-REC อ้างอิงในตลาด OTC และต้นทุนดำเนินงานของแพลตฟอร์มเป็นปัจจัยที่บริษัทอาจใช้พิจารณาเมื่อกำหนดคำสั่งขาย ไม่ใช่สูตร ราคาขั้นต่ำ หรือการรับประกัน'
          ),
          t(
            'The Company plans to place sell orders for a total of 300,000 REC Tokens through Bitkub Exchange from the first trading day, in 50 price levels from THB 10.00 to THB 19.80. This is a sell-side plan only; it does not constitute a buy-back commitment or a liquidity guarantee.',
            'บริษัทวางแผนวางคำสั่งขายรวม 300,000 REC Token ผ่าน Bitkub Exchange ตั้งแต่วันซื้อขายวันแรก จำนวน 50 ระดับราคา ตั้งแต่ 10.00 ถึง 19.80 บาท เป็นแผนฝั่งขายเท่านั้น ไม่ใช่ข้อผูกพันรับซื้อคืนหรือการรับประกันสภาพคล่อง'
          ),
        ],
      },
      {
        type: 'prose',
        id: 'summary-risk',
        title: t('Risk factors at a glance', 'ปัจจัยความเสี่ยงโดยสรุป'),
        body: [t('The full risk chapter is reproduced on the compliance pages.', 'บทว่าด้วยความเสี่ยงฉบับเต็มแสดงอยู่ในหน้าด้านการกำกับดูแล')],
        bullets: [
          t('Regulatory risk: changes in digital asset laws, environmental standards or domestic policy.', 'ความเสี่ยงด้านกฎระเบียบ: การเปลี่ยนแปลงกฎหมายสินทรัพย์ดิจิทัล มาตรฐานสิ่งแวดล้อม หรือนโยบายในประเทศ'),
          t('Technology risk: infrastructure, smart-contract vulnerabilities, integrations and transaction ordering.', 'ความเสี่ยงด้านเทคโนโลยี: โครงสร้างพื้นฐาน ช่องโหว่สัญญาอัจฉริยะ การเชื่อมต่อ และลำดับธุรกรรม'),
          t('Market risk: price volatility and limited liquidity.', 'ความเสี่ยงด้านตลาด: ความผันผวนของราคาและสภาพคล่องจำกัด'),
          t('Operational risk: reliance on NetZero Carbon, REDEX and Evident, and on external standards.', 'ความเสี่ยงด้านการดำเนินงาน: การพึ่งพา NetZero Carbon, REDEX และ Evident รวมถึงมาตรฐานภายนอก'),
          t('Business continuity: redundancy, blockchain state backup and emergency pause.', 'ความต่อเนื่องทางธุรกิจ: ระบบสำรอง การสำรองสถานะบล็อกเชน และการหยุดฉุกเฉิน'),
        ],
      },
      { type: 'toc', id: 'toc', title: t('Table of contents', 'สารบัญ') },
      {
        type: 'accordion',
        id: 'chapters',
        title: t('Chapter summaries', 'สรุปแต่ละบท'),
        intro: t('A reading guide. The PDF remains the authoritative text.', 'แนวทางการอ่าน ฉบับ PDF ยังเป็นข้อความอ้างอิงหลัก'),
        items: CHAPTERS.map((chapter) => ({
          q: t(`${chapter.no} - ${chapter.title.en}`, `${chapter.no} - ${chapter.title.th}`),
          a: t(
            chapter.body.en + ' ' + chapter.points.map((p) => `• ${p.en}`).join(' '),
            chapter.body.th + ' ' + chapter.points.map((p) => `• ${p.th}`).join(' ')
          ),
        })),
      },
      { type: 'partners', id: 'partners', title: t('Ecosystem partners', 'พันธมิตรในระบบนิเวศ') },
      { type: 'team', id: 'team', title: t('Management team', 'ทีมบริหาร') },
      { type: 'glossary', id: 'glossary', title: t('Definitions and glossary', 'คำนิยามและอภิธานศัพท์') },
      {
        type: 'callout',
        kind: 'warning',
        title: t('Risk warning', 'คำเตือนความเสี่ยง'),
        body: t('The purchase of digital tokens involves risks. Purchasers may lose all funds used for the purchase. Read the whitepaper and assess the associated risks before making any decision.', 'การซื้อโทเคนดิจิทัลมีความเสี่ยง ผู้ซื้ออาจสูญเสียเงินทั้งหมดที่ใช้ซื้อ อ่านไวท์เปเปอร์และประเมินความเสี่ยงที่เกี่ยวข้องก่อนตัดสินใจ'),
      },
    ],
  },

  issuer: {
    slug: 'issuer',
    hero: {
      eyebrow: t('Issuer & governance', 'ผู้ออกโทเคนและการกำกับ'),
      title: t('BlockEdge is the issuer - and carries the responsibility.', 'BlockEdge เป็นผู้ออกโทเคน และรับผิดชอบ'),
      description: t(
        'BlockEdge Co., Ltd. is the exclusive and authorised issuer of REC Tokens. The company is responsible for tokenisation, platform governance, smart-contract operations and coordination with the registry and asset aggregator.',
        'บริษัท บล็อกเอจ จำกัด เป็นผู้ออก REC Token แต่เพียงผู้เดียวและได้รับอนุญาต รับผิดชอบการแปลงเป็นโทเคน การกำกับแพลตฟอร์ม การดำเนินงานสัญญาอัจฉริยะ และการประสานงานกับทะเบียนและผู้รวบรวมสินทรัพย์'
      ),
      chips: [t('Thai limited company', 'บริษัทจำกัดไทย'), t('Reg. No. 0205566011711', 'ทะเบียนเลขที่ 0205566011711'), t('Chonburi, Thailand', 'ชลบุรี ประเทศไทย')],
    },
    actions: [
      { label: t('Issuer liability statement', 'แถลงการณ์ความรับผิด'), href: 'announcement', variant: 'primary' },
      { label: t('Regulatory overview', 'ภาพรวมการกำกับดูแล'), href: 'compliance' },
    ],
    blocks: [
      {
        type: 'facts',
        id: 'company',
        title: t('Company information', 'ข้อมูลบริษัท'),
        rows: [
          { label: t('Legal name', 'ชื่อกฎหมาย'), value: t('BlockEdge Co., Ltd.', 'บริษัท บล็อกเอจ จำกัด') },
          { label: t('Thai name', 'ชื่อภาษาไทย'), value: t('บริษัท บล็อกเอจ จำกัด', 'บริษัท บล็อกเอจ จำกัด') },
          { label: t('Registration', 'ทะเบียน'), value: t('0205566011711', '0205566011711') },
          { label: t('Registered office', 'สำนักงานจดทะเบียน'), value: t('39/129 Moo 7, Baan Suan, Mueng Chonburi, Chonburi 20000, Thailand', 'เลขที่ 39/129 หมู่ที่ 7 ตำบลบ้านสวน อำเภอเมืองชลบุรี จังหวัดชลบุรี 20000') },
          { label: t('Email', 'อีเมล'), value: t('info@blockedge.co', 'info@blockedge.co') },
          { label: t('Website', 'เว็บไซต์'), value: t('blockedge.co', 'blockedge.co') },
          { label: t('Governing law', 'กฎหมายที่ใช้บังคับ'), value: t('Kingdom of Thailand', 'ราชอาณาจักรไทย') },
        ],
      },
      {
        type: 'prose',
        id: 'role',
        title: t('Role and responsibilities', 'บทบาทและความรับผิดชอบ'),
        body: [
          t(
            'BlockEdge applies eligibility criteria to select qualifying I-RECs - hydropower projects in Southeast Asia with a vintage no older than two years - procures them from the asset aggregator, tokenises them into project-specific tokens at 1:1, and admits them into the Central Pool. The company designs, develops, deploys and maintains the smart contracts on ThaiFi and oversees governance to ensure operations comply with defined rules and standards.',
            'BlockEdge ใช้เกณฑ์การรับเข้าเพื่อคัดเลือก I-REC ที่เข้าเกณฑ์จากโครงการพลังน้ำในเอเชียตะวันออกเฉียงใต้ที่มีวินเทจไม่เกินสองปี จัดหา I-REC เหล่านั้นจากผู้รวบรวมสินทรัพย์ แปลงเป็นโทเคนรายโครงการในอัตรา 1:1 และนำเข้า Central Pool บริษัทออกแบบ พัฒนา ติดตั้ง และดูแลสัญญาอัจฉริยะบน ThaiFi และกำกับการดำเนินงานให้เป็นไปตามกฎและมาตรฐานที่กำหนด'
          ),
        ],
      },
      { type: 'team', id: 'team', title: t('Management team', 'ทีมบริหาร') },
      { type: 'partners', id: 'partners', title: t('Ecosystem partners', 'พันธมิตรในระบบนิเวศ') },
      {
        type: 'cards',
        id: 'programs',
        title: t('Program overview', 'ภาพรวมโครงการ'),
        items: [
          { icon: 'BadgeCheck', title: t('Verified projects', 'โครงการที่ทวนสอบแล้ว'), body: t('All renewable energy projects undergo rigorous verification and certification.', 'โครงการพลังงานหมุนเวียนทั้งหมดผ่านการทวนสอบและรับรองอย่างเข้มงวด') },
          { icon: 'Zap', title: t('Blockchain technology', 'เทคโนโลยีบล็อกเชน'), body: t('Tokenise renewable energy certificates with secure blockchain technology.', 'แปลงใบรับรองพลังงานหมุนเวียนเป็นโทเคนด้วยเทคโนโลยีบล็อกเชนที่ปลอดภัย') },
          { icon: 'Globe2', title: t('Global market access', 'การเข้าถึงตลาดโลก'), body: t('Reach international buyers and expand the renewable energy certificate market.', 'เข้าถึงผู้ซื้อระหว่างประเทศและขยายตลาดใบรับรองพลังงานหมุนเวียน') },
        ],
      },
      {
        type: 'cards',
        id: 'commitments',
        title: t('Our commitment and responsibility', 'ความมุ่งมั่นและความรับผิดชอบของเรา'),
        intro: t('Every REC Token issued by BlockEdge is backed by verified renewable energy certificates. We take full legal and technical responsibility for all tokenised assets.', 'ทุก REC Token ที่ BlockEdge ออกได้รับการรองรับด้วยใบรับรองพลังงานหมุนเวียนที่ทวนสอบแล้ว เรารับผิดชอบทางกฎหมายและทางเทคนิคเต็มที่ต่อสินทรัพย์ที่แปลงเป็นโทเคนทั้งหมด'),
        items: [
          { icon: 'Scale', title: t('Full legal responsibility', 'ความรับผิดชอบทางกฎหมายเต็มที่'), body: t('BlockEdge assumes complete legal responsibility for all REC Tokens issued, ensuring compliance with international renewable energy standards.', 'BlockEdge รับผิดชอบทางกฎหมายเต็มที่ต่อ REC Token ทั้งหมดที่ออก และปฏิบัติตามมาตรฐานพลังงานหมุนเวียนระหว่างประเทศ') },
          { icon: 'BadgeCheck', title: t('Certificate verification', 'การทวนสอบใบรับรอง'), body: t('Each token is backed by verified certificates from recognised authorities such as I-REC and national registries.', 'แต่ละโทเคนมีใบรับรองที่ผ่านการทวนสอบจากหน่วยงานที่ได้รับการยอมรับ เช่น I-REC และทะเบียนระดับประเทศรองรับ') },
          { icon: 'ShieldCheck', title: t('Blockchain integrity', 'ความสมบูรณ์ของบล็อกเชน'), body: t('Tokenisation uses secure blockchain technology, ensuring transparency, immutability and traceability of every token.', 'การแปลงเป็นโทเคนใช้เทคโนโลยีบล็อกเชนที่ปลอดภัย ทำให้ทุกโทเคนโปร่งใส แก้ไขไม่ได้ และตรวจสอบย้อนกลับได้') },
        ],
      },
      {
        type: 'prose',
        id: 'liability',
        title: t('Issuer liability', 'ความรับผิดของผู้ออกโทเคน'),
        body: [
          t(
            'The issuer is solely responsible and liable for the issuance, utility, pool and related mechanisms of the tokens and underlying I-RECs, including redemption and retirement. The official announcement sets out the events in which the issuer may reduce token quantities or take other protective action, and defines an Adverse Incident.',
            'ผู้ออกโทเคนรับผิดชอบแต่เพียงผู้เดียวต่อการออก ประโยชน์ใช้สอย พูล และกลไกที่เกี่ยวข้องของโทเคนและ I-REC อ้างอิง รวมถึงการแลกคืนและการไถ่ถอน ประกาศอย่างเป็นทางการระบุเหตุการณ์ที่ผู้ออกอาจลดจำนวนโทเคนหรือดำเนินการป้องกันอื่น และนิยามเหตุการณ์ไม่พึงประสงค์'
          ),
        ],
      },
      {
        type: 'prose',
        id: 'trust',
        title: t("Trust in BlockEdge's REC Token issuance", 'ความไว้วางใจในการออก REC Token ของ BlockEdge'),
        body: [
          t(
            'When you hold REC Tokens issued by BlockEdge, each token is intended to represent authentic, verified renewable energy certificates with the legal and technical responsibility described in the whitepaper. Trust is supported by the registry record, the audit trail and the issuer’s published disclosures - not by a marketing claim.',
            'เมื่อคุณถือ REC Token ที่ BlockEdge ออก แต่ละโทเคนมีจุดประสงค์เพื่อเป็นตัวแทนของใบรับรองพลังงานหมุนเวียนที่แท้จริงและผ่านการทวนสอบ พร้อมความรับผิดชอบทางกฎหมายและทางเทคนิคตามที่ระบุในไวท์เปเปอร์ ความไว้วางใจมีรากฐานจากบันทึกในทะเบียน ร่องรอยการตรวจสอบ และการเปิดเผยข้อมูลของผู้ออก ไม่ใช่ข้อความทางการตลาด'
          ),
        ],
      },
      {
        type: 'callout',
        kind: 'brand',
        title: t('Official issuer status', 'สถานะผู้ออกโทเคนอย่างเป็นทางการ'),
        body: t(
          'BlockEdge Co., Ltd. is the authorised entity responsible for all REC Token issuance on the platform. When you hold REC Tokens issued by BlockEdge, each token represents a verified renewable energy certificate with the legal and technical responsibility described in the whitepaper.',
          'บริษัท บล็อกเอจ จำกัด เป็นนิติบุคคลที่ได้รับอนุญาตและรับผิดชอบการออก REC Token ทั้งหมดบนแพลตฟอร์ม เมื่อคุณถือ REC Token ที่ BlockEdge ออก แต่ละโทเคนแสดงถึงใบรับรองพลังงานหมุนเวียนที่ทวนสอบแล้ว พร้อมความรับผิดชอบทางกฎหมายและทางเทคนิคตามที่ระบุในไวท์เปเปอร์'
        ),
      },
    ],
  },

  announcement: {
    slug: 'announcement',
    hero: {
      eyebrow: t('Official announcement', 'ประกาศอย่างเป็นทางการ'),
      title: t("Issuer's Liability to Token Holders", 'ความรับผิดของผู้ออกโทเคนต่อผู้ถือโทเคน'),
      description: t('The official statement on BlockEdge’s responsibility and liability to REC Token holders.', 'แถลงการณ์อย่างเป็นทางการเกี่ยวกับความรับผิดชอบและความรับผิดของ BlockEdge ต่อผู้ถือ REC Token'),
      chips: [t('Legal disclosure', 'การเปิดเผยทางกฎหมาย'), t('Issuer statement', 'แถลงการณ์ผู้ออก')],
      warning: t('This statement forms part of the legal disclosure set.', 'แถลงการณ์นี้เป็นส่วนหนึ่งของชุดการเปิดเผยทางกฎหมาย'),
    },
    blocks: [
      {
        type: 'prose',
        id: 'statement',
        title: t('Statement', 'แถลงการณ์'),
        body: [
          t(
            'It is acknowledged that BlockEdge (the "Issuer") is the issuer of the REC TOKEN and the Project-specific tokens. Accordingly, the Issuer shall be solely responsible and liable for the issuance, utility, Pool and relevant mechanisms relating to the REC TOKEN, the Project-specific tokens and the underlying REC, including the related processes such as the redemption and retirement processes thereof.',
            'เป็นที่รับทราบว่า BlockEdge ("ผู้ออกโทเคน") เป็นผู้ออก REC TOKEN และโทเคนรายโครงการ ดังนั้นผู้ออกโทเคนจะรับผิดชอบและรับผิดแต่เพียงผู้เดียวต่อการออก ประโยชน์ใช้สอย พูล และกลไกที่เกี่ยวข้องของ REC TOKEN โทเคนรายโครงการ และ REC อ้างอิง รวมถึงกระบวนการที่เกี่ยวข้อง เช่น การแลกคืนและการไถ่ถอน'
          ),
          t('Upon the occurrence of any of the following events:', 'เมื่อเกิดเหตุการณ์ใด ๆ ต่อไปนี้:'),
          t(
            '(i) Where the underlying REC are nearing the end of their useful life or are of an older vintage, and the Issuer decides to reduce the number of the REC TOKEN, the Project-specific tokens and the underlying REC by reason of such matter;',
            '(i) เมื่อ REC อ้างอิงใกล้สิ้นสุดอายุการใช้งานหรือมีวินเทจเก่า และผู้ออกโทเคนตัดสินใจลดจำนวน REC TOKEN โทเคนรายโครงการ และ REC อ้างอิง ด้วยเหตุนั้น'
          ),
          t(
            '(ii) Where the REC TOKEN, the Project-specific tokens and the underlying REC are otherwise to be disposed of by reason of disqualification under the laws of Thailand, any rules imposed by Bitkub Exchange or the whitelist disclosed by the Issuer; or',
            '(ii) เมื่อ REC TOKEN โทเคนรายโครงการ และ REC อ้างอิงต้องถูกจำหน่ายออกด้วยเหตุที่ขาดคุณสมบัติตามกฎหมายไทย กฎที่ Bitkub Exchange กำหนด หรือ whitelist ที่ผู้ออกโทเคนเปิดเผย; หรือ'
          ),
          t(
            '(iii) Where there is any fraud, Adverse Incident, misconduct or violation of the I-REC Code and/or any applicable standard, the laws of Thailand and/or any other governing law in connection with the underlying REC, the Project-specific tokens, the REC TOKEN, the whitelist disclosed by the Issuer, the project, the pool, or the redemption or retirement process of the underlying REC, the Project-specific tokens and/or the REC TOKEN,',
            '(iii) เมื่อมีการฉ้อโกง เหตุการณ์ไม่พึงประสงค์ (Adverse Incident) การประพฤติผิด หรือการละเมิด I-REC Code และ/หรือมาตรฐานที่ใช้บังคับ กฎหมายไทย และ/หรือกฎหมายอื่นที่ใช้บังคับเกี่ยวกับ REC อ้างอิง โทเคนรายโครงการ REC TOKEN whitelist ที่ผู้ออกเปิดเผย โครงการ พูล หรือกระบวนการแลกคืนหรือไถ่ถอนของ REC อ้างอิง โทเคนรายโครงการ และ/หรือ REC TOKEN'
          ),
          t(
            'the Issuer may decide to (1) reduce the number of the REC TOKEN, the Project-specific tokens and/or the underlying REC; or (2) take any other action that the Issuer deems appropriate to protect the rights and benefits of the token holders. The Issuer shall disclose any such decision to the token holders in advance of implementation.',
            'ผู้ออกโทเคนอาจตัดสินใจ (1) ลดจำนวน REC TOKEN โทเคนรายโครงการ และ/หรือ REC อ้างอิง; หรือ (2) ดำเนินการอื่นใดที่ผู้ออกเห็นว่าเหมาะสมเพื่อคุ้มครองสิทธิ์และประโยชน์ของผู้ถือโทเคน ผู้ออกจะเปิดเผยการตัดสินใจดังกล่าวต่อผู้ถือโทเคนล่วงหน้าก่อนดำเนินการ'
          ),
        ],
      },
      {
        type: 'callout',
        kind: 'warning',
        title: t('Definition: "Adverse Incident"', 'คำนิยาม: "Adverse Incident"'),
        body: t(
          'Any unauthorized access, intrusion, penetration, hack, theft, loss, fraud, misappropriation, malware, ransomware, unlawful attack, social engineering, unauthorized transfer or any other unlawful activity, or any act or omission by the Issuer or any other person that causes or may cause any harm, loss, depletion, encumbrance or adverse impact to or in respect of the underlying REC, the Project-specific tokens and/or the REC TOKEN.',
          'การเข้าถึงโดยไม่ได้รับอนุญาต การบุกรุก การเจาะระบบ การแฮก การโจรกรรม การสูญหาย การฉ้อโกง การยักยอก มัลแวร์ แรนซัมแวร์ การโจมตีที่ผิดกฎหมาย วิศวกรรมสังคม การโอนโดยไม่ได้รับอนุญาต หรือกิจกรรมผิดกฎหมายอื่นใด หรือการกระทำหรือการละเว้นการกระทำของผู้ออกหรือบุคคลอื่นใดที่ก่อหรืออาจก่อให้เกิดความเสียหาย การสูญเสีย การลดลง ภาระผูกพัน หรือผลกระทบเชิงลบต่อ REC อ้างอิง โทเคนรายโครงการ และ/หรือ REC TOKEN'
        ),
      },
      {
        type: 'links',
        id: 'next',
        title: t('Related disclosures', 'การเปิดเผยที่เกี่ยวข้อง'),
        items: [
          { title: t('Regulatory overview', 'ภาพรวมการกำกับดูแล'), body: t('The complete compliance evidence base.', 'ฐานหลักฐานการกำกับดูแลทั้งหมด'), href: 'compliance', meta: t('Compliance', 'การกำกับดูแล') },
          { title: t('Risk factors', 'ปัจจัยความเสี่ยง'), body: t('The risks that can trigger protective action.', 'ความเสี่ยงที่อาจนำไปสู่การดำเนินการป้องกัน'), href: 'compliance/risk', meta: t('Risk', 'ความเสี่ยง') },
          { title: t('Whitepaper', 'ไวท์เปเปอร์'), body: t('Chapter 08.5 on disclaimer and liability.', 'บทที่ 08.5 ว่าด้วยข้อสงวนสิทธิ์และความรับผิด'), href: 'whitepaper', meta: t('Source', 'ต้นฉบับ') },
        ],
      },
    ],
  },

  contact: {
    slug: 'contact',
    hero: {
      eyebrow: t('Contact', 'ติดต่อ'),
      title: t('Contact the issuer directly.', 'ติดต่อผู้ออกโทเคนโดยตรง'),
      description: t(
        'Support, redemption questions, complaints and media enquiries. For appeals, include the transaction hash and request ID so the team can trace the case.',
        'ติดต่อเพื่อขอความช่วยเหลือ สอบถามเรื่องการแลกคืน ส่งข้อร้องเรียน หรือสอบถามสำหรับสื่อมวลชน สำหรับการอุทธรณ์ โปรดระบุแฮชธุรกรรมและรหัสคำขอเพื่อให้ทีมตรวจสอบกรณีได้'
      ),
      chips: [t('Response within 24 hours', 'ตอบกลับภายใน 24 ชั่วโมง'), t('Mon-Fri, 9:00-18:00 ICT', 'จ.-ศ. 9:00-18:00 น.'), t('Bangkok time', 'เวลาไทย')],
    },
    blocks: [
      {
        type: 'cards',
        id: 'channels',
        title: t('Channels', 'ช่องทาง'),
        columns: 2,
        items: [
          { icon: 'Mail', title: t('General and issuer enquiries', 'สอบถามทั่วไปและผู้ออกโทเคน'), body: t('info@blockedge.co - company, issuer and compliance questions.', 'info@blockedge.co - คำถามเกี่ยวกับบริษัท ผู้ออก และการกำกับดูแล'), tag: t('Email', 'อีเมล') },
          { icon: 'Recycle', title: t('Redemption and retirement', 'การแลกคืนและการไถ่ถอน'), body: t('info@blockedge.earth - include your request ID and transaction hash.', 'info@blockedge.earth - ระบุรหัสคำขอและแฮชธุรกรรม'), tag: t('Support', 'สนับสนุน') },
          { icon: 'Scale', title: t('Complaints and appeals', 'ข้อร้องเรียนและการอุทธรณ์'), body: t('Email info@blockedge.co with the transaction hash, issue description and supporting documents.', 'อีเมล info@blockedge.co พร้อมแฮชธุรกรรม คำอธิบายปัญหา และเอกสารสนับสนุน'), tag: t('14-day window', 'ช่วง 14 วัน') },
          { icon: 'Megaphone', title: t('Official channels', 'ช่องทางอย่างเป็นทางการ'), body: t('Follow only the accounts listed in the footer. Verify announcements against this website.', 'ติดตามเฉพาะบัญชีที่ระบุในส่วนท้ายเว็บไซต์ ตรวจสอบประกาศกับเว็บไซต์นี้'), tag: t('Social', 'โซเชียล') },
        ],
      },
      {
        type: 'facts',
        id: 'company',
        title: t('Company', 'บริษัท'),
        rows: [
          { label: t('Legal name', 'ชื่อกฎหมาย'), value: t('BlockEdge Co., Ltd.', 'บริษัท บล็อกเอจ จำกัด') },
          { label: t('Registration', 'ทะเบียน'), value: t('0205566011711', '0205566011711') },
          { label: t('Address', 'ที่อยู่'), value: t(SITE.address.en, SITE.address.th) },
          { label: t('Email', 'อีเมล'), value: t('info@blockedge.co', 'info@blockedge.co') },
          { label: t('Business hours', 'เวลาทำการ'), value: t('Monday-Friday, 09:00-18:00 ICT', 'จันทร์-ศุกร์ 09:00-18:00 น.') },
          { label: t('Response time', 'เวลาตอบกลับ'), value: t('Within 24 hours', 'ภายใน 24 ชั่วโมง') },
        ],
      },
      {
        type: 'prose',
        id: 'appeal',
        title: t('What to include in an appeal', 'สิ่งที่ควรระบุในการอุทธรณ์'),
        body: [t('A complete appeal can be reviewed faster.', 'คำอุทธรณ์ที่ครบถ้วนช่วยให้พิจารณาได้เร็วขึ้น')],
        bullets: [
          t('Transaction hash and request ID.', 'แฮชธุรกรรมและรหัสคำขอ'),
          t('The asset details disclosed before the burn.', 'รายละเอียดสินทรัพย์ที่เปิดเผยก่อนเผา'),
          t('A clear description of the functional issue.', 'คำอธิบายปัญหาการใช้งานที่ชัดเจน'),
          t('Supporting documents from the registry, assurance provider or authority.', 'เอกสารสนับสนุนจากทะเบียน ผู้ให้ความเชื่อมั่น หรือหน่วยงาน'),
        ],
      },
      {
        type: 'callout',
        kind: 'info',
        title: t('No investment advice', 'ไม่ใช่คำแนะนำการลงทุน'),
        body: t('BlockEdge does not provide investment, tax or legal advice. For eligibility under a reporting framework, consult the framework owner, assurance provider or a qualified advisor.', 'BlockEdge ไม่ให้คำแนะนำการลงทุน ภาษี หรือกฎหมาย สำหรับสิทธิ์ภายใต้กรอบรายงาน โปรดปรึกษาเจ้าของกรอบ ผู้ให้ความเชื่อมั่น หรือที่ปรึกษาที่มีคุณสมบัติ'),
      },
    ],
  },
};

export const CONTENT_SLUGS = Object.keys(CONTENT_PAGES);

export const HOME_CONTENT = {
  chapters: CHAPTERS,
  glossary: GLOSSARY,
  toc: WHITEPAPER_TOC,
  executive: EXECUTIVE_FACTS,
  standards: STANDARDS,
  why: WHY,
  comparison: COMPARISON,
};
