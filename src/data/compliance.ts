import type { Bi } from './whitepaper';

export const GOVERNANCE_PRINCIPLES = [
  {
    title: { en: 'Mint-on-lock', th: 'Mint-on-Lock' },
    body: {
      en: 'Tokens are minted only after the corresponding I-RECs are confirmed locked in ReHash. No pre-minting is permitted under any circumstances.',
      th: 'โทเคนจะถูกออกหลังยืนยันว่า I-REC ที่เกี่ยวข้องถูกล็อกใน ReHash แล้วเท่านั้น ไม่อนุญาตให้ออกโทเคนล่วงหน้าในทุกกรณี',
    },
  },
  {
    title: { en: 'Multi-signature authorisation', th: 'การอนุมัติด้วยลายมือชื่อหลายฝ่าย' },
    body: {
      en: 'Minting requires approval from authorised parties at BlockEdge (issuer) and NetZero Carbon (asset aggregator), after REDEX confirms the asset lock.',
      th: 'การออกโทเคนต้องได้รับการอนุมัติจากผู้มีอำนาจของ BlockEdge (ผู้ออกโทเคน) และ NetZero Carbon (ผู้รวบรวมสินทรัพย์) หลัง REDEX ยืนยันการล็อกสินทรัพย์',
    },
  },
  {
    title: { en: 'Segregation of duties', th: 'การแยกหน้าที่' },
    body: {
      en: 'BlockEdge issues and operates the platform; NetZero Carbon sources assets; REDEX / ReHash provides registry and locking infrastructure; Evident is the registry of record. No single party controls the full lifecycle.',
      th: 'BlockEdge ออกโทเคนและดำเนินงานแพลตฟอร์ม NetZero Carbon จัดหาสินทรัพย์ REDEX / ReHash ให้บริการโครงสร้างพื้นฐานด้านทะเบียนและการล็อก ส่วน Evident เป็นทะเบียนอ้างอิงหลัก ไม่มีฝ่ายใดควบคุมวงจรทั้งหมดแต่เพียงผู้เดียว',
    },
  },
  {
    title: { en: 'System transparency', th: 'ความโปร่งใสของระบบ' },
    body: {
      en: 'Issuance mechanisms, allocation structure and operating conditions are predefined, verifiable and publicly accessible. Disclosures do not constitute a guarantee of economic benefit.',
      th: 'กลไกการออกโทเคน โครงสร้างการจัดสรร และเงื่อนไขการดำเนินงานกำหนดไว้ล่วงหน้า ตรวจสอบได้ และเปิดให้สาธารณชนเข้าถึง การเปิดเผยข้อมูลไม่ถือเป็นการรับประกันผลประโยชน์ทางเศรษฐกิจ',
    },
  },
] as const;

export const RECONCILIATION = [
  {
    label: { en: 'Frequency', th: 'ความถี่' },
    value: { en: 'Quarterly', th: 'รายไตรมาส' },
  },
  {
    label: { en: 'Scope', th: 'ขอบเขต' },
    value: {
      en: 'Total REC Tokens in circulation on-chain vs. total I-RECs recorded and locked in ReHash or the relevant registry.',
      th: 'จำนวน REC Token ทั้งหมดที่หมุนเวียนบนเชน เทียบกับ I-REC ทั้งหมดที่บันทึกและล็อกใน ReHash หรือทะเบียนที่เกี่ยวข้อง',
    },
  },
  {
    label: { en: 'Publication', th: 'การเผยแพร่' },
    value: {
      en: 'Summary reports and disclosures released within 7 business days after each reporting period.',
      th: 'มีการเผยแพร่รายงานสรุปและข้อมูลเปิดเผยภายใน 7 วันทำการหลังสิ้นสุดรอบรายงาน',
    },
  },
  {
    label: { en: 'Independent review', th: 'การทบทวนโดยอิสระ' },
    value: {
      en: 'The Company may appoint independent auditors or assurance providers for external validation.',
      th: 'บริษัทอาจแต่งตั้งผู้ตรวจสอบอิสระหรือผู้ให้บริการให้ความเชื่อมั่นอิสระเพื่อตรวจสอบจากภายนอก',
    },
  },
] as const;

