export const HERO = {
  eyebrow: { en: 'Utility token · I-REC backed · ThaiFi', th: 'ยูทิลิตี้โทเคน · รองรับด้วย I-REC · ThaiFi' },
  title: {
    en: 'The verified megawatt-hour, on-chain.',
    th: 'เมกะวัตต์ชั่วโมงที่ตรวจสอบแล้ว บนบล็อกเชน',
  },
  titleAccent: { en: 'on-chain.', th: 'บนบล็อกเชน' },
  lede: {
    en: 'REC Token is a blockchain-based digital twin of International Renewable Energy Certificates. Every token is issued 1:1 against a certificate locked in the registry - traceable from generation to retirement.',
    th: 'REC Token เป็นตัวแทนดิจิทัลบนบล็อกเชนของใบรับรองพลังงานหมุนเวียนระหว่างประเทศ (I-REC) โดยออกโทเคนในอัตรา 1:1 เทียบกับใบรับรองที่ล็อกไว้ในทะเบียน และตรวจสอบย้อนกลับได้ตั้งแต่การผลิตไฟฟ้าจนถึงการไถ่ถอน',
  },
  meta: [
    { en: '1 token = 1 MWh', th: '1 โทเคน = 1 MWh' },
    { en: 'Max supply 100M', th: 'จำนวนโทเคนสูงสุด 100 ล้าน' },
    { en: 'Audited by Valix', th: 'ตรวจสอบโดย Valix' },
    { en: 'Registry: Evident', th: 'ทะเบียน: Evident' },
  ],
};

export const ASSET_SECTION = {
  index: '01',
  eyebrow: { en: 'The asset', th: 'สินทรัพย์' },
  title: {
    en: 'One token. 1 MWh. One audit trail.',
    th: 'หนึ่งโทเคน เท่ากับ 1 MWh ตรวจสอบย้อนกลับได้',
  },
  lede: {
    en: 'REC Token does not invent a new environmental asset. It makes an existing, registry-verified certificate easier to hold, transfer and retire - without losing the audit trail.',
    th: 'REC Token ไม่ได้สร้างสินทรัพย์ด้านสิ่งแวดล้อมขึ้นใหม่ แต่ช่วยให้ถือครอง โอน และไถ่ถอนใบรับรองที่มีอยู่และผ่านการทวนสอบในทะเบียนได้ง่ายขึ้น พร้อมตรวจสอบย้อนกลับได้',
  },
  cards: [
    {
      title: { en: 'The certificate', th: 'ใบรับรอง' },
      body: {
        en: 'An I-REC proves that 1 MWh of renewable electricity was generated and assigns its environmental attributes to the holder. Certificates are issued under the I-TRACK standard and recorded in Evident.',
        th: 'I-REC รับรองว่ามีการผลิตไฟฟ้าจากพลังงานหมุนเวียน 1 MWh และแสดงสิทธิในคุณลักษณะด้านสิ่งแวดล้อมของไฟฟ้านั้น ใบรับรองออกภายใต้มาตรฐาน I-TRACK และบันทึกในทะเบียน Evident',
      },
      tag: { en: 'I-REC / I-TRACK', th: 'I-REC / I-TRACK' },
    },
    {
      title: { en: 'The lock', th: 'การล็อก' },
      body: {
        en: 'Before any token exists, the certificate is transferred to an account in BlockEdge’s name and locked in REDEX’s ReHash platform. The lock is the proof that the asset cannot be sold twice.',
        th: 'ก่อนออกโทเคน ใบรับรองจะถูกโอนเข้าบัญชีในนาม BlockEdge และล็อกไว้บนแพลตฟอร์ม ReHash ของ REDEX เพื่อป้องกันการนำสินทรัพย์เดียวกันไปขายซ้ำ',
      },
      tag: { en: 'REDEX / ReHash', th: 'REDEX / ReHash' },
    },
    {
      title: { en: 'The token', th: 'โทเคน' },
      body: {
        en: 'An ERC-20 token is minted only after the lock is confirmed. It can be held, transferred, pooled or redeemed. When it is redeemed, it is burned - permanently removing the claim from circulation.',
        th: 'โทเคน ERC-20 จะออกหลังจากยืนยันการล็อกใบรับรองแล้วเท่านั้น ผู้ถือสามารถถือครอง โอน ฝากเข้าพูล หรือแลกคืนได้ เมื่อแลกคืน โทเคนจะถูกเผาและนำออกจากการหมุนเวียนอย่างถาวร',
      },
      tag: { en: 'ERC-20 / ThaiFi', th: 'ERC-20 / ThaiFi' },
    },
  ],
};

