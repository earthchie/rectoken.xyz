import type { Bi } from './whitepaper';

export const FAQ_COMPARISON = {
  title: { en: 'User type comparison', th: 'การเปรียบเทียบประเภทผู้ใช้' },
  columns: [
    { en: 'Feature', th: 'หัวข้อ' },
    { en: 'Corporate user (legal entity)', th: 'ผู้ใช้องค์กร (นิติบุคคล)' },
    { en: 'Individual user (non-legal entity)', th: 'ผู้ใช้บุคคลธรรมดา (ไม่ใช่นิติบุคคล)' },
  ],
  rows: [
    [
      { en: 'Primary action', th: 'การดำเนินการหลัก' },
      { en: 'Redemption', th: 'การแลกคืน' },
      { en: 'Retirement', th: 'การไถ่ถอน' },
    ],
    [
      { en: 'Outcome', th: 'ผลลัพธ์' },
      { en: 'Official I-REC retirement certificate', th: 'ใบรับรองการไถ่ถอน I-REC อย่างเป็นทางการ' },
      {
        en: 'Permanent on-chain token burn with a public transaction record',
        th: 'การเผาโทเคนบนเชนอย่างถาวรพร้อมบันทึกธุรกรรมสาธารณะ',
      },
    ],
    [
      { en: 'Purpose', th: 'วัตถุประสงค์' },
      { en: 'Formal ESG / Scope 2 reporting', th: 'การรายงาน ESG / Scope 2 อย่างเป็นทางการ' },
      {
        en: 'Personal carbon offsetting and verifiable climate contribution',
        th: 'การชดเชยคาร์บอนส่วนบุคคลและการมีส่วนร่วมด้านสภาพภูมิอากาศที่ตรวจสอบได้',
      },
    ],
  ],
};

export const INDIVIDUAL_NOTICE = {
  title: { en: 'Short notification for individual REC retirement', th: 'ประกาศสั้นสำหรับการไถ่ถอน REC ของบุคคลธรรมดา' },
  body: [
    {
      en: 'For our individual users: please read before proceeding.',
      th: 'สำหรับผู้ใช้บุคคลธรรมดา: กรุณาอ่านก่อนดำเนินการ',
    },
    {
      en: 'You are about to retire your REC Token. This action lets individuals claim the environmental benefit of renewable energy. It permanently burns the token on the blockchain, creating a public and verifiable record of your climate action.',
      th: 'คุณกำลังจะไถ่ถอน REC Token ของคุณ การดำเนินการนี้ช่วยให้บุคคลธรรมดาสามารถกล่าวอ้างประโยชน์ด้านสิ่งแวดล้อมของพลังงานหมุนเวียนได้ โดยโทเคนจะถูกเผาบนบล็อกเชนอย่างถาวร และเกิดเป็นบันทึกสาธารณะที่ตรวจสอบได้เกี่ยวกับการมีส่วนร่วมด้านสภาพภูมิอากาศของคุณ',
    },
    {
      en: 'This process does not issue a formal I-REC certificate. The issuance of official certificates for ESG reporting is a service reserved for corporate and legal entity clients.',
      th: 'กระบวนการนี้ไม่มีการออกใบรับรอง I-REC อย่างเป็นทางการ การออกใบรับรองเพื่อการรายงาน ESG เป็นบริการสำหรับลูกค้าองค์กรและนิติบุคคลเท่านั้น',
    },
    {
      en: 'By confirming, you understand that you are taking a personal action to support a greener future.',
      th: 'การยืนยันหมายความว่าคุณเข้าใจว่าคุณกำลังดำเนินการในฐานะบุคคลเพื่อสนับสนุนอนาคตที่เป็นมิตรต่อสิ่งแวดล้อมมากขึ้น',
    },
  ],
};