export const CONTROL_MECHANISMS = [
  {
    no: '01',
    title: { en: 'One-way binding', th: 'การผูกทางเดียว' },
    body: {
      en: 'Once an I-REC enters REDEX and is tokenised, the underlying asset is locked and cannot be traded externally. Release is possible only after the corresponding REC Tokens are burned. This is the primary defence against double counting.',
      th: 'เมื่อ I-REC เข้าสู่ REDEX และถูกแปลงเป็นโทเคน สินทรัพย์อ้างอิงจะถูกล็อกและไม่สามารถซื้อขายภายนอกได้ การปลดล็อกทำได้หลังเผา REC Token ที่เกี่ยวข้องเท่านั้น นี่คือกลไกหลักในการป้องกันการนับซ้ำ',
    },
  },
  {
    no: '02',
    title: { en: 'Periodic reconciliation', th: 'การกระทบยอดเป็นระยะ' },
    body: {
      en: 'Every quarter, circulating token supply is reconciled against locked I-RECs using defined methodology and scope. Summary reports are published within seven business days of period end.',
      th: 'ทุกไตรมาส จำนวนโทเคนที่หมุนเวียนจะถูกกระทบยอดกับ I-REC ที่ล็อก โดยใช้วิธีการและขอบเขตที่กำหนด รายงานสรุปเผยแพร่ภายในเจ็ดวันทำการหลังสิ้นรอบ',
    },
  },
  {
    no: '03',
    title: { en: 'Public transparency dashboard', th: 'แดชบอร์ดความโปร่งใสสาธารณะ' },
    body: {
      en: 'Total supply, circulating supply, tokens retired and project-level underlying asset data are displayed publicly and updated from chain data.',
      th: 'จำนวนโทเคนรวม จำนวนโทเคนที่หมุนเวียน โทเคนที่ไถ่ถอนแล้ว และข้อมูลสินทรัพย์อ้างอิงรายโครงการจะแสดงต่อสาธารณะและอัปเดตจากข้อมูลบนเชน',
    },
  },
  {
    no: '04',
    title: { en: 'Annual asset quality review', th: 'การทบทวนคุณภาพสินทรัพย์ประจำปี' },
    body: {
      en: 'Vintage, project origin, market acceptance and alignment with international standards are reviewed annually. Before any asset is removed or reallocated, replacement I-RECs of sufficient quantity must be locked to preserve 1:1 backing.',
      th: 'วินเทจ แหล่งกำเนิดโครงการ การยอมรับของตลาด และความสอดคล้องกับมาตรฐานสากลได้รับการทบทวนเป็นประจำทุกปี ก่อนนำสินทรัพย์ใดออกหรือจัดสรรใหม่ ต้องล็อก I-REC ทดแทนในปริมาณที่เพียงพอเพื่อรักษาการรองรับ 1:1',
    },
  },
  {
    no: '05',
    title: { en: 'Vintage management policy', th: 'นโยบายจัดการวินเทจ' },
    body: {
      en: 'I-RECs older than two years from the generation year are not tokenised. Aging assets are continuously monitored and replaced before removal from the pool. Replacement does not automatically increase token supply.',
      th: 'I-REC ที่เก่ากว่าสองปีนับจากปีที่ผลิตจะไม่ถูกแปลงเป็นโทเคน สินทรัพย์ที่มีอายุเพิ่มขึ้นจะได้รับการติดตามอย่างต่อเนื่องและเปลี่ยนทดแทนก่อนนำออกจากพูล การเปลี่ยนทดแทนไม่เพิ่มจำนวนโทเคนโดยอัตโนมัติ',
    },
  },
  {
    no: '06',
    title: { en: 'Smart contract audit', th: 'การตรวจสอบสัญญาอัจฉริยะ' },
    body: {
      en: 'Contracts undergo static analysis, dynamic testing and expert review by Valix Consulting Co., Ltd. Reliance on an audit must match ThaiFi, the contract address and the deployed code version.',
      th: 'สัญญาได้รับการวิเคราะห์แบบ static ทดสอบแบบ dynamic และทบทวนโดยผู้เชี่ยวชาญจาก Valix Consulting Co., Ltd. การอ้างอิงผลตรวจสอบต้องสอดคล้องกับ ThaiFi ที่อยู่สัญญา และเวอร์ชันโค้ดที่ใช้งานจริง',
    },
  },
  {
    no: '07',
    title: { en: 'Multi-signature control', th: 'การควบคุมด้วยลายมือชื่อหลายฝ่าย' },
    body: {
      en: 'Critical state changes and asset-impacting operations require approval from multiple authorised parties, reducing unilateral control and unauthorised access risk.',
      th: 'การเปลี่ยนแปลงสถานะสำคัญและการดำเนินการที่กระทบสินทรัพย์ต้องได้รับอนุมัติจากผู้มีอำนาจหลายฝ่าย เพื่อลดความเสี่ยงจากการควบคุมโดยฝ่ายเดียวและการเข้าถึงโดยไม่ได้รับอนุญาต',
    },
  },
  {
    no: '08',
    title: { en: 'Emergency pause', th: 'การหยุดฉุกเฉิน' },
    body: {
      en: 'Smart contracts include a pause function that may be activated under multi-signature authorisation to suspend operations during a security incident.',
      th: 'สัญญาอัจฉริยะมีฟังก์ชันหยุด ซึ่งสามารถเปิดใช้ภายใต้การอนุมัติด้วยลายมือชื่อหลายฝ่ายเพื่อระงับการดำเนินงานระหว่างเหตุการณ์ด้านความปลอดภัย',
    },
  },
  {
    no: '09',
    title: { en: 'Administrative recovery', th: 'การกู้คืนโดยผู้ดูแลระบบ' },
    body: {
      en: 'If an enterprise user loses wallet access or suffers a verified incident, BlockEdge may assist in transferring tokens to a new wallet after a formal request, identity and entitlement evidence, destination confirmation and multi-signature approval. This is not a general power to freeze or seize tokens.',
      th: 'หากผู้ใช้องค์กรสูญเสียการเข้าถึงกระเป๋าหรือประสบเหตุการณ์ที่ได้รับการยืนยันแล้ว BlockEdge อาจช่วยโอนโทเคนไปยังกระเป๋าใหม่ หลังจากได้รับคำขออย่างเป็นทางการ หลักฐานยืนยันตัวตนและสิทธิ์ การยืนยันกระเป๋าปลายทาง และการอนุมัติด้วยลายมือชื่อหลายฝ่าย การดำเนินการนี้ไม่ใช่อำนาจทั่วไปในการอายัดหรือยึดโทเคน',
    },
  },
  {
    no: '10',
    title: { en: 'Business continuity', th: 'ความต่อเนื่องทางธุรกิจ' },
    body: {
      en: 'Platform data is hosted on high-availability cloud infrastructure with regular backups and geographically separated storage. Controlled manual fallback procedures exist for integration failures, and blockchain state recovery relies on network records and backups rather than Ethereum L1 guarantees.',
      th: 'ข้อมูลแพลตฟอร์มจัดเก็บบนโครงสร้างพื้นฐานคลาวด์ที่มีความพร้อมใช้งานสูง มีการสำรองข้อมูลเป็นประจำและจัดเก็บในพื้นที่ที่แยกจากกัน มีขั้นตอนสำรองแบบดำเนินการด้วยมือภายใต้การควบคุมเมื่อการเชื่อมต่อระบบล้มเหลว และการกู้คืนสถานะบล็อกเชนอาศัยบันทึกเครือข่ายและข้อมูลสำรอง ไม่ได้อาศัยการรับประกันจาก Ethereum L1',
    },
  },
] as const;

