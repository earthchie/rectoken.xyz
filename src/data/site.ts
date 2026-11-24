/**
 * Single source of truth for site-wide facts, addresses and navigation.
 * Values are taken from Whitepaper v1.1 and the live deployment config.
 */

export type Locale = 'en' | 'th';

export const SITE = {
  name: 'REC Token',
  shortName: 'RECTOKEN',
  legalName: 'BlockEdge Co., Ltd.',
  regNo: '0205566011711',
  address: {
    en: '39/129 Moo 7, Baan Suan, Mueng Chonburi, Chonburi 20000, Thailand',
    th: 'เลขที่ 39/129 หมู่ที่ 7 ตำบลบ้านสวน อำเภอเมืองชลบุรี จังหวัดชลบุรี 20000',
  },
  thaiName: 'บริษัท บล็อกเอจ จำกัด',
  email: 'info@blockedge.co',
  supportEmail: 'info@blockedge.earth',
  website: 'https://blockedge.co',
  domain: 'https://rectoken.xyz',
  governingLaw: 'Kingdom of Thailand',
  token: {
    name: 'REC Token',
    thaiName: 'โทเคนดิจิทัลเพื่อพลังงานหมุนเวียน (REC)',
    symbol: 'REC',
    type: 'Utility Token (Ready-to-Use)',
    standard: 'ERC-20',
    decimals: 18,
    maxSupply: 100_000_000,
    unit: '1 MWh',
    certification: 'I-REC certified under the I-TRACK standard',
  },
  whitepaper: {
    version: '1.1',
    pages: 48,
    updated: '2026',
    url: 'https://asset.blockedge.co/rec-project/rec-whitepaper-v1.1.pdf',
  },
  redemption: {
    minimum: 100,
    transferBusinessDays: 7,
    retirementBusinessDays: '3-14',
    maxBusinessDays: 30,
    appealDays: 14,
  },
  reconciliation: {
    frequency: 'Quarterly',
    publicationDays: 7,
  },
  allocation: {
    directUsers: 40,
    liquidityReserve: 60,
  },
  vintage: {
    maxYears: 2,
  },
  social: {
    facebook: 'https://fb.me/gogreenwithBlockedge',
    messenger: 'https://m.me/gogreenwithBlockedge',
    telegram: 'https://t.me/blockedgeearth',
    github: 'https://github.com/blockedge-co',
    x: 'https://x.com/blockedgeeart',
  },
  external: {
    pool: 'https://pool.rectoken.xyz/',
    certificates: 'https://cert.rectoken.xyz/',
    redex: 'https://redex.eco',
    evidence: 'https://evident.global',
    rehash: 'https://rehash.redex.eco/',
    bitkub: 'https://www.bitkub.com',
    cnergPlatform: 'https://platform.cnerg.net/home',
    cnergIndex: 'https://www.cnerg.net/solutions/price-index',
    assets: 'https://asset.blockedge.co',
  },
} as const;

export const CONTRACTS = {
  poolThaiFi: '0x7269992Ea88ec64fF65f9B03F8D6Ea4AADb5EAE9',
  retiredToken: '0x25B9e67b731f520b65D8AE1BB7c03F276d056317',
  certificateNft: '0xAF3A54D50A8527649F03ff6103bC58e6d3CFb0c4',
  poolOptimism: '0xF4fEfEe4730Cf174608766877911F8D33735f9D7',
  poolKubchain: '0x5555555555240EF13ef76C1dC35Aa5CD695616F8',
  recMinter: '0xF559db05151D11eE7695F76981176A6558508c04',
  multisig: '0x612076A8Fd8E735EFE6408524f8f74F70dCFc17A',
  bridgeOptimism: '0x9d61C1a98A06A02c4ddaA3D87dBdF708d3C1E006',
  bridgeKubchain: '0x18c8F43c456e3947C37D3604d891De914d592776',
  legacyCo2e: '0x578f3B6133A3BF06b2988B68085DD9860D2cAbca',
  legacyCo2eNft: '0x01f23D1524a1f98D3C174C39d3eE4F2bA5daF438',
  legacyRetired: '0xe77EfaB6f0a51b73D06b425Ef3C563350621330D',
  multicall3: '0xcA11bde05977b3631167028862bE2a173976CA11',
  usdtOptimism: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  uniswapRouter: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  uniswapQuoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
} as const;

