import type { Locale } from '@i18n/utils';

export type Bi = Record<Locale, string>;

export const WHITEPAPER_TOC: Array<{ group: Bi; items: Array<{ title: Bi; page: number }> }> = [
  {
    group: { en: 'Definitions and Glossary', th: 'คำนิยามและอภิธานศัพท์' },
    items: [
      { title: { en: 'Core Entities & Infrastructure', th: 'หน่วยงานหลักและโครงสร้างพื้นฐาน' }, page: 7 },
      { title: { en: 'Asset & ESG Concepts', th: 'แนวคิดสินทรัพย์และ ESG' }, page: 8 },
      { title: { en: 'Token Mechanics', th: 'กลไกของโทเคน' }, page: 9 },
      { title: { en: 'Governance, Security & Verification', th: 'การกำกับดูแล ความปลอดภัย และการทวนสอบ' }, page: 10 },
    ],
  },
  {
    group: { en: '01 Executive Summary', th: '01 บทสรุปผู้บริหาร' },
    items: [
      { title: { en: '1.1 General Information of the Digital Token', th: '1.1 ข้อมูลทั่วไปของโทเคนดิจิทัล' }, page: 11 },
      { title: { en: '1.2 Nature and Structure of the Offering', th: '1.2 ลักษณะและโครงสร้างของการเสนอ' }, page: 12 },
      { title: { en: '1.3 Summary of Operational Workflow', th: '1.3 สรุปขั้นตอนการดำเนินงาน' }, page: 13 },
    ],
  },
  {
    group: { en: '02 Issuer, Management, and Ecosystem Partners', th: '02 ผู้ออกโทเคน การบริหาร และพันธมิตรในระบบนิเวศ' },
    items: [
      { title: { en: '2.1 Digital Asset Issuer: BlockEdge Co., Ltd.', th: '2.1 ผู้ออกสินทรัพย์ดิจิทัล: บริษัท บล็อกเอจ จำกัด' }, page: 14 },
      { title: { en: '2.2 Strategic Partner: NetZero Carbon Co., Ltd.', th: '2.2 พันธมิตรเชิงกลยุทธ์: บริษัท เน็ตซีโร่ คาร์บอน จำกัด' }, page: 15 },
      { title: { en: '2.3 Underlying Asset Account and ReHash Framework', th: '2.3 บัญชีสินทรัพย์อ้างอิงและกรอบ ReHash' }, page: 16 },
    ],
  },
  {
    group: { en: '03 Business Plan, Market Overview, and Pricing', th: '03 แผนธุรกิจ ภาพรวมตลาด และราคา' },
    items: [
      { title: { en: '3.1 Concept of I-REC and Scope 2 Emissions', th: '3.1 แนวคิด I-REC และการปล่อยก๊าซ Scope 2' }, page: 17 },
      { title: { en: '3.2 Market Trends and Increasing Corporate Demand', th: '3.2 แนวโน้มตลาดและความต้องการขององค์กรที่เพิ่มขึ้น' }, page: 18 },
      { title: { en: '3.3 I-REC Standard, Jurisdictional Validity, Cross-Border Usage', th: '3.3 มาตรฐาน I-REC การใช้ได้ตามเขตอำนาจ และการใช้ข้ามพรมแดน' }, page: 19 },
      { title: { en: '3.4 Pricing Mechanism', th: '3.4 กลไกราคา' }, page: 20 },
      { title: { en: '3.5 Cross-Border Eligibility and Domestic Policy', th: '3.5 การเข้าเกณฑ์ข้ามพรมแดนและนโยบายในประเทศ' }, page: 23 },
    ],
  },
  {
    group: { en: '04 Token Details and Anti-Double Counting', th: '04 รายละเอียดโทเคนและการป้องกันการนับซ้ำ' },
    items: [
      { title: { en: '4.1 Tokenomics, Total Supply, and Allocation', th: '4.1 Tokenomics จำนวนโทเคนรวม และการจัดสรร' }, page: 24 },
      { title: { en: '4.2 Anti-Double Counting Mechanisms', th: '4.2 กลไกป้องกันการนับซ้ำ' }, page: 26 },
      { title: { en: '4.3 Asset Quality Review', th: '4.3 การทบทวนคุณภาพสินทรัพย์' }, page: 28 },
      { title: { en: '4.4 Holder Rights, Transfers, and Retirement Policy', th: '4.4 สิทธิ์ของผู้ถือ การโอน และนโยบายการไถ่ถอน' }, page: 29 },
      { title: { en: '4.5 Project Scope, Central Pool Operation, Document Updates', th: '4.5 ขอบเขตโครงการ การดำเนินงาน Central Pool และการปรับปรุงเอกสาร' }, page: 30 },
      { title: { en: '4.6 Underlying Asset Vintage Management Policy', th: '4.6 นโยบายจัดการวินเทจของสินทรัพย์อ้างอิง' }, page: 31 },
    ],
  },
  {
    group: { en: '05 Burn, Redemption, and Retirement', th: '05 การเผา การแลกคืน และการไถ่ถอน' },
    items: [
      { title: { en: '5.1 Redemption and Retirement Process', th: '5.1 กระบวนการแลกคืนและการไถ่ถอน' }, page: 32 },
      { title: { en: '5.2 System Continuity and Verifiable Process', th: '5.2 ความต่อเนื่องของระบบและกระบวนการที่ตรวจสอบได้' }, page: 34 },
      { title: { en: '5.3 Process Integrity Assurance', th: '5.3 การรับรองความสมบูรณ์ของกระบวนการ' }, page: 35 },
      { title: { en: '5.4 Fees and Charges', th: '5.4 ค่าธรรมเนียมและค่าใช้จ่าย' }, page: 35 },
      { title: { en: '5.5 Appeal Mechanism and Dispute Handling', th: '5.5 กลไกอุทธรณ์และการจัดการข้อพิพาท' }, page: 36 },
    ],
  },
  {
    group: { en: '06 Technical Infrastructure and Security', th: '06 โครงสร้างพื้นฐานทางเทคนิคและความปลอดภัย' },
    items: [
      { title: { en: '6.1 ThaiFi Network', th: '6.1 เครือข่าย ThaiFi' }, page: 37 },
      { title: { en: '6.2 Smart Contract Audit and Security Controls', th: '6.2 การตรวจสอบสัญญาอัจฉริยะและการควบคุมความปลอดภัย' }, page: 38 },
    ],
  },
  {
    group: { en: '07 Risk Factors', th: '07 ปัจจัยความเสี่ยง' },
    items: [
      { title: { en: '7.1 Regulatory and Compliance Risks', th: '7.1 ความเสี่ยงด้านกฎระเบียบและการปฏิบัติตาม' }, page: 39 },
      { title: { en: '7.2 Technology and Security Risks', th: '7.2 ความเสี่ยงด้านเทคโนโลยีและความปลอดภัย' }, page: 40 },
      { title: { en: '7.3 Market and Liquidity Risks', th: '7.3 ความเสี่ยงด้านตลาดและสภาพคล่อง' }, page: 41 },
      { title: { en: '7.4 Operational Risks', th: '7.4 ความเสี่ยงด้านการดำเนินงาน' }, page: 41 },
      { title: { en: '7.5 Business Continuity and Disaster Recovery', th: '7.5 ความต่อเนื่องทางธุรกิจและการกู้คืนหลังภัยพิบัติ' }, page: 41 },
    ],
  },
  {
    group: { en: '08 Legal Framework and Governance', th: '08 กรอบกฎหมายและการกำกับดูแล' },
    items: [
      { title: { en: '8.1 Governance and Conflict of Interest', th: '8.1 การกำกับดูแลและความขัดแย้งทางผลประโยชน์' }, page: 43 },
      { title: { en: '8.2 Custody of Underlying Assets', th: '8.2 การดูแลสินทรัพย์อ้างอิง' }, page: 45 },
      { title: { en: '8.3 Interoperability', th: '8.3 การทำงานร่วมกันระหว่างระบบ' }, page: 46 },
      { title: { en: '8.4 Governing Law and Dispute Resolution', th: '8.4 กฎหมายที่ใช้บังคับและการระงับข้อพิพาท' }, page: 46 },
      { title: { en: '8.5 Disclaimer and Limitation of Liability', th: '8.5 ข้อสงวนสิทธิ์และข้อจำกัดความรับผิด' }, page: 47 },
    ],
  },
];