export const CLAIM_FRAMEWORKS = [
  {
    name: 'GHG Protocol - Scope 2 (market-based)',
    status: { en: 'Recognised instrument', th: 'เครื่องมือที่ยอมรับ' },
    body: {
      en: 'I-RECs are a recognised Energy Attribute Certificate for market-based Scope 2 reporting. Certificates must be sourced from the same market boundary as the consumption and cancelled on behalf of the reporting organisation.',
      th: 'I-REC เป็นใบรับรองคุณลักษณะพลังงานที่ได้รับการยอมรับสำหรับการรายงาน Scope 2 แบบ market-based ใบรับรองต้องมาจากขอบเขตตลาดเดียวกับการใช้ไฟฟ้า และถูกยกเลิกในนามองค์กรที่รายงาน',
    },
    caveat: {
      en: 'Eligibility depends on the reporting entity, boundary and assurance provider.',
      th: 'การเข้าเกณฑ์ขึ้นอยู่กับองค์กรที่รายงาน ขอบเขต และผู้ให้บริการให้ความเชื่อมั่น',
    },
  },
  {
    name: 'RE100',
    status: { en: 'Conditional', th: 'มีเงื่อนไข' },
    body: {
      en: 'RE100 requires certificates from the same market boundary as the electricity consumption. Holding REC Tokens does not guarantee RE100 eligibility, and RE100 participation is not required to use the token.',
      th: 'RE100 กำหนดให้ใบรับรองมาจากขอบเขตตลาดเดียวกับการใช้ไฟฟ้า การถือ REC Token ไม่ได้รับประกันว่าจะเข้าเกณฑ์ RE100 และไม่จำเป็นต้องเข้าร่วม RE100 เพื่อใช้โทเคน',
    },
    caveat: {
      en: 'Verify market boundary before redemption.',
      th: 'ตรวจสอบขอบเขตตลาดก่อนแลกคืน',
    },
  },
  {
    name: 'SBTi',
    status: { en: 'Conditional', th: 'มีเงื่อนไข' },
    body: {
      en: 'EACs such as I-RECs are one recognised mechanism for managing Scope 2 under the market-based method. SBTi claims are subject to GHG Protocol requirements, including same-market sourcing and cancellation on behalf of the reporting organisation.',
      th: 'EAC เช่น I-REC เป็นหนึ่งในกลไกที่ได้รับการยอมรับสำหรับจัดการ Scope 2 ตามวิธี market-based การกล่าวอ้างตาม SBTi อยู่ภายใต้ข้อกำหนด GHG Protocol รวมถึงการจัดหาจากตลาดเดียวกันและการยกเลิกในนามองค์กรที่รายงาน',
    },
    caveat: {
      en: 'Eligibility is not guaranteed by the issuer.',
      th: 'ผู้ออกโทเคนไม่รับประกันการเข้าเกณฑ์',
    },
  },
  {
    name: 'CDP',
    status: { en: 'Conditional', th: 'มีเงื่อนไข' },
    body: {
      en: 'CDP disclosures may accept Energy Attribute Certificates subject to the applicable questionnaire and methodology. Token holders should confirm the specific requirements with their assurance provider.',
      th: 'การเปิดเผยข้อมูลต่อ CDP อาจยอมรับใบรับรองคุณลักษณะพลังงาน ทั้งนี้ขึ้นอยู่กับแบบสอบถามและวิธีการที่ใช้ ผู้ถือโทเคนควรตรวจสอบข้อกำหนดเฉพาะกับผู้ให้บริการให้ความเชื่อมั่น',
    },
    caveat: {
      en: 'Framework requirements change; verify per reporting cycle.',
      th: 'ข้อกำหนดของกรอบอาจเปลี่ยนแปลงได้ ควรตรวจสอบในแต่ละรอบรายงาน',
    },
  },
  {
    name: 'T-VER / TGO',
    status: { en: 'Different instrument', th: 'เครื่องมือต่างประเภท' },
    body: {
      en: 'T-VER credits represent verified greenhouse-gas reductions or removals under Thailand’s TGO framework. REC Tokens are backed exclusively by I-RECs and are not T-VER credits. The system does not create, hold or retire T-VER credits.',
      th: 'เครดิต T-VER แสดงถึงการลดหรือกำจัดก๊าซเรือนกระจกที่ผ่านการทวนสอบภายใต้กรอบ อบก. ของไทย REC Token มี I-REC รองรับเท่านั้น ไม่ใช่เครดิต T-VER ระบบไม่ได้สร้าง ถือ หรือไถ่ถอนเครดิต T-VER',
    },
    caveat: {
      en: 'Do not present a REC retirement as a T-VER claim.',
      th: 'ห้ามนำการไถ่ถอน REC ไปกล่าวอ้างว่าเป็น T-VER',
    },
  },
  {
    name: 'Thailand UGT / domestic programmes',
    status: { en: 'Case-by-case', th: 'รายกรณี' },
    body: {
      en: 'Green electricity tariffs, tax incentives and some procurement programmes may require certificates originating in Thailand or impose conditions on country of origin, technology, project age or generation year. Central Pool certificates are Southeast Asian and may not satisfy every domestic condition.',
      th: 'อัตราค่าไฟฟ้าสีเขียว สิทธิประโยชน์ทางภาษี และโครงการจัดซื้อบางประเภทอาจกำหนดให้ใบรับรองมาจากประเทศไทย หรือมีเงื่อนไขด้านประเทศแหล่งกำเนิด เทคโนโลยี อายุโครงการ หรือปีที่ผลิต ใบรับรองจาก Central Pool มาจากเอเชียตะวันออกเฉียงใต้และอาจไม่ตรงตามเงื่อนไขในประเทศทุกข้อ',
    },
    caveat: {
      en: 'Verify with the authority or programme owner before redemption.',
      th: 'ตรวจสอบกับหน่วยงานหรือเจ้าของโครงการก่อนแลกคืน',
    },
  },
  {
    name: 'CBAM',
    status: { en: 'Demand driver', th: 'ปัจจัยขับเคลื่อนอุปสงค์' },
    body: {
      en: 'The Carbon Border Adjustment Mechanism supports structural demand for verifiable renewable energy and emissions data. It is not, by itself, a certificate eligibility rule for REC Tokens.',
      th: 'กลไก CBAM สนับสนุนอุปสงค์เชิงโครงสร้างสำหรับข้อมูลพลังงานหมุนเวียนและการปล่อยก๊าซที่ตรวจสอบได้ แต่ตัวกลไกเองไม่ได้เป็นกฎกำหนดคุณสมบัติของใบรับรองสำหรับ REC Token',
    },
    caveat: {
      en: 'Assess against the importer’s sector methodology.',
      th: 'ประเมินตามวิธีการของภาคส่วนผู้นำเข้า',
    },
  },
];