export const FAQ_CATEGORIES: Array<{
  id: string;
  title: Bi;
  icon: string;
  items: Array<{ q: Bi; a: Bi }>;
}> = [
  {
    id: 'redemption-retirement',
    title: { en: 'Redemption vs retirement', th: 'การแลกคืนกับการไถ่ถอน' },
    icon: 'Scale',
    items: [
      {
        q: { en: 'What is the difference between redemption and retirement?', th: 'การแลกคืนและการไถ่ถอนต่างกันอย่างไร' },
        a: {
          en: 'Redemption returns tokens to the system in exchange for the underlying I-RECs. Retirement permanently cancels the I-REC in the registry so the environmental benefit can be claimed. Corporate users redeem for formal ESG reporting; individuals retire for personal climate action. Both end with the token being burned.',
          th: 'การแลกคืนเป็นการส่งโทเคนคืนให้ระบบเพื่อรับ I-REC อ้างอิง การไถ่ถอนเป็นการยกเลิก I-REC ในทะเบียนอย่างถาวรเพื่อให้สามารถกล่าวอ้างประโยชน์ด้านสิ่งแวดล้อมได้ ผู้ใช้องค์กรแลกคืนเพื่อการรายงาน ESG อย่างเป็นทางการ บุคคลธรรมดาไถ่ถอนเพื่อการดำเนินการด้านสภาพภูมิอากาศส่วนบุคคล ทั้งสองวิธีสิ้นสุดด้วยการเผาโทเคน',
        },
      },
      {
        q: { en: 'What is corporate redemption?', th: 'การแลกคืนสำหรับองค์กรคืออะไร' },
        a: {
          en: 'Designed for companies and other legal entities to meet formal sustainability goals. Action: redeem REC Tokens. Outcome: the underlying I-REC is officially retired in the registry on behalf of your organisation, and you receive a formal retirement certificate usable in ESG reporting. Primary use: Scope 2 emission reduction targets under the GHG Protocol and demonstrating commitment to 100% renewable electricity sourcing.',
          th: 'ออกแบบสำหรับบริษัทและนิติบุคคลอื่น ๆ เพื่อบรรลุเป้าหมายความยั่งยืนอย่างเป็นทางการ การดำเนินการ: แลกคืน REC Token ผลลัพธ์: I-REC อ้างอิงถูกไถ่ถอนอย่างเป็นทางการในทะเบียนในนามองค์กรของคุณ และคุณได้รับใบรับรองการไถ่ถอนอย่างเป็นทางการที่ใช้ในการรายงาน ESG ได้ วัตถุประสงค์หลัก: เป้าหมายการลดการปล่อย Scope 2 ภายใต้ GHG Protocol และการแสดงความมุ่งมั่นในการจัดหาไฟฟ้าจากพลังงานหมุนเวียน 100%',
        },
      },
      {
        q: { en: 'What is individual retirement?', th: 'การไถ่ถอนสำหรับบุคคลธรรมดาคืออะไร' },
        a: {
          en: 'Designed for individual users who want a direct, verifiable impact. Action: retire REC Tokens. Outcome: the token is permanently burned on-chain, creating a secure, public and immutable audit trail proving that the environmental benefit of that specific MWh has been claimed by you and cannot be resold or double-counted. Primary use: personal offsetting and contributing to clean energy development. This does not result in a formal I-REC certificate in your name.',
          th: 'ออกแบบสำหรับผู้ใช้บุคคลธรรมดาที่ต้องการสร้างผลกระทบโดยตรงและตรวจสอบได้ การดำเนินการ: ไถ่ถอน REC Token ผลลัพธ์: โทเคนถูกเผาบนเชนอย่างถาวร ทำให้เกิดบันทึกสำหรับการตรวจสอบที่ปลอดภัย เปิดเผยต่อสาธารณะ และแก้ไขไม่ได้ ซึ่งยืนยันว่าคุณได้กล่าวอ้างประโยชน์ด้านสิ่งแวดล้อมของพลังงาน MWh นั้นแล้ว และไม่สามารถขายต่อหรือนับซ้ำได้ วัตถุประสงค์หลัก: การชดเชยส่วนบุคคลและการมีส่วนร่วมในการพัฒนาพลังงานสะอาด การดำเนินการนี้ไม่ทำให้เกิดใบรับรอง I-REC อย่างเป็นทางการในชื่อของคุณ',
        },
      },
      {
        q: { en: 'Can I get an official certificate for personal retirement?', th: 'ฉันจะได้รับใบรับรองอย่างเป็นทางการสำหรับการไถ่ถอนส่วนบุคคลหรือไม่' },
        a: {
          en: 'No. Official certificates for ESG reporting are reserved for corporate and legal entity clients. Individual users receive the on-chain transaction as proof of climate action. BlockEdge may record an individual’s name in the retirement purpose field when retiring on their behalf, subject to identity verification.',
          th: 'ไม่ได้ ใบรับรองอย่างเป็นทางการสำหรับการรายงาน ESG เป็นบริการสำหรับลูกค้าองค์กรและนิติบุคคลเท่านั้น ผู้ใช้บุคคลธรรมดาได้รับรายการธุรกรรมบนเชนเป็นหลักฐานการมีส่วนร่วมด้านสภาพภูมิอากาศ BlockEdge อาจบันทึกชื่อบุคคลในช่องวัตถุประสงค์การไถ่ถอนเมื่อไถ่ถอนในนามบุคคลนั้น โดยต้องผ่านการยืนยันตัวตน',
        },
      },
    ],
  },
  {
    id: 'token-asset',
    title: { en: 'Token and underlying asset', th: 'โทเคนและสินทรัพย์อ้างอิง' },
    icon: 'Coins',
    items: [
      {
        q: { en: 'What exactly is a REC Token?', th: 'REC Token คืออะไรกันแน่' },
        a: {
          en: 'An ERC-20 utility token issued by BlockEdge Co., Ltd. One token represents the right equivalent to 1 MWh of verified renewable electricity, subject to Central Pool allocation FIFO by vintage. It does not represent a specific certificate selectable by the holder.',
          th: 'ยูทิลิตี้โทเคน ERC-20 ที่ออกโดยบริษัท บล็อกเอจ จำกัด หนึ่งโทเคนแสดงถึงสิทธิ์ที่เทียบเท่ากับไฟฟ้าจากพลังงานหมุนเวียนที่ทวนสอบแล้ว 1 MWh ภายใต้การจัดสรรจาก Central Pool แบบ FIFO ตามวินเทจ โดยไม่ได้แสดงถึงใบรับรองเฉพาะที่ผู้ถือสามารถเลือกได้',
        },
      },
      {
        q: { en: 'What is an I-REC?', th: 'I-REC คืออะไร' },
        a: {
          en: 'An International Renewable Energy Certificate is a globally recognised Energy Attribute Certificate. When a renewable plant generates 1 MWh and injects it into the grid, one I-REC is issued. It proves that 1 MWh of renewable electricity was generated and assigns its environmental attributes to the certificate holder.',
          th: 'International Renewable Energy Certificate เป็นใบรับรองคุณลักษณะพลังงานที่ได้รับการยอมรับทั่วโลก เมื่อโรงไฟฟ้าพลังงานหมุนเวียนผลิตไฟฟ้า 1 MWh และจ่ายเข้าสู่โครงข่าย จะมีการออก I-REC หนึ่งหน่วย ใบรับรองนี้ยืนยันว่ามีการผลิตไฟฟ้าจากพลังงานหมุนเวียน 1 MWh และกำหนดให้คุณลักษณะด้านสิ่งแวดล้อมเป็นของผู้ถือใบรับรอง',
        },
      },
      {
        q: { en: 'Is a REC the same as a carbon credit or a T-VER credit?', th: 'REC เหมือนกับคาร์บอนเครดิตหรือเครดิต T-VER หรือไม่' },
        a: {
          en: 'No. A carbon credit represents the reduction or removal of 1 tCO₂e and is generally used for Scope 1 and Scope 3. An I-REC represents 1 MWh of renewable electricity and supports Scope 2 under the market-based method. A T-VER credit is a Thai TGO-certified greenhouse-gas reduction or removal. REC Tokens are backed only by I-RECs - never by carbon credits, offsets or T-VER credits.',
          th: 'ไม่เหมือนกัน คาร์บอนเครดิตแสดงถึงการลดหรือกำจัดก๊าซเรือนกระจก 1 tCO₂e และมักใช้กับ Scope 1 และ Scope 3 ส่วน I-REC แสดงถึงไฟฟ้าจากพลังงานหมุนเวียน 1 MWh และรองรับ Scope 2 ตามวิธี market-based เครดิต T-VER แสดงถึงการลดหรือกำจัดก๊าซเรือนกระจกที่ได้รับการรับรองโดย อบก. REC Token มี I-REC รองรับเท่านั้น ไม่ได้มีคาร์บอนเครดิต ออฟเซต หรือเครดิต T-VER รองรับ',
        },
      },
      {
        q: { en: 'Which projects can back the token?', th: 'โครงการแบบใดสามารถรองรับโทเคนได้' },
        a: {
          en: 'Hydropower projects located in Southeast Asia, certified under the I-REC standard, with a vintage no older than two years from the generation year. Solar, wind and biomass are excluded by the inclusion policy.',
          th: 'โครงการพลังน้ำในเอเชียตะวันออกเฉียงใต้ที่ได้รับการรับรองตามมาตรฐาน I-REC และมีวินเทจไม่เกินสองปีนับจากปีที่ผลิต ตามนโยบายการรับเข้าไม่รวมพลังงานแสงอาทิตย์ ลม และชีวมวล',
        },
      },
      {
        q: { en: 'What is the difference between Project Tokens and Pool Tokens?', th: 'Project Token กับ Pool Token ต่างกันอย่างไร' },
        a: {
          en: 'Project Tokens are issued 1:1 against a specific project’s locked I-RECs. Holders may deposit them into the Central Pool and receive Pool Tokens 1:1. 1 Pool Token = 1 Project Token = 1 I-REC = 1 MWh. Pool Tokens are fungible and are the tokens intended for exchange trading.',
          th: 'Project Token ออกในอัตรา 1:1 เทียบกับ I-REC ที่ล็อกไว้ของโครงการหนึ่งโดยเฉพาะ ผู้ถือสามารถนำ Project Token ไปฝากใน Central Pool และรับ Pool Token ในอัตรา 1:1 โดย 1 Pool Token = 1 Project Token = 1 I-REC = 1 MWh Pool Token แต่ละหน่วยใช้ทดแทนกันได้ และเป็นโทเคนที่มีไว้สำหรับซื้อขายบนศูนย์ซื้อขาย',
        },
      },
    ],
  },
  {
    id: 'supply-governance',
    title: { en: 'Supply, governance and audit', th: 'จำนวนโทเคน การกำกับดูแล และการตรวจสอบ' },
    icon: 'ShieldCheck',
    items: [
      {
        q: { en: 'How is 1:1 backing enforced?', th: 'มีการดูแลให้มีสินทรัพย์รองรับในอัตรา 1:1 อย่างไร' },
        a: {
          en: 'Mint-on-lock: tokens are minted only after the corresponding I-RECs are confirmed locked in ReHash. One-way binding: the asset cannot leave the system until the tokens are burned. Quarterly reconciliation compares circulating supply with locked certificates, and summary reports are published within seven business days of period end.',
          th: 'Mint-on-lock: ออกโทเคนหลังยืนยันว่า I-REC ที่เกี่ยวข้องถูกล็อกไว้ใน ReHash แล้วเท่านั้น การผูกทางเดียว: สินทรัพย์ออกจากระบบไม่ได้จนกว่าโทเคนจะถูกเผา มีการกระทบยอดรายไตรมาสโดยเปรียบเทียบจำนวนโทเคนหมุนเวียนกับใบรับรองที่ล็อกไว้ และเผยแพร่รายงานสรุปภายในเจ็ดวันทำการหลังสิ้นรอบ',
        },
      },
      {
        q: { en: 'What is the maximum supply and is there a pre-mint?', th: 'จำนวนโทเคนสูงสุดเท่าใด และมีการออกล่วงหน้าหรือไม่' },
        a: {
          en: 'The maximum supply is 100,000,000 tokens. There is no pre-minting under any circumstances. Circulating supply is dynamic and tied strictly to verified locked assets. Allocation is 40% direct user allocation and 60% system liquidity reserve.',
          th: 'จำนวนโทเคนสูงสุดคือ 100,000,000 โทเคน ไม่มีการออกโทเคนล่วงหน้าไม่ว่ากรณีใด จำนวนโทเคนหมุนเวียนเปลี่ยนแปลงได้และผูกกับสินทรัพย์ที่ล็อกและทวนสอบแล้วอย่างเคร่งครัด การจัดสรรแบ่งเป็น 40% สำหรับผู้ใช้โดยตรง และ 60% สำหรับสำรองสภาพคล่องของระบบ',
        },
      },
      {
        q: { en: 'Who audits the smart contracts?', th: 'ใครตรวจสอบสัญญาอัจฉริยะ' },
        a: {
          en: 'Valix Consulting Co., Ltd. performs static code analysis, dynamic testing and expert review. Any reliance on an audit must match ThaiFi, the contract address in the whitepaper and the deployed code version; an earlier report does not automatically cover a new contract or version.',
          th: 'Valix Consulting Co., Ltd. ดำเนินการวิเคราะห์โค้ดแบบ static ทดสอบแบบ dynamic และตรวจทานโดยผู้เชี่ยวชาญ การอ้างอิงผลการตรวจสอบต้องตรงกับ ThaiFi ที่อยู่สัญญาในไวท์เปเปอร์ และเวอร์ชันโค้ดที่ใช้งานจริง รายงานเดิมไม่ครอบคลุมสัญญาหรือเวอร์ชันใหม่โดยอัตโนมัติ',
        },
      },
      {
        q: { en: 'Who can mint tokens?', th: 'ใครสามารถออกโทเคนได้' },
        a: {
          en: 'Minting requires multi-signature approval from authorised parties at BlockEdge (issuer) and NetZero Carbon (asset aggregator), and is executed only after REDEX confirms the asset lock. No single party can mint unilaterally.',
          th: 'การออกโทเคนต้องได้รับการอนุมัติด้วยลายมือชื่อหลายฝ่ายจากผู้มีอำนาจของ BlockEdge (ผู้ออกโทเคน) และ NetZero Carbon (ผู้รวบรวมสินทรัพย์) และดำเนินการหลัง REDEX ยืนยันการล็อกสินทรัพย์เท่านั้น ไม่มีฝ่ายใดออกโทเคนฝ่ายเดียวได้',
        },
      },
      {
        q: { en: 'What happens if an underlying certificate is revoked?', th: 'เกิดอะไรขึ้นหากใบรับรองอ้างอิงถูกเพิกถอน' },
        a: {
          en: 'BlockEdge notifies affected holders within 14 days of becoming aware, suspends allocation or redemption of the affected asset, and uses reasonable efforts to replace it with an I-REC of equivalent or substantially similar value and attributes. If no replacement is obtained within 90 days, remediation follows a disclosed methodology. Any burn of affected tokens occurs only after remediation is complete.',
          th: 'BlockEdge จะแจ้งผู้ถือที่ได้รับผลกระทบภายใน 14 วันนับจากทราบเหตุ ระงับการจัดสรรหรือแลกคืนสินทรัพย์ที่ได้รับผลกระทบ และใช้ความพยายามตามสมควรในการทดแทนด้วย I-REC ที่มีมูลค่าและคุณลักษณะเทียบเท่าหรือใกล้เคียงกันในสาระสำคัญ หากไม่ได้สินทรัพย์ทดแทนภายใน 90 วัน จะดำเนินการแก้ไขเยียวยาตามวิธีการที่เปิดเผย การเผาโทเคนที่ได้รับผลกระทบจะเกิดขึ้นหลังการแก้ไขเยียวยาเสร็จสิ้นเท่านั้น',
        },
      },
    ],
  },
  {
    id: 'redemption-process',
    title: { en: 'Redemption, fees and timelines', th: 'การแลกคืน ค่าธรรมเนียม และระยะเวลา' },
    icon: 'Recycle',
    items: [
      {
        q: { en: 'What is the minimum redemption amount?', th: 'จำนวนขั้นต่ำในการแลกคืนคือเท่าใด' },
        a: {
          en: 'A minimum of 100 REC Tokens per request. Holders below this threshold cannot submit a redemption or retirement request directly.',
          th: 'ขั้นต่ำ 100 REC Token ต่อคำขอ ผู้ถือที่มีโทเคนน้อยกว่าจำนวนนี้ไม่สามารถส่งคำขอแลกคืนหรือไถ่ถอนได้โดยตรง',
        },
      },
      {
        q: { en: 'What are the three redemption options?', th: 'ตัวเลือกการแลกคืนทั้งสามแบบมีอะไรบ้าง' },
        a: {
          en: 'Option 1: receive the I-REC in your REDEX account without retirement (legal entities only). Option 2: retire the I-REC under your legal entity and receive an official retirement certificate. Option 3: have BlockEdge retire the I-REC on behalf of an individual, with the individual’s name recorded in the retirement purpose field.',
          th: 'ตัวเลือก 1: รับ I-REC ในบัญชี REDEX โดยไม่ไถ่ถอน (นิติบุคคลเท่านั้น) ตัวเลือก 2: ไถ่ถอน I-REC ในนามนิติบุคคลและรับใบรับรองการไถ่ถอนอย่างเป็นทางการ ตัวเลือก 3: ให้ BlockEdge ไถ่ถอน I-REC ในนามบุคคลธรรมดา โดยบันทึกชื่อบุคคลนั้นในช่องวัตถุประสงค์การไถ่ถอน',
        },
      },
      {
        q: { en: 'How long does redemption take?', th: 'การแลกคืนใช้เวลานานเท่าใด' },
        a: {
          en: 'Verification is completed within 3-14 business days. Transfer to a designated REDEX account is completed within 7 business days after all information and destination details are complete. Retirement and evidence issuance take 3-14 business days. The total period from a valid complete request to completion does not exceed 30 business days.',
          th: 'การทวนสอบเสร็จภายใน 3-14 วันทำการ การโอนไปยังบัญชี REDEX ที่กำหนดเสร็จภายใน 7 วันทำการหลังจากข้อมูลและรายละเอียดปลายทางครบถ้วน การไถ่ถอนและการออกหลักฐานใช้เวลา 3-14 วันทำการ ระยะเวลารวมตั้งแต่คำขอที่ถูกต้องครบถ้วนจนเสร็จสิ้นไม่เกิน 30 วันทำการ',
        },
      },
      {
        q: { en: 'Are there fees?', th: 'มีค่าธรรมเนียมหรือไม่' },
        a: {
          en: 'Redemption may involve third-party fees, including REDEX platform fees and I-REC registry fees. These are borne directly by the token holder and must be settled before execution. BlockEdge may update applicable fees with advance notice through official channels.',
          th: 'การแลกคืนอาจมีค่าธรรมเนียมจากบุคคลที่สาม รวมถึงค่าธรรมเนียมแพลตฟอร์ม REDEX และค่าธรรมเนียมทะเบียน I-REC ซึ่งผู้ถือโทเคนเป็นผู้รับผิดชอบโดยตรงและต้องชำระก่อนดำเนินการ BlockEdge อาจปรับปรุงค่าธรรมเนียมที่เกี่ยวข้องโดยแจ้งล่วงหน้าผ่านช่องทางอย่างเป็นทางการ',
        },
      },
      {
        q: { en: 'Can I cancel a redemption request?', th: 'ยกเลิกคำขอแลกคืนได้หรือไม่' },
        a: {
          en: 'Yes. Before the burn is executed, BlockEdge discloses the allocated asset details and the holder may cancel without penalty. After the holder confirms and the burn is executed, the process is final and irreversible.',
          th: 'ได้ ก่อนดำเนินการเผาโทเคน BlockEdge จะเปิดเผยรายละเอียดสินทรัพย์ที่จัดสรร และผู้ถือสามารถยกเลิกได้โดยไม่มีค่าปรับ หลังจากผู้ถือยืนยันและดำเนินการเผาโทเคนแล้ว กระบวนการถือเป็นที่สิ้นสุดและไม่สามารถย้อนกลับได้',
        },
      },
      {
        q: { en: 'What is the appeals process?', th: 'กระบวนการอุทธรณ์เป็นอย่างไร' },
        a: {
          en: 'If a functional usability issue arises after confirmation - such as an ESG eligibility concern, regulatory limitation or registry technical issue - the holder may appeal within 14 days with transaction details, a description of the issue and supporting documents. BlockEdge responds within 7 days of a complete appeal. Personal preference or a change of mind after a confirmed burn is not covered.',
          th: 'หากเกิดปัญหาที่กระทบต่อการใช้งานตามวัตถุประสงค์หลังการยืนยัน เช่น ข้อกังวลเกี่ยวกับคุณสมบัติในการใช้สำหรับ ESG ข้อจำกัดทางกฎระเบียบ หรือปัญหาทางเทคนิคของทะเบียน ผู้ถือสามารถอุทธรณ์ภายใน 14 วัน พร้อมรายละเอียดธุรกรรม คำอธิบายปัญหา และเอกสารสนับสนุน BlockEdge จะตอบกลับภายใน 7 วันนับจากได้รับคำอุทธรณ์ที่ครบถ้วน ทั้งนี้ไม่ครอบคลุมความชอบส่วนตัวหรือการเปลี่ยนใจหลังจากยืนยันและเผาโทเคนแล้ว',
        },
      },
    ],
  },
  {
    id: 'market-custody',
    title: { en: 'Market, custody and legal', th: 'ตลาด การดูแลทรัพย์สิน และกฎหมาย' },
    icon: 'Landmark',
    items: [
      {
        q: { en: 'Where can I buy or sell REC Tokens?', th: 'ซื้อหรือขาย REC Token ได้ที่ไหน' },
        a: {
          en: 'REC Tokens are not offered in a primary market by the Company. Trading takes place on authorised digital asset exchanges through their order-matching systems. The token can also be swapped on-chain on Optimism through this site’s swap interface. Bitkub listing is announced through official channels.',
          th: 'บริษัทไม่ได้เสนอขาย REC Token ในตลาดแรก การซื้อขายเกิดขึ้นบนศูนย์ซื้อขายสินทรัพย์ดิจิทัลที่ได้รับอนุญาตผ่านระบบจับคู่คำสั่งของศูนย์ซื้อขาย โทเคนยังสามารถแลกเปลี่ยนบนเชน Optimism ผ่านหน้าจอแลกเปลี่ยนของเว็บไซต์นี้ การนำโทเคนเข้าจดทะเบียนบน Bitkub มีการประกาศผ่านช่องทางอย่างเป็นทางการ',
        },
      },
      {
        q: { en: 'How is the price determined?', th: 'ราคาถูกกำหนดอย่างไร' },
        a: {
          en: 'Trading prices arise from exchange order matching and depend on supply, demand, liquidity and market conditions. The underlying I-REC OTC value and platform operating costs are factors the Company may consider when setting sell orders - not a formula, a price floor or a guarantee. The Company plans an initial 300,000-token sell order programme across 50 price levels from THB 10.00 to THB 19.80.',
          th: 'ราคาซื้อขายเกิดจากการจับคู่คำสั่งบนศูนย์ซื้อขาย และขึ้นอยู่กับอุปทาน อุปสงค์ สภาพคล่อง และสภาวะตลาด มูลค่า I-REC อ้างอิงในตลาด OTC และต้นทุนการดำเนินงานของแพลตฟอร์มเป็นปัจจัยที่บริษัทอาจใช้พิจารณาเมื่อตั้งคำสั่งขาย ไม่ใช่สูตร ราคาขั้นต่ำ หรือการรับประกัน บริษัทวางแผนโครงการตั้งคำสั่งขายเริ่มต้น 300,000 โทเคนใน 50 ระดับราคา ตั้งแต่ 10.00 ถึง 19.80 บาท',
        },
      },
      {
        q: { en: 'Who holds the underlying I-RECs?', th: 'ใครถือ I-REC อ้างอิง' },
        a: {
          en: 'I-RECs are held or recorded in an account opened in the name of BlockEdge and operated through REDEX and ReHash. REDEX, ReHash and Evident do not act as independent custodians for token holders. The assets are not held in trust or in a segregated insolvency-remote account, so holders may rank as unsecured creditors if BlockEdge becomes insolvent.',
          th: 'I-REC ถูกถือครองหรือบันทึกไว้ในบัญชีที่เปิดในนาม BlockEdge และดำเนินการผ่าน REDEX และ ReHash REDEX, ReHash และ Evident ไม่ได้ทำหน้าที่เป็นผู้ดูแลทรัพย์สินอิสระให้แก่ผู้ถือโทเคน สินทรัพย์ไม่ได้อยู่ในทรัสต์หรือบัญชีแยกที่ได้รับการคุ้มครองจากภาวะล้มละลาย ดังนั้น ผู้ถืออาจมีสถานะเป็นเจ้าหนี้ไม่มีหลักประกันหาก BlockEdge ล้มละลาย',
        },
      },
      {
        q: { en: 'Is the token a security or an investment product?', th: 'โทเคนเป็นหลักทรัพย์หรือผลิตภัณฑ์ลงทุนหรือไม่' },
        a: {
          en: 'REC Token is a utility token designed for the management and verification of Renewable Energy Certificates. It is not a financial instrument and is not intended for speculative purposes. It provides no guarantee of dividends, returns or profits. Purchasing digital tokens involves risk, including total loss of funds.',
          th: 'REC Token เป็นยูทิลิตี้โทเคนที่ออกแบบสำหรับการจัดการและทวนสอบใบรับรองพลังงานหมุนเวียน ไม่ใช่เครื่องมือทางการเงินและไม่ได้มุ่งหมายเพื่อการเก็งกำไร ไม่มีการรับประกันเงินปันผล ผลตอบแทน หรือกำไร การซื้อโทเคนดิจิทัลมีความเสี่ยง รวมถึงการสูญเสียเงินทั้งหมด',
        },
      },
      {
        q: { en: 'Which law governs disputes?', th: 'ข้อพิพาทอยู่ภายใต้กฎหมายใด' },
        a: {
          en: 'The laws of the Kingdom of Thailand. Disputes are resolved through the courts of competent jurisdiction in Thailand or arbitration under Thai law.',
          th: 'กฎหมายของราชอาณาจักรไทย ข้อพิพาทระงับโดยศาลที่มีเขตอำนาจในประเทศไทยหรือโดยอนุญาโตตุลาการภายใต้กฎหมายไทย',
        },
      },
    ],
  },
  {
    id: 'wallet-technical',
    title: { en: 'Wallet and technical', th: 'กระเป๋าและข้อมูลทางเทคนิค' },
    icon: 'Wallet',
    items: [
      {
        q: { en: 'Which wallets are supported?', th: 'รองรับกระเป๋าแบบใด' },
        a: {
          en: 'Any injected EIP-1193 wallet works; MetaMask is the primary supported wallet. The site can read balances without connecting a wallet using the public address lookup. REC Tokens are ERC-20 compatible and can be held in any wallet that supports ERC-20 on the relevant network.',
          th: 'รองรับกระเป๋า EIP-1193 แบบ injected โดย MetaMask เป็นกระเป๋าหลักที่รองรับ เว็บไซต์สามารถอ่านยอดคงเหลือผ่านการค้นหาที่อยู่สาธารณะได้โดยไม่ต้องเชื่อมต่อกระเป๋า REC Token เข้ากันได้กับมาตรฐาน ERC-20 และสามารถถือครองในกระเป๋าที่รองรับ ERC-20 บนเครือข่ายที่เกี่ยวข้อง',
        },
      },
      {
        q: { en: 'Which network should I use?', th: 'ควรใช้เครือข่ายใด' },
        a: {
          en: 'The primary deployment is ThaiFi (chain ID 17). REC also exists on Optimism and Kubchain for bridged liquidity. Always check the network before transferring: sending on the wrong network can result in permanent loss. Cross-chain addresses do not imply automatic cross-chain transfers.',
          th: 'การติดตั้งใช้งานหลักอยู่บน ThaiFi (chain ID 17) REC ยังมีอยู่บน Optimism และ Kubchain เพื่อรองรับสภาพคล่องที่โอนข้ามเชน ตรวจสอบเครือข่ายก่อนโอนทุกครั้ง: การส่งผิดเครือข่ายอาจทำให้สูญเสียอย่างถาวร การมีที่อยู่บนหลายเชนไม่ได้หมายความว่าจะโอนข้ามเชนโดยอัตโนมัติ',
        },
      },
      {
        q: { en: 'Can I transfer tokens to another wallet?', th: 'โอนโทเคนไปยังกระเป๋าอื่นได้หรือไม่' },
        a: {
          en: 'Yes. REC Tokens are ERC-20 compatible and may be transferred peer-to-peer between standard wallets, subject to applicable law, exchange rules, security measures and emergency procedures. If a transaction is not yet confirmed or is cancelled before confirmation, the asset remains under your ownership.',
          th: 'ได้ REC Token เข้ากันได้กับมาตรฐาน ERC-20 และสามารถโอนระหว่างกระเป๋ามาตรฐานแบบบุคคลต่อบุคคลได้ ภายใต้กฎหมายที่ใช้บังคับ กฎของศูนย์ซื้อขาย มาตรการความปลอดภัย และขั้นตอนฉุกเฉิน หากธุรกรรมยังไม่ได้รับการยืนยันหรือถูกยกเลิกก่อนยืนยัน สินทรัพย์ยังคงเป็นกรรมสิทธิ์ของคุณ',
        },
      },
      {
        q: { en: 'What happens if I send tokens to the wrong network?', th: 'หากส่งโทเคนผิดเครือข่ายจะเป็นอย่างไร' },
        a: {
          en: 'Assets sent on an unsupported network or to the wrong contract may be unrecoverable. BlockEdge cannot reverse on-chain transfers. If you are unsure, verify the contract address and network in the contract registry before sending.',
          th: 'สินทรัพย์ที่ส่งบนเครือข่ายที่ไม่รองรับหรือไปยังสัญญาที่ผิดอาจกู้คืนไม่ได้ BlockEdge ไม่สามารถย้อนธุรกรรมบนเชนได้ หากไม่แน่ใจ โปรดตรวจสอบที่อยู่สัญญาและเครือข่ายในทะเบียนสัญญาก่อนส่ง',
        },
      },
    ],
  },
  {
    id: 'transparency',
    title: { en: 'Reports and transparency', th: 'รายงานและความโปร่งใส' },
    icon: 'Activity',
    items: [
      {
        q: { en: 'Where can I see live supply and retirement data?', th: 'ดูข้อมูลจำนวนโทเคนและการไถ่ถอนแบบเรียลไทม์ได้ที่ไหน' },
        a: {
          en: 'The live dashboard reads ThaiFi and public chain data directly: pool token supply, bridged balances, total retired and project-level supplies. Values are read-only and may change between page load and your read.',
          th: 'แดชบอร์ดเรียลไทม์อ่านข้อมูลจาก ThaiFi และเชนสาธารณะโดยตรง ได้แก่ จำนวนพูลโทเคน ยอดโทเคนที่โอนข้ามเชน ยอดไถ่ถอนรวม และจำนวนโทเคนรายโครงการ ค่าที่แสดงอ่านได้อย่างเดียวและอาจเปลี่ยนแปลงตั้งแต่โหลดหน้าเว็บจนถึงเวลาที่คุณอ่าน',
        },
      },
      {
        q: { en: 'How often are reports published?', th: 'รายงานเผยแพร่บ่อยเพียงใด' },
        a: {
          en: 'Portfolio reports are published monthly, typically within 7 business days after month end. They cover token supply and circulation, asset composition by project and vintage, redemption and retirement activity, bridge operations and reconciliation status.',
          th: 'รายงานพอร์ตเผยแพร่รายเดือน โดยปกติภายใน 7 วันทำการหลังสิ้นเดือน ครอบคลุมจำนวนโทเคนและการหมุนเวียนของโทเคน องค์ประกอบสินทรัพย์ตามโครงการและวินเทจ กิจกรรมแลกคืนและไถ่ถอน การดำเนินงานสะพานข้ามเชน และสถานะการกระทบยอด',
        },
      },
      {
        q: { en: 'Can I verify a specific project certificate?', th: 'ตรวจสอบใบรับรองของโครงการเฉพาะได้หรือไม่' },
        a: {
          en: 'Yes. Each project page links to a REDEX origin-check record for the certificate range. Project metadata also includes the I-REC project ID, province, technology, standard and vintage.',
          th: 'ได้ หน้าโครงการแต่ละหน้ามีลิงก์ไปยังบันทึกตรวจสอบแหล่งกำเนิดของ REDEX สำหรับช่วงใบรับรอง ข้อมูลโครงการยังรวมรหัสโครงการ I-REC จังหวัด เทคโนโลยี มาตรฐาน และวินเทจ',
        },
      },
    ],
  },
];