export const CHAPTERS = [
  {
    no: '01',
    title: { en: 'Executive summary', th: 'บทสรุปผู้บริหาร' },
    body: {
      en: 'Global demand for renewable electricity and Energy Attribute Certificates keeps rising, but the traditional market still suffers from limited traceability, fragmented operations and credibility concerns. REC Token is a blockchain-based digital twin of verified I-RECs, operated under a multi-party framework: NetZero Carbon aggregates assets, REDEX / ReHash records and locks them, and BlockEdge issues the token. Tokens are permanently removed from circulation on redemption.',
      th: 'ความต้องการไฟฟ้าหมุนเวียนและใบรับรองคุณลักษณะพลังงาน (EAC) ทั่วโลกยังคงเพิ่มขึ้น แต่ตลาดแบบเดิมยังมีข้อจำกัดด้านการตรวจสอบย้อนกลับ การดำเนินงานที่กระจัดกระจาย และข้อกังวลด้านความน่าเชื่อถือ REC Token คือตัวแทนดิจิทัลบนบล็อกเชนของ I-REC ที่ผ่านการทวนสอบ ดำเนินงานภายใต้โครงสร้างหลายฝ่าย โดย NetZero Carbon รวบรวมสินทรัพย์ REDEX / ReHash บันทึกและล็อกสินทรัพย์ และ BlockEdge ออกโทเคน โทเคนจะถูกนำออกจากการหมุนเวียนอย่างถาวรเมื่อแลกคืน',
    },
    points: [
      { en: '1 token = 1 MWh of verified renewable electricity', th: '1 โทเคน = 1 MWh ไฟฟ้าหมุนเวียนที่ผ่านการทวนสอบ' },
      { en: 'Utility token, not a carbon credit or financial instrument', th: 'ยูทิลิตี้โทเคน ไม่ใช่คาร์บอนเครดิตหรือเครื่องมือทางการเงิน' },
      { en: 'Redemption minimum of 100 tokens; FIFO by vintage', th: 'แลกคืนขั้นต่ำ 100 โทเคน จัดสรรตามวินเทจแบบ FIFO' },
      { en: 'ThaiFi deployment, ERC-20 compatible', th: 'ใช้งานบน ThaiFi รองรับมาตรฐาน ERC-20' },
    ],
  },
  {
    no: '02',
    title: { en: 'Issuer, management and partners', th: 'ผู้ออกโทเคน การบริหาร และพันธมิตร' },
    body: {
      en: 'BlockEdge Co., Ltd. is a Thai limited company responsible for token issuance, platform governance, smart-contract development and operations. NetZero Carbon sources and screens hydropower projects in Southeast Asia. REDEX operates ReHash, where certificates are recorded and locked. Evident is the official I-REC registry. Valix Consulting audits the smart contracts and Baker & McKenzie provides legal counsel.',
      th: 'บริษัท บล็อกเอจ จำกัด เป็นบริษัทจำกัดไทยที่รับผิดชอบการออกโทเคน การกำกับดูแลแพลตฟอร์ม การพัฒนาสัญญาอัจฉริยะ และการดำเนินงาน NetZero Carbon จัดหาและคัดกรองโครงการพลังน้ำในเอเชียตะวันออกเฉียงใต้ REDEX ดำเนินการ ReHash ซึ่งใช้บันทึกและล็อกใบรับรอง Evident เป็นทะเบียน I-REC อย่างเป็นทางการ Valix Consulting ตรวจสอบสัญญาอัจฉริยะ และ Baker & McKenzie ให้คำปรึกษากฎหมาย',
    },
    points: [
      { en: 'Issuer registration no. 0205566011711', th: 'ทะเบียนผู้ออกโทเคนเลขที่ 0205566011711' },
      { en: 'Segregation of duties across issuer, aggregator and registrar', th: 'แยกหน้าที่ระหว่างผู้ออก ผู้รวบรวม และนายทะเบียน' },
      { en: 'Only hydropower projects in Southeast Asia', th: 'เฉพาะโครงการพลังน้ำในเอเชียตะวันออกเฉียงใต้' },
      { en: 'Vintage no older than two years', th: 'วินเทจไม่เกินสองปี' },
    ],
  },
  {
    no: '03',
    title: { en: 'Market, standards and pricing', th: 'ตลาด มาตรฐาน และราคา' },
    body: {
      en: 'An I-REC proves that 1 MWh of renewable electricity was generated and assigns its environmental attributes to the holder. Under the GHG Protocol it supports market-based Scope 2 reporting. Demand is driven by RE100 supply-chain requirements, SBTi targets and frameworks such as CBAM. Nationally determined programmes can impose additional conditions on origin, technology, vintage or market boundary, so eligibility must be checked case by case.',
      th: 'I-REC ยืนยันว่ามีการผลิตไฟฟ้าหมุนเวียน 1 MWh และกำหนดให้คุณลักษณะด้านสิ่งแวดล้อมเป็นของผู้ถือ ภายใต้ GHG Protocol ใบรับรองนี้รองรับการรายงาน Scope 2 แบบ market-based ความต้องการขับเคลื่อนโดยข้อกำหนดห่วงโซ่การจัดหาของ RE100 เป้าหมาย SBTi และกรอบอย่าง CBAM โครงการระดับประเทศอาจกำหนดเงื่อนไขเพิ่มเติมด้านแหล่งกำเนิด เทคโนโลยี วินเทจ หรือขอบเขตตลาด จึงต้องตรวจสอบการเข้าเกณฑ์เป็นรายกรณี',
    },
    points: [
      { en: 'I-RECs are not carbon credits: different unit, different claim', th: 'I-REC ไม่ใช่คาร์บอนเครดิต: หน่วยและการกล่าวอ้างต่างกัน' },
      { en: 'RE100 / SBTi require same-market certificates', th: 'RE100 / SBTi กำหนดให้ใช้ใบรับรองจากตลาดเดียวกัน' },
      { en: 'Platform fee covers tokenisation and registry operations', th: 'ค่าธรรมเนียมแพลตฟอร์มครอบคลุมการแปลงเป็นโทเคนและการดำเนินงานทะเบียน' },
      { en: 'Initial sell orders: 300,000 tokens, THB 10.00-19.80', th: 'คำสั่งขายเริ่มต้น: 300,000 โทเคน ราคา 10.00-19.80 บาท' },
    ],
  },
  {
    no: '04',
    title: { en: 'Token details and anti-double counting', th: 'รายละเอียดโทเคนและการป้องกันการนับซ้ำ' },
    body: {
      en: 'The token has a hard cap of 100,000,000 with no pre-minting. Supply is elastic only in the sense that it follows verified locked assets: mint on lock, burn on redemption. Allocation is 40% direct user allocation and 60% system liquidity reserve. A dual-token structure separates project-specific tokens from pool tokens. One-way binding, quarterly reconciliation and a public dashboard prevent the same environmental attribute from being claimed twice.',
      th: 'โทเคนมีเพดานสูงสุด 100,000,000 โทเคนและไม่มีการออกล่วงหน้า จำนวนโทเคนเปลี่ยนแปลงตามสินทรัพย์ที่ล็อกและทวนสอบแล้วเท่านั้น โดยออกเมื่อล็อกและเผาเมื่อแลกคืน การจัดสรรแบ่งเป็น 40% สำหรับผู้ใช้โดยตรง และ 60% สำรองสภาพคล่องของระบบ โครงสร้างโทเคนสองประเภทแยกโทเคนรายโครงการออกจากพูลโทเคน การผูกทางเดียว การกระทบยอดรายไตรมาส และแดชบอร์ดสาธารณะช่วยป้องกันการกล่าวอ้างคุณลักษณะสิ่งแวดล้อมเดียวกันซ้ำ',
    },
    points: [
      { en: 'No pre-mint; mint only after ReHash lock confirmation', th: 'ไม่มีการออกล่วงหน้า ออกได้หลังได้รับการยืนยันการล็อกใน ReHash เท่านั้น' },
      { en: '1 Pool Token = 1 Project Token = 1 I-REC = 1 MWh', th: '1 Pool Token = 1 Project Token = 1 I-REC = 1 MWh' },
      { en: 'Quarterly reconciliation published within 7 business days', th: 'กระทบยอดรายไตรมาส เผยแพร่ภายใน 7 วันทำการ' },
      { en: 'Annual asset quality review with replacement before removal', th: 'ทบทวนคุณภาพสินทรัพย์เป็นประจำปี และต้องมีสินทรัพย์ทดแทนก่อนถอดออก' },
    ],
  },
  {
    no: '05',
    title: { en: 'Burn, redemption and retirement', th: 'การเผา การแลกคืน และการไถ่ถอน' },
    body: {
      en: 'Redemption is open to legal entities and individuals with a minimum of 100 tokens. After verification, tokens are transferred to a segregated redemption wallet, held pending final checks, then burned. I-RECs are allocated FIFO by vintage year, oldest first. Holders choose between receiving the I-REC in their REDEX account, retiring it as a legal entity, or retiring it on their behalf as an individual. Retirement is final and irreversible.',
      th: 'การแลกคืนเปิดให้นิติบุคคลและบุคคลธรรมดา โดยมีขั้นต่ำ 100 โทเคน หลังการตรวจสอบ โทเคนจะถูกโอนไปยังกระเป๋าแลกคืนที่แยกไว้เพื่อรอการตรวจสอบขั้นสุดท้าย แล้วจึงเผา I-REC จะได้รับการจัดสรรตามปีวินเทจแบบ FIFO โดยเริ่มจากปีที่เก่าที่สุด ผู้ถือเลือกได้ระหว่างรับ I-REC ในบัญชี REDEX ไถ่ถอนในฐานะนิติบุคคล หรือให้ไถ่ถอนในนามตนในฐานะบุคคลธรรมดา การไถ่ถอนเป็นขั้นสุดท้ายและย้อนกลับไม่ได้',
    },
    points: [
      { en: 'Verification within 3-14 business days', th: 'ตรวจสอบภายใน 3-14 วันทำการ' },
      { en: 'Transfer within 7 business days after complete details', th: 'โอนภายใน 7 วันทำการหลังข้อมูลครบถ้วน' },
      { en: 'Total process capped at 30 business days', th: 'กระบวนการทั้งหมดไม่เกิน 30 วันทำการ' },
      { en: 'Pre-burn confirmation and 14-day appeal window', th: 'ยืนยันก่อนเผาและช่วงอุทธรณ์ 14 วัน' },
    ],
  },
  {
    no: '06',
    title: { en: 'Technology and security', th: 'เทคโนโลยีและความปลอดภัย' },
    body: {
      en: 'REC Tokens are ERC-20 contracts on ThaiFi, a Tempo-compatible EVM network using Simplex BFT with DKG consensus and a documented 0.5-second block time. Fees are paid in TIP-20 tokens, with pathTHB as the default. Contracts are audited by Valix Consulting; critical functions require multi-signature approval; an emergency pause can be activated under multi-signature authorisation. Recovery of enterprise wallets is possible only under a formal, documented process.',
      th: 'REC Token เป็นสัญญา ERC-20 บน ThaiFi เครือข่าย EVM ที่รองรับ Tempo ใช้ฉันทามติ Simplex BFT with DKG และมีเวลาบล็อก 0.5 วินาทีตามที่ระบุในเอกสาร ค่าธรรมเนียมชำระด้วยโทเคน TIP-20 โดยใช้ pathTHB เป็นค่าเริ่มต้น สัญญาได้รับการตรวจสอบโดย Valix Consulting ฟังก์ชันสำคัญต้องได้รับอนุมัติด้วยลายมือชื่อหลายฝ่าย และสามารถเปิดใช้การหยุดฉุกเฉินได้ภายใต้การอนุมัติด้วยลายมือชื่อหลายฝ่าย การกู้คืนกระเป๋าองค์กรทำได้เฉพาะผ่านกระบวนการอย่างเป็นทางการที่จัดทำเป็นเอกสาร',
    },
    points: [
      { en: 'Chain ID 17; explorer exp.thaifi.com', th: 'Chain ID 17; explorer exp.thaifi.com' },
      { en: 'Static analysis, dynamic testing and expert review', th: 'วิเคราะห์โค้ดแบบ static ทดสอบแบบ dynamic และทบทวนโดยผู้เชี่ยวชาญ' },
      { en: 'Multi-sig over minting and administrative actions', th: 'Multi-sig สำหรับการออกโทเคนและการดำเนินการด้านการบริหารระบบ' },
      { en: 'Emergency pause and BCDR procedures', th: 'กลไกหยุดฉุกเฉินและขั้นตอน BCDR' },
    ],
  },
  {
    no: '07',
    title: { en: 'Risk factors', th: 'ปัจจัยความเสี่ยง' },
    body: {
      en: 'Digital tokens involve risk, including total loss of funds. Regulatory change, environmental-standard change and domestic policy restrictions can affect eligibility. Technology risk includes smart-contract vulnerabilities and integration dependencies. Market and liquidity risk can prevent holders from selling at a desired price or time. Operational risk includes dependence on partners and registries. Continuity measures include redundancy, blockchain state backup and controlled manual fallback.',
      th: 'โทเคนดิจิทัลมีความเสี่ยง รวมถึงการสูญเสียเงินทั้งหมด การเปลี่ยนแปลงกฎระเบียบ มาตรฐานสิ่งแวดล้อม และข้อจำกัดนโยบายในประเทศอาจกระทบการเข้าเกณฑ์ ความเสี่ยงด้านเทคโนโลยีรวมถึงช่องโหว่ของสัญญาอัจฉริยะและการพึ่งพาการเชื่อมต่อระบบ ความเสี่ยงด้านตลาดและสภาพคล่องอาจทำให้ผู้ถือขายไม่ได้ตามราคาหรือเวลาที่ต้องการ ความเสี่ยงด้านการดำเนินงานรวมถึงการพึ่งพาพันธมิตรและทะเบียน มาตรการความต่อเนื่องรวมถึงระบบสำรอง การสำรองสถานะบล็อกเชน และขั้นตอนสำรองด้วยมือภายใต้การควบคุม',
    },
    points: [
      { en: 'You may lose all funds used for purchase', th: 'คุณอาจสูญเสียเงินทั้งหมดที่ใช้ซื้อ' },
      { en: 'Token price is not guaranteed and may fall', th: 'ราคาโทเคนไม่มีการรับประกันและอาจลดลง' },
      { en: 'Underlying I-RECs are not insolvency-remote', th: 'I-REC อ้างอิงไม่ได้แยกคุ้มครองจากภาวะล้มละลาย' },
      { en: 'Domestic programmes may reject cross-border certificates', th: 'โครงการในประเทศอาจปฏิเสธใบรับรองข้ามพรมแดน' },
    ],
  },
  {
    no: '08',
    title: { en: 'Legal framework and governance', th: 'กรอบกฎหมายและการกำกับดูแล' },
    body: {
      en: 'Thai law governs the token and related systems; disputes are resolved in Thai courts or by arbitration under Thai law. Mint-on-lock, multi-signature authorisation and segregation of duties prevent unauthorised issuance. Underlying I-RECs are held in BlockEdge’s name; they are not held in trust or a segregated insolvency-remote account, so token holders may rank as unsecured creditors if the issuer becomes insolvent. The 1:1 linkage does not by itself create a proprietary right.',
      th: 'กฎหมายไทยใช้บังคับกับโทเคนและระบบที่เกี่ยวข้อง ข้อพิพาทระงับในศาลไทยหรือโดยอนุญาโตตุลาการภายใต้กฎหมายไทย กลไก mint-on-lock การอนุมัติด้วยลายมือชื่อหลายฝ่าย และการแยกหน้าที่ป้องกันการออกโทเคนโดยไม่ได้รับอนุญาต I-REC อ้างอิงถือในนาม BlockEdge ไม่ได้อยู่ในทรัสต์หรือบัญชีแยกที่คุ้มครองจากภาวะล้มละลาย ผู้ถือโทเคนอาจอยู่ในฐานะเจ้าหนี้ไม่มีหลักประกันหากผู้ออกล้มละลาย การเชื่อมโยง 1:1 เพียงอย่างเดียวไม่ได้สร้างสิทธิ์ในทรัพย์สิน',
    },
    points: [
      { en: 'Governing law: Kingdom of Thailand', th: 'กฎหมายที่ใช้บังคับ: ราชอาณาจักรไทย' },
      { en: 'No commingling with carbon credits', th: 'ไม่มีการปะปนกับคาร์บอนเครดิต' },
      { en: 'ERC-20 interoperability; no automatic cross-chain transfer', th: 'ทำงานร่วมกันตามมาตรฐาน ERC-20 ไม่มีการโอนข้ามเชนอัตโนมัติ' },
      { en: 'Issuer liability disclosure published separately', th: 'แถลงการณ์ความรับผิดของผู้ออกเผยแพร่แยกต่างหาก' },
    ],
  },
] satisfies Array<{ no: string; title: Bi; body: Bi; points: Bi[] }>;