export const RISK_CATEGORIES = [
  {
    no: '7.1',
    title: { en: 'Regulatory and compliance risks', th: 'ความเสี่ยงด้านกฎระเบียบและการปฏิบัติตาม' },
    items: [
      {
        title: { en: 'Changes in digital asset regulation', th: 'การเปลี่ยนแปลงกฎระเบียบสินทรัพย์ดิจิทัล' },
        body: {
          en: 'Laws, regulations or guidance in Thailand or elsewhere may change and affect issuance, trading, transfer or holding of REC Tokens.',
          th: 'กฎหมาย กฎระเบียบ หรือแนวปฏิบัติในไทยหรือเขตอำนาจอื่นอาจเปลี่ยนแปลงและกระทบการออก ซื้อขาย โอน หรือถือ REC Token',
        },
      },
      {
        title: { en: 'Changes in environmental standards', th: 'การเปลี่ยนแปลงมาตรฐานสิ่งแวดล้อม' },
        body: {
          en: 'Updates to the GHG Protocol, SBTi or the I-REC Standard may affect whether I-RECs qualify for Scope 2 claims and could reduce the utility or acceptance of REC Tokens.',
          th: 'การปรับปรุง GHG Protocol, SBTi หรือมาตรฐาน I-REC อาจส่งผลว่า I-REC เข้าเกณฑ์สำหรับการกล่าวอ้าง Scope 2 หรือไม่ และอาจลดประโยชน์หรือการยอมรับ REC Token',
        },
      },
      {
        title: { en: 'Domestic policy restrictions', th: 'ข้อจำกัดนโยบายในประเทศ' },
        body: {
          en: 'Domestic laws, green electricity tariffs, tax incentives or procurement rules may require certificates from the same country or impose conditions on origin, technology, project age or generation year. Because pool tokens are fungible and allocated FIFO, holders cannot know the exact certificate attributes at the time of trading; pre-burn confirmation mitigates this before execution.',
          th: 'กฎหมายในประเทศ อัตราค่าไฟฟ้าสีเขียว สิทธิประโยชน์ทางภาษี หรือกฎการจัดซื้ออาจกำหนดให้ใบรับรองมาจากประเทศเดียวกัน หรือมีเงื่อนไขด้านแหล่งกำเนิด เทคโนโลยี อายุโครงการ หรือปีที่ผลิต เนื่องจากพูลโทเคนทดแทนกันได้และจัดสรรแบบ FIFO ผู้ถือจึงไม่อาจทราบคุณลักษณะที่แน่ชัดของใบรับรองขณะซื้อขาย การยืนยันก่อนเผาช่วยลดความเสี่ยงนี้ก่อนดำเนินการ',
        },
      },
    ],
  },
  {
    no: '7.2',
    title: { en: 'Technology and security risks', th: 'ความเสี่ยงด้านเทคโนโลยีและความปลอดภัย' },
    items: [
      {
        title: { en: 'Blockchain infrastructure risk', th: 'ความเสี่ยงโครงสร้างพื้นฐานบล็อกเชน' },
        body: {
          en: 'Network congestion, delays or disruption on ThaiFi or related infrastructure may affect transaction processing and system availability.',
          th: 'ความแออัด ความล่าช้า หรือการหยุดชะงักของ ThaiFi หรือโครงสร้างพื้นฐานที่เกี่ยวข้องอาจกระทบการประมวลผลธุรกรรมและความพร้อมใช้งานของระบบ',
        },
      },
      {
        title: { en: 'Smart contract risk', th: 'ความเสี่ยงสัญญาอัจฉริยะ' },
        body: {
          en: 'Despite audits, smart contracts may contain undiscovered vulnerabilities that could be exploited, causing loss of assets or system malfunction.',
          th: 'แม้ผ่านการตรวจสอบ สัญญาอัจฉริยะอาจมีช่องโหว่ที่ยังไม่ถูกค้นพบ ซึ่งอาจถูกใช้โจมตีทำให้สูญเสียสินทรัพย์หรือระบบทำงานผิดพลาด',
        },
      },
      {
        title: { en: 'Integration risk', th: 'ความเสี่ยงจากการเชื่อมต่อระบบ' },
        body: {
          en: 'Operations depend on third-party platforms including REDEX and Evident. Service interruptions or failures in those systems may affect redemption and operational continuity.',
          th: 'การดำเนินงานพึ่งพาแพลตฟอร์มบุคคลที่สาม เช่น REDEX และ Evident การหยุดให้บริการหรือความล้มเหลวของระบบเหล่านี้อาจกระทบการแลกคืนและความต่อเนื่องของการดำเนินงาน',
        },
      },
      {
        title: { en: 'Transaction processing and ordering risk', th: 'ความเสี่ยงการประมวลผลและลำดับธุรกรรม' },
        body: {
          en: 'Allocation is FIFO by vintage and does not depend on blockchain ordering or fees paid. Blockchain recording may still be delayed by network conditions, fees or infrastructure limits. Request processing order follows verification and confirmation in BlockEdge’s system, not on-chain confirmation order.',
          th: 'การจัดสรรเป็นแบบ FIFO ตามวินเทจและไม่ขึ้นกับลำดับบนบล็อกเชนหรือค่าธรรมเนียมที่จ่าย การบันทึกบนบล็อกเชนอาจล่าช้าจากสภาพเครือข่าย ค่าธรรมเนียม หรือข้อจำกัดของโครงสร้างพื้นฐาน ลำดับการดำเนินการตามคำขออิงการทวนสอบและยืนยันในระบบ BlockEdge ไม่ใช่ลำดับการยืนยันบนเชน',
        },
      },
    ],
  },
  {
    no: '7.3',
    title: { en: 'Market and liquidity risks', th: 'ความเสี่ยงด้านตลาดและสภาพคล่อง' },
    items: [
      {
        title: { en: 'Underlying price volatility', th: 'ความผันผวนของราคาอ้างอิง' },
        body: {
          en: 'Trading prices may fluctuate with supply, demand, liquidity and market conditions, and may be higher or lower than OTC I-REC prices, underlying costs or the Company’s sell order prices. Changes to or cancellation of sell orders may affect prices and liquidity.',
          th: 'ราคาซื้อขายอาจผันผวนตามอุปสงค์ อุปทาน สภาพคล่อง และสภาวะตลาด และอาจสูงหรือต่ำกว่าราคา I-REC ในตลาด OTC ต้นทุนอ้างอิง หรือราคาคำสั่งขายของบริษัท การเปลี่ยนแปลงหรือยกเลิกคำสั่งขายอาจกระทบราคาและสภาพคล่อง',
        },
      },
      {
        title: { en: 'Liquidity risk', th: 'ความเสี่ยงสภาพคล่อง' },
        body: {
          en: 'Secondary-market liquidity may be limited and holders may be unable to sell at a desired price or time. Placement of sell orders does not guarantee execution or sufficient buy-side demand, and the Company is not obliged to maintain orders or buy back tokens.',
          th: 'สภาพคล่องในตลาดรองอาจจำกัดและผู้ถืออาจขายไม่ได้ตามราคาหรือเวลาที่ต้องการ การวางคำสั่งขายไม่รับประกันการดำเนินการตามคำสั่งหรืออุปสงค์ฝั่งซื้อที่เพียงพอ และบริษัทไม่มีหน้าที่คงคำสั่งไว้หรือรับซื้อคืนโทเคน',
        },
      },
    ],
  },
  {
    no: '7.4',
    title: { en: 'Operational risks', th: 'ความเสี่ยงด้านการดำเนินงาน' },
    items: [
      {
        title: { en: 'Dependency on ecosystem partners', th: 'การพึ่งพาพันธมิตรในระบบนิเวศ' },
        body: {
          en: 'The system relies on NetZero Carbon, REDEX and Evident. Disruption, operational failure or a change in status of these parties may impact the system.',
          th: 'ระบบพึ่งพา NetZero Carbon, REDEX และ Evident การหยุดชะงัก ความล้มเหลวในการดำเนินงาน หรือการเปลี่ยนแปลงสถานะของฝ่ายเหล่านี้อาจกระทบระบบ',
        },
      },
      {
        title: { en: 'Dependency on external standards and registries', th: 'การพึ่งพามาตรฐานและทะเบียนภายนอก' },
        body: {
          en: 'Changes to the I-REC Standard or registry operations, including suspension, termination or rule changes, may affect the usability and recognition of REC Tokens.',
          th: 'การเปลี่ยนแปลงมาตรฐาน I-REC หรือการดำเนินงานของทะเบียน รวมถึงการระงับ การสิ้นสุด หรือการแก้ไขกฎ อาจกระทบความสามารถในการใช้งานและการยอมรับ REC Token',
        },
      },
    ],
  },
  {
    no: '7.5',
    title: { en: 'Business continuity and disaster recovery', th: 'ความต่อเนื่องทางธุรกิจและการกู้คืนหลังภัยพิบัติ' },
    items: [
      {
        title: { en: 'Data and infrastructure redundancy', th: 'การสำรองข้อมูลและโครงสร้างพื้นฐาน' },
        body: {
          en: 'Platform data is hosted on high-availability cloud infrastructure with regular backups and geographically separated storage.',
          th: 'ข้อมูลแพลตฟอร์มจัดเก็บบนโครงสร้างพื้นฐานคลาวด์ที่มีความพร้อมใช้งานสูง มีการสำรองข้อมูลเป็นประจำและจัดเก็บในพื้นที่ที่แยกจากกัน',
        },
      },
      {
        title: { en: 'Blockchain state backup and recovery', th: 'การสำรองและกู้คืนสถานะบล็อกเชน' },
        body: {
          en: 'State verification and recovery on ThaiFi depend on network records, backups and recovery procedures actually in place, without relying on Ethereum Layer 1 guarantees.',
          th: 'การตรวจสอบและกู้คืนสถานะบน ThaiFi ขึ้นกับบันทึกเครือข่าย การสำรองข้อมูล และขั้นตอนกู้คืนที่ใช้งานจริง โดยไม่พึ่งพาการรับประกันจาก Ethereum Layer 1',
        },
      },
      {
        title: { en: 'Operational fallback', th: 'ขั้นตอนสำรองการดำเนินงาน' },
        body: {
          en: 'If automated integrations fail, authorised personnel may execute controlled manual processes under defined procedures and verification controls.',
          th: 'หากการเชื่อมต่ออัตโนมัติล้มเหลว บุคลากรที่ได้รับอนุญาตอาจดำเนินกระบวนการด้วยมือภายใต้การควบคุม ตามขั้นตอนและมาตรการควบคุมการทวนสอบที่กำหนด',
        },
      },
      {
        title: { en: 'Emergency pause mechanism', th: 'กลไกหยุดฉุกเฉิน' },
        body: {
          en: 'Smart contracts include a pause function that can be activated under multi-signature authorisation to suspend operations during a security incident.',
          th: 'สัญญาอัจฉริยะมีฟังก์ชันหยุดซึ่งเปิดใช้ได้ภายใต้การอนุมัติด้วยลายมือชื่อหลายฝ่ายเพื่อระงับการดำเนินงานระหว่างเหตุการณ์ด้านความปลอดภัย',
        },
      },
    ],
  },
] as const;