export const REGULATOR_SECTION = {
  index: '02',
  eyebrow: { en: 'For regulators and assurance providers', th: 'สำหรับหน่วยงานกำกับดูแลและผู้ตรวจสอบ' },
  title: { en: 'Regulatory evidence, in one place.', th: 'รวมหลักฐานสำหรับการกำกับดูแลไว้ในที่เดียว' },
  lede: {
    en: 'Different authorities ask different questions. This is the evidence each one needs, with links to the primary source for every claim.',
    th: 'แต่ละหน่วยงานมีประเด็นที่ต้องพิจารณาแตกต่างกัน เราจึงรวบรวมหลักฐานที่เกี่ยวข้อง พร้อมลิงก์ไปยังแหล่งข้อมูลต้นฉบับ',
  },
};

export const LIFECYCLE = {
  index: '03',
  eyebrow: { en: 'Lifecycle', th: 'วงจรชีวิต' },
  title: { en: 'From generation to retirement, in six checkpoints.', th: 'จากการผลิตไฟฟ้าถึงการไถ่ถอน ผ่าน 6 ขั้นตอน' },
  lede: {
    en: 'Each step has a different operator. That separation is deliberate: no single party can create, lock, trade and retire the same asset alone.',
    th: 'แต่ละขั้นตอนมีผู้ดำเนินการต่างกัน โดยแยกหน้าที่อย่างชัดเจน ไม่มีฝ่ายใดสามารถสร้าง ล็อก ซื้อขาย และไถ่ถอนสินทรัพย์เดียวกันได้โดยลำพัง',
  },
  steps: [
    {
      no: '01',
      title: { en: 'Verify & issue', th: 'ทวนสอบและออกใบรับรอง' },
      body: {
        en: 'A hydropower project submits generation and project data. Evident verifies compliance with the I-REC standard and issues certificates.',
        th: 'โครงการพลังน้ำส่งข้อมูลการผลิตไฟฟ้าและข้อมูลโครงการให้ Evident ทวนสอบตามมาตรฐาน I-REC ก่อนออกใบรับรอง',
      },
      who: { en: 'Evident', th: 'Evident' },
    },
    {
      no: '02',
      title: { en: 'Aggregate & lock', th: 'รวบรวมและล็อก' },
      body: {
        en: 'NetZero Carbon sources qualifying certificates. They are transferred to BlockEdge’s account and locked in ReHash for tokenisation.',
        th: 'NetZero Carbon จัดหาใบรับรองที่ผ่านเกณฑ์ จากนั้นโอนเข้าบัญชีของ BlockEdge และล็อกไว้ใน ReHash เพื่อแปลงเป็นโทเคน',
      },
      who: { en: 'NetZero Carbon / REDEX', th: 'NetZero Carbon / REDEX' },
    },
    {
      no: '03',
      title: { en: 'Mint project tokens', th: 'ออกโทเคนรายโครงการ' },
      body: {
        en: 'After the lock is confirmed and approved by multi-signature, BlockEdge mints project-specific tokens at 1:1 against the certificates.',
        th: 'หลังจากยืนยันการล็อกและได้รับอนุมัติด้วยลายมือชื่อจากหลายฝ่าย BlockEdge จะออกโทเคนรายโครงการในอัตรา 1:1 เทียบกับใบรับรอง',
      },
      who: { en: 'BlockEdge', th: 'BlockEdge' },
    },
    {
      no: '04',
      title: { en: 'Pool & make fungible', th: 'รวมโทเคนเข้าพูล' },
      body: {
        en: 'Project tokens can be deposited into the Central Pool at 1:1 to receive Pool Tokens - the fungible token intended for exchange trading.',
        th: 'ผู้ถือสามารถฝากโทเคนรายโครงการเข้า Central Pool ในอัตรา 1:1 เพื่อรับ Pool Token ซึ่งเป็นโทเคนที่ใช้แทนกันได้และใช้ซื้อขายบนศูนย์ซื้อขาย',
      },
      who: { en: 'Central Pool', th: 'Central Pool' },
    },
    {
      no: '05',
      title: { en: 'Trade or transfer', th: 'ซื้อขายหรือโอน' },
      body: {
        en: 'Pool Tokens trade on authorised exchanges subject to their rules. Peer-to-peer transfers between ERC-20 wallets are supported.',
        th: 'Pool Token สามารถซื้อขายบนศูนย์ซื้อขายที่ได้รับอนุญาตตามกฎของแต่ละศูนย์ และโอนระหว่างกระเป๋าที่รองรับ ERC-20 ได้',
      },
      who: { en: 'Exchange / wallet', th: 'ศูนย์ซื้อขาย / กระเป๋า' },
    },
    {
      no: '06',
      title: { en: 'Redeem or retire', th: 'แลกคืนหรือไถ่ถอน' },
      body: {
        en: 'Tokens are burned and I-RECs are allocated FIFO by vintage. The holder receives the certificates or retires them for a verified claim.',
        th: 'โทเคนจะถูกเผาและจัดสรร I-REC ตามลำดับวินเทจแบบ FIFO โดยผู้ถือเลือกรับใบรับรองหรือไถ่ถอนเพื่อนำไปชดเชย',
      },
      who: { en: 'BlockEdge / REDEX', th: 'BlockEdge / REDEX' },
    },
  ],
};