export const GLOSSARY: Array<{ term: Bi; category: Bi; definition: Bi }> = [
  {
    term: { en: 'BlockEdge / Issuer', th: 'BlockEdge / ผู้ออกโทเคน' },
    category: { en: 'Core entities', th: 'หน่วยงานหลัก' },
    definition: {
      en: 'BlockEdge Co., Ltd., the technology provider and official issuer of REC Tokens, responsible for platform operations, process governance and coordination with stakeholders.',
      th: 'บริษัท บล็อกเอจ จำกัด ผู้ให้บริการเทคโนโลยีและผู้ออก REC Token อย่างเป็นทางการ รับผิดชอบการดำเนินงานแพลตฟอร์ม การกำกับกระบวนการ และการประสานงานกับผู้มีส่วนได้ส่วนเสีย',
    },
  },
  {
    term: { en: 'REDEX (Registrar)', th: 'REDEX (นายทะเบียน)' },
    category: { en: 'Core entities', th: 'หน่วยงานหลัก' },
    definition: {
      en: 'A registrar and platform operator supporting the recording, locking, tracking and management of I-REC certificates via the ReHash platform, functionally separated from BlockEdge’s issuance process.',
      th: 'นายทะเบียนและผู้ดำเนินแพลตฟอร์มที่สนับสนุนการบันทึก ล็อก ติดตาม และจัดการใบรับรอง I-REC ผ่านแพลตฟอร์ม ReHash แยกหน้าที่จากกระบวนการออกโทเคนของ BlockEdge',
    },
  },
  {
    term: { en: 'ReHash Platform', th: 'แพลตฟอร์ม ReHash' },
    category: { en: 'Core entities', th: 'หน่วยงานหลัก' },
    definition: {
      en: 'A REDEX-operated platform for locking, tracking and managing I-REC certificates to support tokenisation and prevent double usage.',
      th: 'แพลตฟอร์มที่ REDEX ดำเนินการ สำหรับล็อก ติดตาม และจัดการใบรับรอง I-REC เพื่อรองรับการแปลงเป็นโทเคนและป้องกันการใช้งานซ้ำ',
    },
  },
  {
    term: { en: 'Evident', th: 'Evident' },
    category: { en: 'Core entities', th: 'หน่วยงานหลัก' },
    definition: {
      en: 'An internationally recognised registry and platform for issuing, managing and tracking I-REC certificates.',
      th: 'ทะเบียนและแพลตฟอร์มที่ได้รับการยอมรับในระดับสากลสำหรับการออก จัดการ และติดตามใบรับรอง I-REC',
    },
  },
  {
    term: { en: 'NetZero Carbon', th: 'NetZero Carbon' },
    category: { en: 'Core entities', th: 'หน่วยงานหลัก' },
    definition: {
      en: 'A strategic partner and asset aggregator responsible for sourcing, selecting and quality-assuring renewable energy projects before tokenisation.',
      th: 'พันธมิตรเชิงกลยุทธ์และผู้รวบรวมสินทรัพย์ รับผิดชอบการจัดหา คัดเลือก และประกันคุณภาพโครงการพลังงานหมุนเวียนก่อนแปลงเป็นโทเคน',
    },
  },
  {
    term: { en: 'ThaiFi', th: 'ThaiFi' },
    category: { en: 'Core entities', th: 'หน่วยงานหลัก' },
    definition: {
      en: 'A Tempo-compatible blockchain supporting EVM smart contracts, used to record REC Token transactions.',
      th: 'บล็อกเชนที่รองรับ Tempo และสัญญาอัจฉริยะ EVM ใช้บันทึกธุรกรรม REC Token',
    },
  },
  {
    term: { en: 'Central Pool', th: 'Central Pool' },
    category: { en: 'Core entities', th: 'หน่วยงานหลัก' },
    definition: {
      en: 'A liquidity mechanism that aggregates I-REC certificates from multiple projects and jurisdictions into a unified pool, enabling fungibility without binding tokens to a specific project.',
      th: 'กลไกสภาพคล่องที่รวบรวมใบรับรอง I-REC จากหลายโครงการและเขตอำนาจไว้ในพูลเดียว ทำให้โทเคนทดแทนกันได้โดยไม่ผูกกับโครงการใดโครงการหนึ่ง',
    },
  },
  {
    term: { en: 'Renewable Energy Certificate (REC)', th: 'ใบรับรองพลังงานหมุนเวียน (REC)' },
    category: { en: 'Asset & ESG', th: 'สินทรัพย์และ ESG' },
    definition: {
      en: 'A certificate representing the environmental attributes of renewable energy; one unit corresponds to 1 MWh of renewable electricity generation.',
      th: 'ใบรับรองที่แสดงคุณลักษณะด้านสิ่งแวดล้อมของพลังงานหมุนเวียน หนึ่งหน่วยเท่ากับการผลิตไฟฟ้าหมุนเวียน 1 MWh',
    },
  },
  {
    term: { en: 'I-REC', th: 'I-REC' },
    category: { en: 'Asset & ESG', th: 'สินทรัพย์และ ESG' },
    definition: {
      en: 'A globally recognised renewable energy certificate standard used to verify renewable electricity generation and support Scope 2 reporting under the GHG Protocol.',
      th: 'มาตรฐานใบรับรองพลังงานหมุนเวียนที่ยอมรับทั่วโลก ใช้ทวนสอบการผลิตไฟฟ้าหมุนเวียนและรองรับการรายงาน Scope 2 ภายใต้ GHG Protocol',
    },
  },
  {
    term: { en: 'Energy Attribute Certificate (EAC)', th: 'ใบรับรองคุณลักษณะพลังงาน (EAC)' },
    category: { en: 'Asset & ESG', th: 'สินทรัพย์และ ESG' },
    definition: {
      en: 'A category of instruments representing the environmental attributes of electricity generation, which includes I-RECs.',
      th: 'ประเภทของเครื่องมือที่แสดงคุณลักษณะด้านสิ่งแวดล้อมของการผลิตไฟฟ้า ซึ่งรวมถึง I-REC',
    },
  },
  {
    term: { en: 'Scope 2 emissions', th: 'การปล่อยก๊าซ Scope 2' },
    category: { en: 'Asset & ESG', th: 'สินทรัพย์และ ESG' },
    definition: {
      en: 'Indirect greenhouse gas emissions from purchased electricity, steam, heating or cooling consumed by an organisation.',
      th: 'การปล่อยก๊าซเรือนกระจกทางอ้อมจากไฟฟ้า ไอน้ำ ความร้อน หรือความเย็นที่องค์กรซื้อมาใช้',
    },
  },
  {
    term: { en: 'Market-based method', th: 'วิธี market-based' },
    category: { en: 'Asset & ESG', th: 'สินทรัพย์และ ESG' },
    definition: {
      en: 'A GHG Protocol Scope 2 approach that lets organisations use Energy Attribute Certificates such as I-RECs to reflect renewable electricity consumption.',
      th: 'แนวทางการรายงาน Scope 2 ภายใต้ GHG Protocol ที่ให้องค์กรใช้ใบรับรองคุณลักษณะพลังงาน เช่น I-REC เพื่อสะท้อนการใช้ไฟฟ้าหมุนเวียน',
    },
  },
  {
    term: { en: 'Vintage', th: 'วินเทจ' },
    category: { en: 'Asset & ESG', th: 'สินทรัพย์และ ESG' },
    definition: {
      en: 'The year in which the renewable electricity associated with an I-REC was generated, used for allocation priority and as an indicator of asset quality.',
      th: 'ปีที่ผลิตไฟฟ้าหมุนเวียนซึ่งเชื่อมกับ I-REC ใช้จัดลำดับการจัดสรรและเป็นตัวชี้วัดคุณภาพสินทรัพย์',
    },
  },
  {
    term: { en: 'Impact Certificate', th: 'ใบรับรองผลกระทบ' },
    category: { en: 'Asset & ESG', th: 'สินทรัพย์และ ESG' },
    definition: {
      en: 'A document issued after retirement of an I-REC, serving as proof for ESG reporting and environmental claims.',
      th: 'เอกสารที่ออกหลังการไถ่ถอน I-REC ใช้เป็นหลักฐานสำหรับการรายงาน ESG และการกล่าวอ้างด้านสิ่งแวดล้อม',
    },
  },
  {
    term: { en: 'REC Token', th: 'REC Token' },
    category: { en: 'Token mechanics', th: 'กลไกโทเคน' },
    definition: {
      en: 'A digital utility token representing rights to renewable energy certificates, backed 1:1 by verified I-RECs.',
      th: 'ยูทิลิตี้โทเคนดิจิทัลที่แสดงสิทธิ์ในใบรับรองพลังงานหมุนเวียน รองรับ 1:1 ด้วย I-REC ที่ผ่านการทวนสอบ',
    },
  },
  {
    term: { en: 'Tokenisation', th: 'การแปลงเป็นโทเคน' },
    category: { en: 'Token mechanics', th: 'กลไกโทเคน' },
    definition: {
      en: 'The process of converting I-REC certificates into digital tokens, requiring the underlying assets to be locked in ReHash and verified by REDEX before issuance.',
      th: 'กระบวนการแปลงใบรับรอง I-REC เป็นโทเคนดิจิทัล โดยต้องล็อกสินทรัพย์ใน ReHash และได้รับการทวนสอบจาก REDEX ก่อนออกโทเคน',
    },
  },
  {
    term: { en: 'Mint-on-Lock', th: 'Mint-on-Lock' },
    category: { en: 'Token mechanics', th: 'กลไกโทเคน' },
    definition: {
      en: 'A mechanism whereby tokens are minted only after verification that the corresponding I-RECs are securely locked, ensuring strict 1:1 backing.',
      th: 'กลไกที่ออกโทเคนหลังยืนยันว่า I-REC ที่เกี่ยวข้องถูกล็อกอย่างปลอดภัยแล้วเท่านั้น เพื่อรักษาการรองรับ 1:1 อย่างเคร่งครัด',
    },
  },
  {
    term: { en: 'Redemption', th: 'การแลกคืน' },
    category: { en: 'Token mechanics', th: 'กลไกโทเคน' },
    definition: {
      en: 'The process by which token holders return tokens to the system in exchange for underlying I-RECs or to initiate certificate retirement.',
      th: 'กระบวนการที่ผู้ถือโทเคนส่งโทเคนคืนให้ระบบเพื่อรับ I-REC อ้างอิง หรือเพื่อเริ่มการไถ่ถอนใบรับรอง',
    },
  },
  {
    term: { en: 'Retirement', th: 'การไถ่ถอน' },
    category: { en: 'Token mechanics', th: 'กลไกโทเคน' },
    definition: {
      en: 'The process of permanently cancelling an I-REC within the registry to enable an official environmental claim.',
      th: 'กระบวนการยกเลิก I-REC อย่างถาวรในทะเบียน เพื่อให้สามารถกล่าวอ้างด้านสิ่งแวดล้อมอย่างเป็นทางการ',
    },
  },
  {
    term: { en: 'Token burn', th: 'การเผาโทเคน' },
    category: { en: 'Token mechanics', th: 'กลไกโทเคน' },
    definition: {
      en: 'The irreversible destruction of digital tokens, executed together with the exercise of rights over the underlying asset.',
      th: 'การทำลายโทเคนดิจิทัลอย่างย้อนกลับไม่ได้ ดำเนินการควบคู่กับการใช้สิทธิ์ในสินทรัพย์อ้างอิง',
    },
  },
  {
    term: { en: 'FIFO by Vintage Year', th: 'FIFO ตามปีวินเทจ' },
    category: { en: 'Token mechanics', th: 'กลไกโทเคน' },
    definition: {
      en: 'An allocation method where I-RECs are assigned in chronological order, prioritising older vintages first.',
      th: 'วิธีการจัดสรร I-REC ตามลำดับเวลา โดยให้ความสำคัญกับวินเทจที่เก่ากว่าก่อน',
    },
  },
  {
    term: { en: 'Irreversibility', th: 'การไม่สามารถย้อนกลับได้' },
    category: { en: 'Token mechanics', th: 'กลไกโทเคน' },
    definition: {
      en: 'A property of token burning and certificate retirement: once executed, the action cannot be reversed, modified or undone.',
      th: 'คุณสมบัติของการเผาโทเคนและการไถ่ถอนใบรับรอง: เมื่อดำเนินการแล้วไม่สามารถย้อนกลับ แก้ไข หรือยกเลิกได้',
    },
  },
  {
    term: { en: 'Smart contract', th: 'สัญญาอัจฉริยะ' },
    category: { en: 'Governance & security', th: 'การกำกับดูแลและความปลอดภัย' },
    definition: {
      en: 'A program on ThaiFi defining the rules for minting, transferring and burning REC Tokens, executed by authorised operators under multi-signature control.',
      th: 'โปรแกรมบน ThaiFi ที่กำหนดกติกาการออก โอน และเผา REC Token ดำเนินการโดยผู้ปฏิบัติงานที่ได้รับอนุญาตภายใต้การควบคุมด้วยลายมือชื่อหลายฝ่าย',
    },
  },
  {
    term: { en: 'Multi-signature (Multi-sig)', th: 'ลายมือชื่อหลายฝ่าย (Multi-sig)' },
    category: { en: 'Governance & security', th: 'การกำกับดูแลและความปลอดภัย' },
    definition: {
      en: 'A transaction authorisation mechanism requiring cryptographic approval from multiple designated parties before execution, preventing unilateral control.',
      th: 'กลไกอนุมัติธุรกรรมที่ต้องได้รับการอนุมัติด้วยวิธีการเข้ารหัสจากหลายฝ่ายที่กำหนดก่อนดำเนินการ เพื่อป้องกันการควบคุมโดยฝ่ายเดียว',
    },
  },
  {
    term: { en: 'Reconciliation', th: 'การกระทบยอด' },
    category: { en: 'Governance & security', th: 'การกำกับดูแลและความปลอดภัย' },
    definition: {
      en: 'A periodic comparison between tokens in circulation and I-RECs recorded and locked in the registry, conducted quarterly and published within 7 business days.',
      th: 'การเปรียบเทียบเป็นระยะระหว่างโทเคนที่หมุนเวียนกับ I-REC ที่บันทึกและล็อกในทะเบียน ดำเนินการรายไตรมาสและเผยแพร่ภายใน 7 วันทำการ',
    },
  },
];