export const APPEAL_STEPS = [
  {
    no: '01',
    title: { en: 'Pre-burn disclosure', th: 'การเปิดเผยก่อนเผา' },
    body: {
      en: 'Before burning tokens, BlockEdge provides the token holder with the details of the underlying assets to be allocated: project type, country of origin, energy technology, generation year (vintage) and any relevant conditions.',
      th: 'ก่อนเผาโทเคน BlockEdge จะแจ้งรายละเอียดสินทรัพย์อ้างอิงที่จะจัดสรรให้ผู้ถือโทเคน ได้แก่ ประเภทโครงการ ประเทศแหล่งกำเนิด เทคโนโลยีพลังงาน ปีที่ผลิต (วินเทจ) และเงื่อนไขที่เกี่ยวข้อง',
    },
  },
  {
    no: '02',
    title: { en: 'Right to cancel', th: 'สิทธิ์ยกเลิก' },
    body: {
      en: 'The token holder may cancel the request without penalty at any time before the burn is executed if the allocated asset details do not meet their intended use.',
      th: 'หากรายละเอียดสินทรัพย์ที่จัดสรรไม่ตรงกับวัตถุประสงค์การใช้งาน ผู้ถือโทเคนสามารถยกเลิกคำขอได้ทุกเมื่อก่อนดำเนินการเผา โดยไม่มีค่าปรับ',
    },
  },
  {
    no: '03',
    title: { en: 'Confirmation', th: 'การยืนยัน' },
    body: {
      en: 'Once the holder confirms, they are deemed to have accepted the disclosed asset details, and BlockEdge proceeds with the burn, redemption or retirement.',
      th: 'เมื่อผู้ถือยืนยัน ถือว่ายอมรับรายละเอียดสินทรัพย์ที่เปิดเผยแล้ว และ BlockEdge จะดำเนินการเผา แลกคืน หรือไถ่ถอนต่อ',
    },
  },
  {
    no: '04',
    title: { en: 'Appeal within 14 days', th: 'อุทธรณ์ภายใน 14 วัน' },
    body: {
      en: 'If a functional usability issue arises after confirmation - for example an ESG eligibility concern, regulatory limitation or registry technical issue - the holder may appeal within 14 days through the designated channel, with transaction details, a description of the issue and supporting documents.',
      th: 'หากเกิดปัญหาการใช้งานจริงหลังการยืนยัน เช่น ปัญหาการเข้าเกณฑ์ ESG ข้อจำกัดทางกฎระเบียบ หรือปัญหาทางเทคนิคของทะเบียน ผู้ถือสามารถอุทธรณ์ภายใน 14 วันผ่านช่องทางที่กำหนด พร้อมรายละเอียดธุรกรรม คำอธิบายปัญหา และเอกสารประกอบ',
    },
  },
  {
    no: '05',
    title: { en: 'Review and outcome', th: 'การทบทวนและผลลัพธ์' },
    body: {
      en: 'BlockEdge evaluates the appeal against the pre-disclosed asset information, FIFO allocation, asset status at allocation, registry rules and applicable ESG standards, and notifies the applicant within 7 days of receiving a complete appeal. Appeals cover functional usability, not personal preference or a change of mind after a confirmed burn.',
      th: 'BlockEdge จะพิจารณาคำอุทธรณ์โดยอ้างอิงข้อมูลสินทรัพย์ที่เปิดเผยล่วงหน้า การจัดสรรแบบ FIFO สถานะสินทรัพย์ ณ เวลาจัดสรร กฎของทะเบียน และมาตรฐาน ESG ที่ใช้ และแจ้งผลให้ผู้ยื่นคำขอภายใน 7 วันนับจากได้รับคำอุทธรณ์ครบถ้วน การอุทธรณ์ครอบคลุมปัญหาการใช้งานจริง ไม่ใช่ความชอบส่วนตัวหรือการเปลี่ยนใจหลังการเผาที่ได้รับการยืนยันแล้ว',
    },
  },
] as const;