/** Public wallets referenced by the site. These are not contracts. */
export const WALLETS = {
  /**
   * Holds the residual pool-token balance on ThaiFi after the November 2026
   * vintage swap (0.33 REC at the 24 November 2026 snapshot).
   */
  poolCustody: '0x5266Dfa5ae013674f8FdC832b7c601B838D94eE6',
} as const;

export const CHAINS = {
  thaifi: {
    id: 17,
    hexId: '0x11',
    name: 'ThaiFi',
    rpc: 'https://rpc.thaifi.com',
    explorer: 'https://exp.thaifi.com',
    native: { name: 'pathUSD', symbol: 'pathUSD', decimals: 6 },
    /*
     * MetaMask's public registry for chain 17 ("ThaiChain 2.0 ThaiFi") expects
     * the native symbol TFI with 18 decimals. The live ThaiFi fee token is
     * pathUSD with 6 decimals. walletNative is used only for the MetaMask add
     * request; native is what this site reads and displays.
     */
    walletNative: { name: 'ThaiFi', symbol: 'TFI', decimals: 18 },
  },
  optimism: {
    id: 10,
    hexId: '0xa',
    name: 'Optimism',
    rpc: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    native: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  kubchain: {
    name: 'Kubchain',
    explorer: 'https://www.kubscan.com',
    api: 'https://www.kubscan.com/api/v2',
  },
} as const;

export const REDEMPTION_VAULTS = {
  optimism: '0xb10c4EDf6Ee11F084fc24851883B0B237C96E6A8',
  kubchain: '0x1111111C4F6EB907763780195A25984E3e8619b9',
} as const;

export const MARKET = {
  otc: {
    name: 'REC Hydro Vietnam (OTC)',
    priceUsd: 0.17,
    note: { en: 'Underlying asset reference price', th: 'ราคาของสินทรัพย์ที่ใช้อ้างอิง' },
  },
  bitkub: {
    listed: false,
    symbol: 'REC_THB',
    note: {
      en: 'REC Token will be available for trading on Bitkub Exchange soon.',
      th: 'REC Token จะพร้อมซื้อขายบน Bitkub Exchange เร็ว ๆ นี้',
    },
  },
  forexFallback: 33.5,
  initialSellOrder: {
    tokens: 300_000,
    priceLevels: 50,
    minThb: 10.0,
    maxThb: 19.8,
    stepThb: 0.2,
    table: [
      { range: '10.00 - 11.80', levels: 10, perLevel: 3_000, total: 30_000 },
      { range: '12.00 - 13.80', levels: 10, perLevel: 6_000, total: 60_000 },
      { range: '14.00 - 15.80', levels: 10, perLevel: 12_000, total: 120_000 },
      { range: '16.00 - 17.80', levels: 10, perLevel: 6_000, total: 60_000 },
      { range: '18.00 - 19.80', levels: 10, perLevel: 3_000, total: 30_000 },
    ],
  },
} as const;

export type NavItem = {
  path: string;
  label: Record<Locale, string>;
  desc: Record<Locale, string>;
  icon: string;
};

export type NavGroup = {
  id: string;
  label: Record<Locale, string>;
  items: NavItem[];
  featured?: {
    path: string;
    label: Record<Locale, string>;
    desc: Record<Locale, string>;
  };
};

export const NAVIGATION: NavGroup[] = [
  {
    id: 'token',
    label: { en: 'Token', th: 'โทเคน' },
    items: [
      {
        path: '/about',
        label: { en: 'What is REC Token', th: 'REC Token คืออะไร' },
        desc: {
          en: 'The asset, the problem it solves, and how the system works.',
          th: 'สินทรัพย์ ปัญหาที่ระบบช่วยแก้ไข และวิธีการทำงาน',
        },
        icon: 'Leaf',
      },
      {
        path: '/token',
        label: { en: 'Token details', th: 'รายละเอียดโทเคน' },
        desc: {
          en: 'Supply, allocation, dual-token structure and contract registry.',
          th: 'จำนวนโทเคน การจัดสรร โครงสร้างโทเคนสองประเภท และทะเบียนสัญญา',
        },
        icon: 'Coins',
      },
      {
        path: '/architecture',
        label: { en: 'Technical architecture', th: 'สถาปัตยกรรมทางเทคนิค' },
        desc: {
          en: 'ThaiFi, cross-chain bridges, minting and security controls.',
          th: 'ThaiFi สะพานข้ามเชน การออกโทเคน และการควบคุมความปลอดภัย',
        },
        icon: 'Layers',
      },
      {
        path: '/price',
        label: { en: 'Price & market', th: 'ราคาและตลาด' },
        desc: {
          en: 'OTC reference, exchange status and historical price evidence.',
          th: 'ราคาอ้างอิง OTC สถานะศูนย์ซื้อขาย และหลักฐานราคาย้อนหลัง',
        },
        icon: 'LineChart',
      },
    ],
    featured: {
      path: '/whitepaper',
      label: { en: 'Whitepaper v1.1', th: 'ไวท์เปเปอร์ v1.1' },
      desc: {
        en: 'The full 48-page source document for every claim on this site.',
        th: 'เอกสารต้นฉบับครบ 48 หน้า ซึ่งเป็นแหล่งอ้างอิงสำหรับทุกข้อกล่าวอ้างบนเว็บไซต์นี้',
      },
    },
  },
  {
    id: 'transparency',
    label: { en: 'Transparency', th: 'ความโปร่งใส' },
    items: [
      {
        path: '/data',
        label: { en: 'Live dashboard', th: 'แดชบอร์ดเรียลไทม์' },
        desc: {
          en: 'Supply, pool balance, retirements and contract registry.',
          th: 'จำนวนโทเคน ยอดในพูล การไถ่ถอน และทะเบียนสัญญา',
        },
        icon: 'Activity',
      },
      {
        path: '/projects',
        label: { en: 'Tokenized projects', th: 'โครงการที่แปลงเป็นโทเคน' },
        desc: {
          en: 'Browse the hydropower projects backing the Central Pool.',
          th: 'สำรวจโครงการพลังน้ำที่รองรับ Central Pool',
        },
        icon: 'Map',
      },
      {
        path: '/reports',
        label: { en: 'Monthly reports', th: 'รายงานรายเดือน' },
        desc: {
          en: 'Portfolio reports, reconciliation status and asset composition.',
          th: 'รายงานพอร์ต สถานะการกระทบยอด และองค์ประกอบสินทรัพย์',
        },
        icon: 'FileBarChart',
      },
      {
        path: '/check',
        label: { en: 'Verify an address', th: 'ตรวจสอบที่อยู่' },
        desc: {
          en: 'Public balance lookup across ThaiFi, Optimism and Kubchain.',
          th: 'ตรวจสอบยอดคงเหลือบน ThaiFi, Optimism และ Kubchain',
        },
        icon: 'SearchCheck',
      },
    ],
  },
  {
    id: 'compliance',
    label: { en: 'Compliance', th: 'การกำกับดูแล' },
    items: [
      {
        path: '/compliance',
        label: { en: 'Regulatory overview', th: 'ภาพรวมการกำกับดูแล' },
        desc: {
          en: 'Issuer, classification, controls, custody and appeals.',
          th: 'ผู้ออกโทเคน การจำแนกประเภท การควบคุม การดูแลทรัพย์สิน และการอุทธรณ์',
        },
        icon: 'Scale',
      },
      {
        path: '/compliance/controls',
        label: { en: 'Controls & audit', th: 'การควบคุมและการตรวจสอบ' },
        desc: {
          en: 'Mint-on-lock, reconciliation, multi-sig, audit and recovery.',
          th: 'Mint-on-lock การกระทบยอด Multi-sig การตรวจสอบ และการกู้คืน',
        },
        icon: 'ShieldCheck',
      },
      {
        path: '/compliance/claims',
        label: { en: 'Claims & eligibility', th: 'การกล่าวอ้างและสิทธิ์' },
        desc: {
          en: 'Scope 2, RE100, SBTi, CDP, T-VER and domestic policy limits.',
          th: 'Scope 2, RE100, SBTi, CDP, T-VER และข้อจำกัดนโยบายในประเทศ',
        },
        icon: 'BadgeCheck',
      },
      {
        path: '/compliance/risk',
        label: { en: 'Risk factors', th: 'ปัจจัยความเสี่ยง' },
        desc: {
          en: 'Regulatory, technology, market, operational and continuity risk.',
          th: 'ความเสี่ยงด้านกฎระเบียบ เทคโนโลยี ตลาด การดำเนินงาน และความต่อเนื่อง',
        },
        icon: 'TriangleAlert',
      },
    ],
    featured: {
      path: '/documents',
      label: { en: 'Document library', th: 'คลังเอกสาร' },
      desc: {
        en: 'Whitepaper, reports, announcement, policies and terms in one index.',
        th: 'ไวท์เปเปอร์ รายงาน ประกาศ นโยบาย และข้อกำหนดในที่เดียว',
      },
    },
  },
  {
    id: 'participate',
    label: { en: 'Participate', th: 'เข้าร่วม' },
    items: [
      {
        path: '/trade',
        label: { en: 'Buy / sell', th: 'ซื้อ / ขาย' },
        desc: {
          en: 'Swap USDT and REC on Optimism, or trade on Bitkub when listed.',
          th: 'แลก USDT และ REC บน Optimism หรือซื้อขายบน Bitkub เมื่อเปิดตลาด',
        },
        icon: 'ArrowLeftRight',
      },
      {
        path: '/redeem',
        label: { en: 'Redeem / retire', th: 'แลกคืน / ไถ่ถอน' },
        desc: {
          en: 'Convert tokens into I-RECs or retire them for verified claims.',
          th: 'แปลงโทเคนเป็น I-REC หรือไถ่ถอนเพื่อนำไปชดเชยที่ตรวจสอบได้',
        },
        icon: 'Recycle',
      },
      {
        path: '/wallet',
        label: { en: 'Wallet', th: 'กระเป๋า' },
        desc: {
          en: 'Connect MetaMask, view balances and transfer REC tokens.',
          th: 'เชื่อมต่อ MetaMask ดูยอดคงเหลือ และโอน REC Token',
        },
        icon: 'Wallet',
      },
    ],
  },
  {
    id: 'company',
    label: { en: 'Company', th: 'บริษัท' },
    items: [
      {
        path: '/issuer',
        label: { en: 'Issuer & governance', th: 'ผู้ออกโทเคนและการกำกับ' },
        desc: {
          en: 'BlockEdge, the management team and ecosystem partners.',
          th: 'BlockEdge ทีมบริหาร และพันธมิตรในระบบนิเวศ',
        },
        icon: 'Building2',
      },
      {
        path: '/announcement',
        label: { en: 'Announcements', th: 'ประกาศ' },
        desc: {
          en: 'Official notices, including the issuer liability statement.',
          th: 'ประกาศอย่างเป็นทางการ รวมถึงแถลงการณ์ความรับผิดของผู้ออกโทเคน',
        },
        icon: 'Megaphone',
      },
      {
        path: '/faq',
        label: { en: 'FAQ', th: 'คำถามที่พบบ่อย' },
        desc: {
          en: 'Redemption versus retirement, fees, timelines and eligibility.',
          th: 'การแลกคืนกับการไถ่ถอน ค่าธรรมเนียม ระยะเวลา และสิทธิ์',
        },
        icon: 'CircleHelp',
      },
      {
        path: '/contact',
        label: { en: 'Contact', th: 'ติดต่อ' },
        desc: {
          en: 'Support, complaints and official communication channels.',
          th: 'ฝ่ายสนับสนุน ข้อร้องเรียน และช่องทางติดต่ออย่างเป็นทางการ',
        },
        icon: 'Mail',
      },
    ],
  },
];

/** Public routes that exist in both locales. */
export const ROUTES = [
  '',
  '/about',
  '/token',
  '/architecture',
  '/price',
  '/data',
  '/projects',
  '/reports',
  '/check',
  '/compliance',
  '/compliance/controls',
  '/compliance/claims',
  '/compliance/risk',
  '/compliance/appeals',
  '/documents',
  '/whitepaper',
  '/trade',
  '/redeem',
  '/wallet',
  '/issuer',
  '/announcement',
  '/faq',
  '/contact',
  '/search',
  '/legal/privacy',
  '/legal/terms',
  '/legal/cookies',
] as const;

export const REGULATOR_PROFILES = [
  {
    id: 'sec',
    label: { en: 'SEC Thailand', th: 'ก.ล.ต. ไทย' },
    short: { en: 'Digital asset offering & disclosure', th: 'การเสนอขายสินทรัพย์ดิจิทัลและการเปิดเผยข้อมูล' },
    headline: {
      en: 'A utility token with a documented issuer, auditor and disclosure trail.',
      th: 'ยูทิลิตี้โทเคนที่มีข้อมูลผู้ออกโทเคน ผู้ตรวจสอบ และประวัติการเปิดเผยข้อมูลเป็นเอกสาร',
    },
    body: {
      en: 'REC Token is issued by BlockEdge Co., Ltd. as a ready-to-use utility token. It is not offered in a primary market by the Company and is not marketed as an investment product. Trading, where available, occurs on a licensed digital asset exchange. Every material mechanism - supply, allocation, redemption, custody, governance and risk - is documented in the whitepaper and summarised on this site.',
      th: 'REC Token ออกโดยบริษัท บล็อกเอจ จำกัด ในฐานะยูทิลิตี้โทเคนพร้อมใช้งาน บริษัทไม่ได้เสนอขายในตลาดแรกและไม่ได้ทำการตลาดในฐานะผลิตภัณฑ์เพื่อการลงทุน การซื้อขาย (หากมี) เกิดขึ้นบนศูนย์ซื้อขายสินทรัพย์ดิจิทัลที่ได้รับอนุญาต กลไกสำคัญทั้งหมด ทั้งจำนวนโทเคน การจัดสรร การแลกคืน การดูแลทรัพย์สิน การกำกับดูแล และความเสี่ยง มีรายละเอียดอยู่ในไวท์เปเปอร์และสรุปไว้บนเว็บไซต์นี้',
    },
    facts: [
      {
        k: { en: 'Instrument', th: 'ประเภทเครื่องมือ' },
        v: { en: 'ERC-20 utility token (ready-to-use)', th: 'ยูทิลิตี้โทเคน ERC-20 (พร้อมใช้งาน)' },
        note: { en: 'Not a carbon credit, offset or financial instrument.', th: 'ไม่ใช่คาร์บอนเครดิต ออฟเซต หรือเครื่องมือทางการเงิน' },
      },
      {
        k: { en: 'Issuer', th: 'ผู้ออกโทเคน' },
        v: { en: 'BlockEdge Co., Ltd. - Reg. No. 0205566011711', th: 'บริษัท บล็อกเอจ จำกัด - ทะเบียนเลขที่ 0205566011711' },
        note: { en: 'Thai limited company; governing law is Thailand.', th: 'บริษัทจำกัดในประเทศไทย โดยมีกฎหมายไทยเป็นกฎหมายที่ใช้บังคับ' },
      },
      {
        k: { en: 'Supply discipline', th: 'วินัยด้านจำนวนโทเคน' },
        v: { en: '100,000,000 cap; no pre-mint; mint-on-lock', th: 'จำนวนโทเคนสูงสุด 100,000,000; ไม่ออกโทเคนล่วงหน้า; ออกโทเคนเมื่อล็อกสินทรัพย์' },
        note: { en: '1 token = 1 MWh held in the I-REC registry.', th: '1 โทเคน = 1 MWh ที่ถืออยู่ในทะเบียน I-REC' },
      },
      {
        k: { en: 'Assurance', th: 'การตรวจสอบ' },
        v: { en: 'Smart contract audit by Valix Consulting', th: 'ตรวจสอบสัญญาอัจฉริยะโดย Valix Consulting' },
        note: { en: 'Legal counsel: Baker & McKenzie Ltd.', th: 'ที่ปรึกษากฎหมาย: Baker & McKenzie Ltd.' },
      },
    ],
  },
  {
    id: 'amlo',
    label: { en: 'AMLO', th: 'ปปง.' },
    short: { en: 'AML/CFT & traceability', th: 'AML/CFT และการตรวจสอบย้อนกลับ' },
    headline: {
      en: 'Every token movement is on-chain; every redemption is tied to an identified account.',
      th: 'ทุกความเคลื่อนไหวของโทเคนอยู่บนเชน และทุกการแลกคืนเชื่อมโยงกับบัญชีที่ระบุตัวตนได้',
    },
    body: {
      en: 'REC Token transfers are recorded on ThaiFi and cross-chain deployments, producing an auditable transaction trail. Redemption and retirement require a verified request with an Evident / REDEX account or an identified individual beneficiary, and are executed only by authorised operators through the registry. BlockEdge maintains records of token burns, certificate transfers and retirements, subject to periodic review by independent auditors.',
      th: 'การโอน REC Token ได้รับการบันทึกบน ThaiFi และเชนที่เชื่อมโยง ทำให้ตรวจสอบประวัติธุรกรรมได้ การแลกคืนและการไถ่ถอนต้องมีคำขอที่ผ่านการตรวจสอบ โดยมีบัญชี Evident / REDEX หรือผู้รับประโยชน์ที่เป็นบุคคลซึ่งระบุตัวตนได้ และดำเนินการผ่านทะเบียนโดยผู้ปฏิบัติงานที่ได้รับอนุญาตเท่านั้น BlockEdge เก็บบันทึกการเผาโทเคน การโอนใบรับรอง และการไถ่ถอน โดยมีผู้ตรวจสอบอิสระทบทวนเป็นระยะ',
    },
    facts: [
      {
        k: { en: 'Traceability', th: 'การตรวจสอบย้อนกลับ' },
        v: { en: 'On-chain mint, transfer and burn records', th: 'บันทึกการออก การโอน และการเผาโทเคนบนเชน' },
        note: { en: 'Public dashboard plus explorer-level verification.', th: 'แดชบอร์ดสาธารณะและการตรวจสอบผ่าน explorer' },
      },
      {
        k: { en: 'Redemption identity', th: 'การระบุตัวตนในการแลกคืน' },
        v: { en: 'Legal entity: active REDEX account. Individual: named beneficiary recorded.', th: 'นิติบุคคล: บัญชี REDEX ที่ใช้งานอยู่; บุคคลธรรมดา: บันทึกชื่อผู้รับประโยชน์' },
        note: { en: 'BlockEdge may request documents to verify designation.', th: 'BlockEdge อาจขอเอกสารเพื่อยืนยันการแต่งตั้ง' },
      },
      {
        k: { en: 'Control', th: 'การควบคุม' },
        v: { en: 'Multi-signature approval; no unilateral minting', th: 'ต้องได้รับอนุมัติด้วยลายมือชื่อหลายฝ่าย; ไม่มีการออกโทเคนโดยฝ่ายเดียว' },
        note: { en: 'Issuer and asset aggregator approvals are required.', th: 'ต้องได้รับการอนุมัติจากผู้ออกโทเคนและผู้รวบรวมสินทรัพย์' },
      },
      {
        k: { en: 'Records', th: 'บันทึก' },
        v: { en: 'Full audit trail; periodic independent review', th: 'มี Audit trail ครบถ้วน และมีการทบทวนโดยผู้ตรวจสอบอิสระเป็นระยะ' },
        note: { en: 'Quarterly reconciliation published within 7 business days.', th: 'กระทบยอดรายไตรมาส เผยแพร่ภายใน 7 วันทำการ' },
      },
    ],
  },
  {
    id: 'tver',
    label: { en: 'T-VER / TGO', th: 'T-VER / อบก.' },
    short: { en: 'Carbon programmes & double counting', th: 'โครงการคาร์บอนและการนับซ้ำ' },
    headline: {
      en: 'RECs and T-VER credits are different instruments. This site keeps the boundary explicit.',
      th: 'REC และเครดิต T-VER เป็นเครื่องมือคนละประเภท เว็บไซต์นี้ระบุความแตกต่างไว้อย่างชัดเจน',
    },
    body: {
      en: 'An I-REC represents the environmental attributes of 1 MWh of renewable electricity and supports market-based Scope 2 reporting. A T-VER credit represents a verified greenhouse-gas reduction or removal and is governed by Thailand’s TGO framework. REC Tokens are backed exclusively by I-RECs - never by T-VER credits, carbon credits or offsets. The Central Pool is hydropower-only, Southeast Asia-only, with a maximum two-year vintage. Eligibility for domestic programmes, green tariffs or tax incentives must be verified case by case.',
      th: 'I-REC แสดงถึงคุณลักษณะด้านสิ่งแวดล้อมของไฟฟ้าหมุนเวียน 1 MWh และรองรับการรายงาน Scope 2 ตามวิธี market-based ส่วนเครดิต T-VER แสดงถึงการลดหรือกักเก็บก๊าซเรือนกระจกที่ผ่านการทวนสอบภายใต้กรอบของ อบก. REC Token มี I-REC รองรับเท่านั้น ไม่ได้มีเครดิต T-VER คาร์บอนเครดิต หรือออฟเซตรองรับ Central Pool จำกัดเฉพาะพลังน้ำในเอเชียตะวันออกเฉียงใต้ โดยมีอายุวินเทจไม่เกิน 2 ปี ส่วนสิทธิ์สำหรับโครงการในประเทศ อัตราค่าไฟสีเขียว หรือสิทธิประโยชน์ทางภาษี ต้องตรวจสอบเป็นรายกรณี',
    },
    facts: [
      {
        k: { en: 'Underlying asset', th: 'สินทรัพย์อ้างอิง' },
        v: { en: 'I-REC only - 1 token = 1 MWh', th: 'I-REC เท่านั้น - 1 โทเคน = 1 MWh' },
        note: { en: 'No commingling with carbon credits or other asset classes.', th: 'ไม่มีการปะปนกับคาร์บอนเครดิตหรือสินทรัพย์ประเภทอื่น' },
      },
      {
        k: { en: 'Project scope', th: 'ขอบเขตโครงการ' },
        v: { en: 'Hydropower, Southeast Asia, vintage ≤ 2 years', th: 'พลังน้ำ เอเชียตะวันออกเฉียงใต้ วินเทจ ≤ 2 ปี' },
        note: { en: 'Solar, wind and biomass are excluded by policy.', th: 'นโยบายไม่รวมพลังงานแสงอาทิตย์ พลังงานลม และชีวมวล' },
      },
      {
        k: { en: 'Double counting', th: 'การนับซ้ำ' },
        v: { en: 'One-way binding; asset locked before minting', th: 'ผูกสินทรัพย์แบบทางเดียว; ล็อกสินทรัพย์ก่อนออกโทเคน' },
        note: { en: 'Release requires burning the corresponding tokens.', th: 'การปลดล็อกต้องเผาโทเคนที่เกี่ยวข้องก่อน' },
      },
      {
        k: { en: 'Domestic eligibility', th: 'สิทธิ์ในประเทศ' },
        v: { en: 'Not guaranteed by the issuer', th: 'ผู้ออกโทเคนไม่รับประกัน' },
        note: { en: 'Verify with the relevant authority or assurance provider.', th: 'ตรวจสอบกับหน่วยงานหรือผู้ให้บริการรับรองความเชื่อมั่นที่เกี่ยวข้อง' },
      },
    ],
  },
] as const;