export const EXECUTIVE_FACTS = {
  tokenInfo: [
    { label: { en: 'Token name', th: 'ชื่อโทเคน' }, value: { en: 'REC Token', th: 'REC Token' } },
    { label: { en: 'Token type', th: 'ประเภทโทเคน' }, value: { en: 'Utility Token (ready-to-use)', th: 'ยูทิลิตี้โทเคน (พร้อมใช้งาน)' } },
    { label: { en: 'Underlying asset', th: 'สินทรัพย์อ้างอิง' }, value: { en: '1 Token = 1 MWh of I-REC', th: '1 โทเคน = 1 MWh ของ I-REC' } },
    { label: { en: 'Blockchain', th: 'บล็อกเชน' }, value: { en: 'ThaiFi (Tempo-compatible EVM)', th: 'ThaiFi (EVM ที่รองรับ Tempo)' } },
    { label: { en: 'Maximum supply', th: 'จำนวนโทเคนสูงสุด' }, value: { en: '100,000,000 tokens', th: '100,000,000 โทเคน' } },
    { label: { en: 'Certification standard', th: 'มาตรฐานการรับรอง' }, value: { en: 'I-REC under the I-TRACK standard', th: 'I-REC ภายใต้มาตรฐาน I-TRACK' } },
  ],
  partners: [
    { name: 'BlockEdge Co., Ltd.', role: { en: 'Issuer', th: 'ผู้ออกโทเคน' }, note: { en: 'Technology developer and official issuer', th: 'ผู้พัฒนาเทคโนโลยีและผู้ออกโทเคนอย่างเป็นทางการ' } },
    { name: 'NetZero Carbon Co., Ltd.', role: { en: 'Asset aggregator', th: 'ผู้รวบรวมสินทรัพย์' }, note: { en: 'Sources and vets renewable energy assets', th: 'จัดหาและคัดกรองสินทรัพย์พลังงานหมุนเวียน' } },
    { name: 'REDEX', role: { en: 'Registrar', th: 'นายทะเบียน' }, note: { en: 'Operates ReHash for recording, locking and tracking', th: 'ดำเนินงาน ReHash เพื่อบันทึก ล็อก และติดตาม' } },
    { name: 'Evident', role: { en: 'Official registry', th: 'ทะเบียนอย่างเป็นทางการ' }, note: { en: 'Global registry for I-RECs', th: 'ทะเบียนระดับโลกสำหรับ I-REC' } },
    { name: 'Valix Consulting Co., Ltd.', role: { en: 'Smart contract auditor', th: 'ผู้ตรวจสอบสัญญาอัจฉริยะ' }, note: { en: 'Independent security auditor', th: 'ผู้ตรวจสอบความปลอดภัยอิสระ' } },
    { name: 'Baker & McKenzie Ltd.', role: { en: 'Legal advisor', th: 'ที่ปรึกษากฎหมาย' }, note: { en: 'Regulatory and legal counsel', th: 'ที่ปรึกษาด้านกฎหมายและกฎระเบียบ' } },
  ],
  team: [
    {
      name: 'Mr. Dom Charoenyos',
      role: { en: 'Founder & Chief Executive Officer', th: 'ผู้ก่อตั้งและประธานเจ้าหน้าที่บริหาร' },
      bio: {
        en: 'Expert in information technology and digital transformation, responsible for strategic direction and aligning platform development with market demand.',
        th: 'ผู้เชี่ยวชาญด้านเทคโนโลยีสารสนเทศและการเปลี่ยนผ่านดิจิทัล รับผิดชอบทิศทางกลยุทธ์และการพัฒนาแพลตฟอร์มให้สอดคล้องกับความต้องการของตลาด',
      },
    },
    {
      name: 'Ms. Getsara Tienchai',
      role: { en: 'General Manager', th: 'ผู้จัดการทั่วไป' },
      bio: {
        en: 'Responsible for day-to-day operations, regulatory compliance and coordination with ecosystem partners.',
        th: 'รับผิดชอบการดำเนินงานประจำวัน การปฏิบัติตามกฎระเบียบ และการประสานงานกับพันธมิตรในระบบนิเวศ',
      },
    },
  ],
} as const;