export const STANDARDS = {
  index: '06',
  eyebrow: { en: 'Frameworks', th: 'กรอบมาตรฐาน' },
  title: { en: 'Know exactly which claim the certificate supports.', th: 'ทำความเข้าใจว่าใบรับรองรองรับการกล่าวอ้างใดบ้าง' },
  lede: {
    en: 'RECs are only one part of the standards landscape. Tokenising a REC does not remove the rights it carries under those standards.',
    th: 'REC เป็นเพียงส่วนหนึ่งของมาตรฐาน การนำ REC มาแปลงเป็นโทเคนไม่ได้ทำให้สูญเสียสิทธิ์ตามมาตรฐานไป',
  },
  items: [
    { name: 'I-REC', note: { en: 'Certificate standard', th: 'มาตรฐานใบรับรอง' } },
    { name: 'GHG Protocol', note: { en: 'Scope 2, market-based', th: 'Scope 2 แบบ market-based' } },
    { name: 'RE100', note: { en: 'Same market boundary', th: 'ขอบเขตตลาดเดียวกัน' } },
    { name: 'SBTi', note: { en: 'Target validation', th: 'การทวนสอบเป้าหมาย' } },
    { name: 'CDP', note: { en: 'Disclosure framework', th: 'กรอบการเปิดเผยข้อมูล' } },
    { name: 'T-VER / TGO', note: { en: 'Different instrument', th: 'เป็นสินทรัพย์คนละประเภท' } },
    { name: 'CBAM', note: { en: 'Demand driver', th: 'ปัจจัยขับเคลื่อนอุปสงค์' } },
  ],
};

export const WHY = {
  index: '07',
  eyebrow: { en: 'Why it matters', th: 'ทำไมเรื่องนี้จึงสำคัญ' },
  title: { en: 'Three problems the token is designed to reduce.', th: '3 ปัญหาที่โทเคนออกแบบมาเพื่อช่วยลด' },
  cards: [
    {
      icon: 'BadgeCheck',
      title: { en: 'Verified backing', th: 'มีสินทรัพย์อ้างอิงที่ตรวจสอบได้' },
      body: {
        en: 'Every token is backed by a registry-verified I-REC. The certificate is locked before the token exists, so the backing is a recorded on-chain state.',
        th: 'ทุกโทเคนมี I-REC ที่ผ่านการทวนสอบในทะเบียนเป็นสินทรัพย์อ้างอิง โดยใบรับรองจะถูกล็อกก่อนออกโทเคน และมีการบันทึกสถานะการรองรับไว้บนเชน',
      },
    },
    {
      icon: 'Fingerprint',
      title: { en: 'Double counting, prevented by design', th: 'ป้องกันการนับซ้ำโดยการออกแบบ' },
      body: {
        en: 'One-way binding means a certificate cannot back a token and be sold in the traditional market at the same time. Quarterly reconciliation checks the whole book.',
        th: 'กลไกผูกสินทรัพย์ทางเดียวป้องกันไม่ให้นำใบรับรองที่รองรับโทเคนไปขายในตลาดเดิมพร้อมกัน พร้อมตรวจสอบภาพรวมผ่านการกระทบยอดรายไตรมาส',
      },
    },
    {
      icon: 'Globe2',
      title: { en: 'Cross-border liquidity', th: 'สภาพคล่องข้ามพรมแดน' },
      body: {
        en: 'A fungible pool token lets Southeast Asian hydropower certificates reach buyers who need them, while redemption preserves FIFO-by-vintage allocation and pre-burn disclosure.',
        th: 'พูลโทเคนที่ใช้แทนกันได้ช่วยให้ผู้ซื้อเข้าถึงใบรับรองจากโครงการพลังน้ำในเอเชียตะวันออกเฉียงใต้ โดยเมื่อแลกคืนจะจัดสรรใบรับรองตามลำดับวินเทจแบบ FIFO และเปิดเผยรายละเอียดก่อนเผาโทเคน',
      },
    },
  ],
};