export const CUSTODY_POINTS = [
  {
    title: { en: 'Held in the issuer’s name', th: 'ถือในนามผู้ออกโทเคน' },
    body: {
      en: 'Underlying I-RECs may be held or recorded in a registry or custody account opened in the name of BlockEdge, or operated through REDEX, ReHash, Evident or other relevant platforms, solely for backing, reconciliation, redemption and retirement.',
      th: 'I-REC อ้างอิงอาจถูกถือหรือบันทึกในบัญชีทะเบียนหรือบัญชีดูแลที่เปิดในนาม BlockEdge หรือดำเนินการผ่าน REDEX, ReHash, Evident หรือแพลตฟอร์มที่เกี่ยวข้อง เพื่อการรองรับ การกระทบยอด การแลกคืน และการไถ่ถอนเท่านั้น',
    },
  },
  {
    title: { en: 'No independent custodian', th: 'ไม่มีผู้ดูแลทรัพย์สินอิสระ' },
    body: {
      en: 'REDEX, ReHash and Evident operate the account in which BlockEdge holds the I-RECs and do not act as independent custodians, trustees or asset segregators for token holders, except as expressly specified in applicable platform rules or agreements.',
      th: 'REDEX, ReHash และ Evident ดำเนินการบัญชีที่ BlockEdge ถือ I-REC และไม่ได้ทำหน้าที่เป็นผู้ดูแลทรัพย์สินอิสระ ทรัสตี หรือผู้แยกสินทรัพย์อิสระเพื่อผู้ถือโทเคน เว้นแต่ระบุไว้ชัดเจนในกฎหรือข้อตกลงของแพลตฟอร์มที่ใช้บังคับ',
    },
  },
  {
    title: { en: 'Not insolvency-remote', th: 'ไม่ได้แยกคุ้มครองจากภาวะล้มละลาย' },
    body: {
      en: 'The underlying I-RECs are not subject to any trust, segregated account or other insolvency-remote arrangement separating them from BlockEdge’s own assets. If BlockEdge becomes insolvent, the I-RECs may form part of its general estate and token holders may rank as unsecured creditors.',
      th: 'I-REC อ้างอิงไม่ได้อยู่ภายใต้ทรัสต์ บัญชีแยก หรือข้อตกลงอื่นที่แยกสินทรัพย์ดังกล่าวออกจากสินทรัพย์ของ BlockEdge และคุ้มครองจากภาวะล้มละลาย หาก BlockEdge ล้มละลาย I-REC อาจเป็นส่วนหนึ่งของกองทรัพย์สินทั่วไป และผู้ถือโทเคนอาจอยู่ในฐานะเจ้าหนี้ไม่มีหลักประกัน',
    },
  },
  {
    title: { en: 'No proprietary right from 1:1', th: 'การรองรับ 1:1 ไม่ได้ให้สิทธิ์ในทรัพย์สิน' },
    body: {
      en: 'The 1:1 linkage principle does not, by itself, confer any proprietary, secured or preferential right over the underlying assets.',
      th: 'หลักการเชื่อมโยง 1:1 เพียงอย่างเดียวไม่ได้ให้สิทธิ์ในทรัพย์สิน สิทธิ์มีหลักประกัน หรือบุริมสิทธิ์เหนือสินทรัพย์อ้างอิง',
    },
  },
  {
    title: { en: 'No commingling', th: 'ไม่มีการปะปน' },
    body: {
      en: 'No commingling with carbon credits or other asset classes occurs, and no underlying assets other than I-RECs are used to back REC Tokens.',
      th: 'ไม่มีการปะปนกับคาร์บอนเครดิตหรือสินทรัพย์ประเภทอื่น และไม่มีสินทรัพย์อ้างอิงอื่นนอกเหนือจาก I-REC ที่ใช้รองรับ REC Token',
    },
  },
  {
    title: { en: 'Permitted use only', th: 'ใช้ได้เฉพาะวัตถุประสงค์ที่อนุญาต' },
    body: {
      en: 'BlockEdge may not use, dispose of, transfer, retire or allocate the underlying I-RECs at its own discretion for any purpose other than the documented processes, relevant agreements and applicable law.',
      th: 'BlockEdge ไม่สามารถใช้ จำหน่าย โอน ไถ่ถอน หรือจัดสรร I-REC อ้างอิงตามดุลพินิจของตนเพื่อวัตถุประสงค์อื่นนอกเหนือจากกระบวนการที่จัดทำเป็นเอกสาร ข้อตกลงที่เกี่ยวข้อง และกฎหมายที่ใช้บังคับ',
    },
  },
] as const;