export const USER_STEPS = {
  index: '08',
  eyebrow: { en: 'How to participate', th: 'วิธีเข้าร่วม' },
  title: { en: 'Four steps, from wallet to verified claim.', th: '4 ขั้นตอน ตั้งแต่เชื่อมต่อกระเป๋าจนถึงการกล่าวอ้างที่ตรวจสอบได้' },
  steps: [
    {
      title: { en: 'Connect a wallet', th: 'เชื่อมต่อกระเป๋า' },
      body: { en: 'Use MetaMask or any injected EIP-1193 wallet. You can also check any address without connecting.', th: 'ใช้ MetaMask หรือกระเป๋า EIP-1193 ที่ติดตั้งไว้ หรือตรวจสอบที่อยู่ใดก็ได้โดยไม่ต้องเชื่อมต่อ' },
    },
    {
      title: { en: 'Acquire REC', th: 'รับ REC' },
      body: { en: 'Buy on an authorised exchange when listed, or swap USDT for REC on Optimism through the swap interface.', th: 'ซื้อผ่านศูนย์ซื้อขายที่ได้รับอนุญาตเมื่อเปิดให้ซื้อขาย หรือแลก USDT เป็น REC บน Optimism ผ่านหน้าแลกเปลี่ยน' },
    },
    {
      title: { en: 'Hold or transfer', th: 'ถือครองหรือโอน' },
      body: { en: 'Keep tokens in your wallet, transfer peer-to-peer, or deposit project tokens into the Central Pool.', th: 'เก็บโทเคนในกระเป๋า โอนระหว่างกัน หรือฝากโทเคนรายโครงการเข้า Central Pool' },
    },
    {
      title: { en: 'Redeem or retire', th: 'แลกคืนหรือไถ่ถอน' },
      body: { en: 'Submit a request of at least 100 REC. Choose transfer to REDEX or retirement, with pre-burn confirmation before execution.', th: 'ยื่นคำขออย่างน้อย 100 REC โดยเลือกโอน I-REC ไปยัง REDEX หรือไถ่ถอน และยืนยันรายละเอียดก่อนเผาโทเคน' },
    },
  ],
};

export const CTA = {
  title: { en: 'Start with the source document.', th: 'เริ่มจากเอกสารต้นฉบับ' },
  body: {
    en: 'Every material claim on this site is traceable to Whitepaper v1.0, the monthly reports, or on-chain data. If a number matters, check the source.',
    th: 'ตรวจสอบข้อมูลสำคัญบนเว็บไซต์นี้ได้จากไวท์เปเปอร์ v1.0 รายงานรายเดือน และข้อมูลบนเชน รวมถึงตรวจสอบตัวเลขจากแหล่งข้อมูลต้นฉบับได้โดยตรง',
  },
};

export const COMPARISON = {
  title: { en: 'A REC is not a carbon credit. Here is the difference.', th: 'REC กับคาร์บอนเครดิตแตกต่างกันอย่างไร' },
  rows: [
    {
      label: { en: 'Unit', th: 'หน่วย' },
      rec: { en: '1 MWh of renewable electricity', th: 'ไฟฟ้าหมุนเวียน 1 MWh' },
      carbon: { en: '1 tCO₂e reduced or removed', th: 'การลดหรือกักเก็บ 1 tCO₂e' },
    },
    {
      label: { en: 'Typical use', th: 'การใช้งานทั่วไป' },
      rec: { en: 'Scope 2, market-based method', th: 'Scope 2 วิธี market-based' },
      carbon: { en: 'Scope 1 and Scope 3', th: 'Scope 1 และ Scope 3' },
    },
    {
      label: { en: 'Registry', th: 'ทะเบียน' },
      rec: { en: 'I-REC / Evident', th: 'I-REC / Evident' },
      carbon: { en: 'Various carbon standards', th: 'มาตรฐานคาร์บอนต่าง ๆ' },
    },
    {
      label: { en: 'Backing for REC Token', th: 'การรองรับ REC Token' },
      rec: { en: 'Yes - exclusively', th: 'ใช่ เฉพาะ I-REC' },
      carbon: { en: 'Never', th: 'ไม่ใช่สินทรัพย์อ้างอิง' },
    },
  ],
};
