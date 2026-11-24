import { SITE } from './site';

export type Bi = { en: string; th: string };

export type ReportRow = {
  label: Bi;
  value: string;
  unit?: string;
  emphasis?: boolean;
  note?: Bi;
};

export const REPORT_MAY_2026 = {
  slug: 'may-2026',
  period: { en: 'May 2026', th: 'พฤษภาคม 2026' },
  title: { en: 'REC Portfolio Report', th: 'รายงานพอร์ต REC' },
  kicker: { en: 'Proof of Reserves Report', th: 'รายงานยืนยันปริมาณ REC สำรอง (Proof of Reserves Report)' },
  lede: {
    en: 'Reserve reconciliation of REC tokens against I-REC inventory held on REHASH.',
    th: 'การกระทบยอดโทเคน REC กับรายการ I-REC คงคลังที่ถืออยู่บน REHASH',
  },
  status: { en: 'PASS', th: 'ผ่าน' },
  published: '2026-05-31',
  dataCutoff: { en: 'Data as of 19 May 2026', th: 'ข้อมูล ณ วันที่ 19 พฤษภาคม 2026' },
  movementNote: { en: '', th: '' },
  meta: [
    {
      label: { en: 'Reporting date', th: 'วันที่รายงาน' },
      value: { en: 'May 2026', th: 'พฤษภาคม 2026' },
    },
    {
      label: { en: 'Prepared for', th: 'จัดทำสำหรับ' },
      value: {
        en: 'REC Tokenization Project stakeholders',
        th: 'ผู้มีส่วนได้ส่วนเสียของโครงการ REC Tokenization',
      },
    },
    {
      label: { en: 'Registry platform', th: 'แพลตฟอร์มทะเบียน' },
      value: { en: 'REHASH', th: 'REHASH' },
    },
    {
      label: { en: 'Token supply reference', th: 'แหล่งอ้างอิงจำนวนโทเคน' },
      value: { en: 'RECTOKEN public dashboard at rectoken.xyz', th: 'แดชบอร์ดสาธารณะ RECTOKEN ที่ rectoken.xyz' },
    },
    {
      label: { en: 'Reserve asset type', th: 'ประเภทสินทรัพย์สำรอง' },
      value: { en: 'Renewable Energy Certificates (RECs / I-RECs)', th: 'ใบรับรองพลังงานหมุนเวียน (REC / I-REC)' },
    },
    {
      label: { en: 'Unit of account', th: 'หน่วยนับ' },
      value: { en: '1 REC = 1 MWh of renewable electricity attribute', th: '1 REC = 1 MWh ของคุณลักษณะไฟฟ้าหมุนเวียน' },
    },
  ],
  metrics: [
    {
      label: { en: 'Total REC balance on REHASH', th: 'ยอด REC รวมบน REHASH' },
      value: '1,453,422.4410',
      unit: 'MWh',
      tone: 'brand',
    },
    {
      label: { en: 'Tokenized REC supply', th: 'จำนวนโทเคน REC ที่ออก' },
      value: '1,453,422.4410',
      unit: 'REC',
      tone: 'brand',
    },
    {
      label: { en: 'Reserve surplus', th: 'สินทรัพย์สำรองส่วนเกิน' },
      value: '0.0000',
      unit: 'MWh',
      tone: 'info',
    },
    {
      label: { en: 'Reserve coverage ratio', th: 'อัตราความครอบคลุมของสินทรัพย์สำรอง' },
      value: '100.0000',
      unit: '%',
      tone: 'pass',
    },
  ],
  summary: {
    paragraphs: [
      {
        en: 'This Proof of Reserves Report has been prepared to demonstrate that the REC tokens issued under the REC Tokenization Project are backed by Renewable Energy Certificates held on the REHASH platform.',
        th: 'รายงานยืนยันปริมาณ REC สำรอง (Proof of Reserves Report) ฉบับนี้จัดทำขึ้นเพื่อแสดงว่าโทเคน REC ที่ออกภายใต้โครงการ REC Tokenization มีใบรับรองพลังงานหมุนเวียนที่ถืออยู่บนแพลตฟอร์ม REHASH เป็นสินทรัพย์รองรับ',
      },
      {
        en: 'As of May 2026, the REC Tokenization Project reports the following position:',
        th: 'ณ เดือนพฤษภาคม 2026 โครงการ REC Tokenization รายงานสถานะดังต่อไปนี้',
      },
    ],
    rows: [
      {
        label: { en: 'Total REC balance on REHASH', th: 'ยอด REC รวมบน REHASH' },
        value: '1,453,422.4410',
        unit: 'MWh',
      },
      {
        label: { en: 'Available REC balance on REHASH', th: 'ยอด REC ที่พร้อมใช้งานบน REHASH' },
        value: '1,453,422.4410',
        unit: 'MWh',
      },
      {
        label: { en: 'REC on retirement on REHASH', th: 'REC ที่อยู่ระหว่างการไถ่ถอนบน REHASH' },
        value: '0.0000',
        unit: 'MWh',
      },
      {
        label: { en: 'Total REC tokenized reported on RECTOKEN.XYZ', th: 'ยอด REC ที่แปลงเป็นโทเคนทั้งหมดตามรายงานบน RECTOKEN.XYZ' },
        value: '1,453,422.4410',
        unit: 'REC',
        emphasis: true,
      },
      {
        label: { en: 'Total retired tokens reported on RECTOKEN.XYZ', th: 'ยอดโทเคนที่ไถ่ถอนแล้วทั้งหมดตามรายงานบน RECTOKEN.XYZ' },
        value: '322.5101',
        unit: 'REC',
      },
    ] as ReportRow[],
    conclusion: {
      en: 'Based on the reviewed REHASH reserve data and the public RECTOKEN dashboard, the reported tokenized REC supply does not exceed the REC balance held on REHASH.',
      th: 'จากการตรวจสอบข้อมูลสินทรัพย์สำรองบน REHASH และแดชบอร์ดสาธารณะของ RECTOKEN พบว่าจำนวนโทเคน REC ที่รายงานไม่เกินยอด REC ที่ถืออยู่บน REHASH',
    },
    websiteNote: {
      en: 'The public RECTOKEN website describes the project as a platform that bridges traditional carbon markets with blockchain technology and states that each token is backed by verified Renewable Energy Certificates from certified renewable energy projects.',
      th: 'เว็บไซต์สาธารณะของ RECTOKEN อธิบายว่าโครงการเป็นแพลตฟอร์มที่เชื่อมตลาดคาร์บอนแบบดั้งเดิมกับเทคโนโลยีบล็อกเชน และระบุว่าแต่ละโทเคนมีใบรับรองพลังงานหมุนเวียนที่ผ่านการตรวจสอบจากโครงการพลังงานหมุนเวียนที่ได้รับการรับรองเป็นสินทรัพย์รองรับ',
    },
  },
  scope: {
    intro: {
      en: 'This report covers the reserve position of REC tokens as of May 2026. The review is limited to the following information sources:',
      th: 'รายงานนี้ครอบคลุมสถานะสินทรัพย์สำรองของโทเคน REC ณ เดือนพฤษภาคม 2026 โดยการตรวจสอบจำกัดอยู่เฉพาะแหล่งข้อมูลต่อไปนี้',
    },
    sources: [
      {
        en: 'REHASH inventory data exported as of 19 May 2026.',
        th: 'ข้อมูลสินค้าคงคลังจาก REHASH ที่ส่งออก ณ วันที่ 19 พฤษภาคม 2026',
      },
      {
        en: 'RECTOKEN public dashboard, available at rectoken.xyz.',
        th: 'แดชบอร์ดสาธารณะ RECTOKEN ที่ rectoken.xyz',
      },
    ],
    disclaimer: {
      en: 'This report does not constitute a financial audit, legal opinion, assurance engagement, securities opinion, or certification of the technical correctness of any smart contract. It is a reserve reconciliation report based on the available records.',
      th: 'รายงานนี้ไม่ถือเป็นการตรวจสอบบัญชีทางการเงิน ความเห็นทางกฎหมาย งานให้ความเชื่อมั่น ความเห็นด้านหลักทรัพย์ หรือการรับรองความถูกต้องทางเทคนิคของสัญญาอัจฉริยะใด ๆ แต่เป็นรายงานการกระทบยอดสินทรัพย์สำรองที่อ้างอิงจากบันทึกที่มีอยู่',
    },
  },
  reserve: {
    intro: {
      en: 'The underlying reserve assets are Renewable Energy Certificates recorded on the REHASH platform. Based on the REHASH inventory export, the reserve consists of:',
      th: 'สินทรัพย์ที่ใช้เป็นทุนสำรองคือใบรับรองพลังงานหมุนเวียนที่บันทึกบนแพลตฟอร์ม REHASH ตามไฟล์ข้อมูลสินค้าคงคลังที่ส่งออกจาก REHASH สินทรัพย์สำรองประกอบด้วย',
    },
    attributes: [
      { label: { en: 'REC owner', th: 'เจ้าของ REC' }, value: { en: 'Block Edge Company Limited', th: 'บริษัท บล็อก เอดจ์ จำกัด' } },
      { label: { en: 'Fuel type', th: 'ประเภทเชื้อเพลิง' }, value: { en: 'Hydro', th: 'พลังน้ำ' } },
      { label: { en: 'Country', th: 'ประเทศ' }, value: { en: 'Viet Nam', th: 'เวียดนาม' } },
      { label: { en: 'Vintage years', th: 'ปีวินเทจ' }, value: { en: '2024', th: '2024' } },
      { label: { en: 'Inventory line items', th: 'รายการสินค้าคงคลัง' }, value: { en: '23', th: '23' } },
      { label: { en: 'Total REC balance', th: 'ยอด REC รวม' }, value: { en: '1,453,422.4410 MWh', th: '1,453,422.4410 MWh' } },
      { label: { en: 'Available balance', th: 'ยอดคงเหลือที่พร้อมใช้งาน' }, value: { en: '1,453,422.4410 MWh', th: '1,453,422.4410 MWh' } },
      { label: { en: 'REC on retirement', th: 'REC ที่อยู่ระหว่างไถ่ถอน' }, value: { en: '0.0000 MWh', th: '0.0000 MWh' } },
    ],
    vintageTitle: { en: 'Vintage breakdown', th: 'แยกตามปีวินเทจ' },
    vintages: [
      { label: '2024', value: '1,453,422.4410', unit: 'MWh', percent: 100 },
    ],
    total: { label: { en: 'Total', th: 'รวม' }, value: '1,453,422.4410', unit: 'MWh' },
  },
  supply: {
    intro: {
      en: 'According to the RECTOKEN dashboard as of May 2026:',
      th: 'ตามแดชบอร์ด RECTOKEN ณ เดือนพฤษภาคม 2026',
    },
    rows: [
      {
        label: { en: 'Total REC tokenized', th: 'ยอด REC ที่แปลงเป็นโทเคนทั้งหมด' },
        value: '1,453,422.4410',
        unit: 'REC',
        emphasis: true,
      },
      {
        label: { en: 'RECTOKEN pool balance', th: 'ยอดคงเหลือในพูล RECTOKEN' },
        value: '1,453,422.4410',
        unit: 'REC',
      },
      {
        label: { en: 'Bridged to Optimism', th: 'โอนข้ามเชนไป Optimism' },
        value: '0.0000',
        unit: 'REC',
      },
      {
        label: { en: 'Bridged to Kubchain', th: 'โอนข้ามเชนไป Kubchain' },
        value: '0.0000',
        unit: 'REC',
      },
      {
        label: { en: 'Total retired', th: 'ไถ่ถอนแล้วทั้งหมด' },
        value: '322.5101',
        unit: 'REC',
        note: {
          en: 'Reported separately from active tokenized supply.',
          th: 'รายงานแยกจากจำนวนโทเคนที่ใช้งานอยู่',
        },
      },
    ] as ReportRow[],
    compositionTitle: { en: 'Active tokenized supply by venue', th: 'จำนวนโทเคนที่ใช้งานอยู่แยกตามช่องทาง' },
    composition: [
      { label: { en: 'RECTOKEN pool', th: 'พูล RECTOKEN' }, value: '1,453,422.4410', percent: 100 },
      { label: { en: 'Kubchain', th: 'Kubchain' }, value: '0.0000', percent: 0 },
      { label: { en: 'Optimism', th: 'Optimism' }, value: '0.0000', percent: 0 },
    ],
    note: {
      en: 'The dashboard describes tokenized supply as individual REC tokens from renewable energy projects before pooling, and separately reports pooled, bridged and retired balances.',
      th: 'แดชบอร์ดอธิบายว่าจำนวนโทเคนที่ออกหมายถึงโทเคน REC แต่ละรายการจากโครงการพลังงานหมุนเวียนก่อนนำมารวมในพูล และรายงานยอดคงเหลือในพูล ยอดที่โอนข้ามเชน และยอดที่ไถ่ถอนแล้วแยกต่างหาก',
    },
    retiredNote: {
      en: 'The 322.5101 REC retired balance is not part of active circulating supply.',
      th: 'ยอดที่ไถ่ถอนแล้ว 322.5101 REC ไม่นับรวมในจำนวนโทเคนที่ยังหมุนเวียนอยู่',
    },
  },
  reconciliation: {
    test: {
      en: 'Tokenized REC supply must be less than or equal to the REC balance held on REHASH.',
      th: 'จำนวนโทเคน REC ที่ออกต้องน้อยกว่าหรือเท่ากับยอด REC ที่ถืออยู่บน REHASH',
    },
    rows: [
      {
        label: { en: 'Total REC balance on REHASH', th: 'ยอด REC รวมบน REHASH' },
        value: '1,453,422.4410',
        unit: 'MWh',
      },
      {
        label: { en: 'Total REC tokenized on RECTOKEN', th: 'ยอด REC ที่แปลงเป็นโทเคนบน RECTOKEN' },
        value: '1,453,422.4410',
        unit: 'REC',
      },
      {
        label: { en: 'Reserve surplus', th: 'สินทรัพย์สำรองส่วนเกิน' },
        value: '0.0000',
        unit: 'MWh',
        emphasis: true,
      },
    ] as ReportRow[],
    result: { en: 'PASS', th: 'ผ่าน' },
    conclusion: {
      en: 'The reported tokenized REC supply equals the total REC balance held on REHASH.',
      th: 'จำนวนโทเคน REC ที่รายงานเท่ากับยอด REC รวมที่ถืออยู่บน REHASH',
    },
  },
  coverage: {
    formulaLabel: { en: 'Total REHASH balance / tokenized supply', th: 'ยอดรวมบน REHASH / จำนวนโทเคนที่ออก' },
    numerator: '1,453,422.4410',
    denominator: '1,453,422.4410',
    ratio: '100.0000',
    conclusion: {
      en: 'The reserve balance on REHASH matches the reported tokenized REC supply. The project therefore has a reserve coverage ratio of 100.0000%.',
      th: 'ยอดสำรองบน REHASH เท่ากับจำนวนโทเคน REC ที่รายงาน โครงการจึงมีอัตราความครอบคลุมของสินทรัพย์สำรอง 100.0000%',
    },
  },
  retirement: {
    paragraphs: [
      {
        en: 'The REHASH inventory records 0.0000 MWh as "On Retirement." For reserve reconciliation purposes, this amount is treated separately from freely available inventory, but remains part of the reported reserve balance at the reporting date.',
        th: 'ข้อมูลสินค้าคงคลังของ REHASH บันทึกจำนวน 0.0000 MWh ว่า "อยู่ระหว่างไถ่ถอน" ในการกระทบยอดสินทรัพย์สำรอง จำนวนนี้แยกจากสินค้าคงคลังที่สามารถใช้ได้อย่างอิสระ แต่ยังคงรวมอยู่ในยอดสำรองที่รายงาน ณ วันที่รายงาน',
      },
      {
        en: 'The RECTOKEN dashboard reports 322.5101 REC as permanently retired. This figure is not circulating supply. It represents REC tokens that have already been removed from active circulation through the retirement process.',
        th: 'แดชบอร์ด RECTOKEN รายงานจำนวน 322.5101 REC ว่าไถ่ถอนถาวรแล้ว ตัวเลขนี้ไม่นับเป็นจำนวนโทเคนหมุนเวียน แต่เป็นโทเคน REC ที่นำออกจากการหมุนเวียนผ่านกระบวนการไถ่ถอนแล้ว',
      },
    ],
    cards: [
      {
        label: { en: 'On retirement at REHASH', th: 'อยู่ระหว่างไถ่ถอนบน REHASH' },
        value: '0.0000',
        unit: 'MWh',
        note: { en: 'Included in total REHASH balance', th: 'รวมอยู่ในยอด REHASH ทั้งหมด' },
      },
      {
        label: { en: 'Permanently retired on RECTOKEN', th: 'ไถ่ถอนถาวรบน RECTOKEN' },
        value: '322.5101',
        unit: 'REC',
        note: { en: 'Excluded from active circulating supply', th: 'ไม่นับเป็นจำนวนโทเคนหมุนเวียน' },
      },
    ],
  },
  representations: {
    intro: {
      en: 'As of May 2026, the REC Tokenization Project represents that:',
      th: 'ณ เดือนพฤษภาคม 2026 โครงการ REC Tokenization ขอรับรองว่า',
    },
    items: [
      {
        en: 'REC tokens are issued only against REC inventory recorded on REHASH.',
        th: 'โทเคน REC จะออกได้เฉพาะเมื่อมี REC คงคลังที่บันทึกอยู่บน REHASH รองรับ',
      },
      {
        en: 'The number of REC tokens issued shall not exceed the corresponding REC balance held on REHASH.',
        th: 'จำนวนโทเคน REC ที่ออกต้องไม่เกินยอด REC ที่เกี่ยวข้องซึ่งถืออยู่บน REHASH',
      },
      {
        en: 'Each REC token represents 1 MWh of renewable electricity attribute.',
        th: 'โทเคน REC แต่ละโทเคนแทนคุณลักษณะไฟฟ้าหมุนเวียน 1 MWh',
      },
      {
        en: 'Tokenized REC supply is monitored against REHASH reserve balances.',
        th: 'มีการติดตามจำนวนโทเคน REC ที่ออกเทียบกับยอดสินทรัพย์สำรองบน REHASH',
      },
      {
        en: 'Retired tokens are excluded from active circulating supply and represent renewable energy certificates that have been consumed or redeemed.',
        th: 'โทเคนที่ไถ่ถอนแล้วไม่นับรวมในจำนวนโทเคนที่ยังหมุนเวียนอยู่ และเป็นตัวแทนของใบรับรองพลังงานหมุนเวียนที่ใช้หรือแลกคืนแล้ว',
      },
    ],
    note: {
      en: 'These are project representations. They are not a separate audit opinion or assurance conclusion.',
      th: 'ข้อความเหล่านี้เป็นคำรับรองของโครงการ ไม่ใช่ความเห็นจากการตรวจสอบหรือข้อสรุปจากงานให้ความเชื่อมั่นที่จัดทำแยกต่างหาก',
    },
  },
  findings: {
    items: [
      {
        en: 'The total REHASH REC balance is 1,453,422.4410 MWh.',
        th: 'ยอด REC รวมบน REHASH คือ 1,453,422.4410 MWh',
      },
      {
        en: 'The RECTOKEN dashboard reports total REC tokenized of 1,453,422.4410 REC.',
        th: 'แดชบอร์ด RECTOKEN รายงานยอด REC ที่แปลงเป็นโทเคนรวม 1,453,422.4410 REC',
      },
      {
        en: 'The tokenized REC supply equals the total REC balance held on REHASH.',
        th: 'จำนวนโทเคน REC ที่ออกเท่ากับยอด REC รวมที่ถืออยู่บน REHASH',
      },
      {
        en: 'The available REHASH balance and tokenized REC supply are matched.',
        th: 'ยอดคงเหลือที่พร้อมใช้งานบน REHASH และจำนวนโทเคน REC ที่ออกมีค่าเท่ากัน',
      },
      {
        en: 'No evidence was identified from the reviewed data that the tokenized REC supply exceeds the reserve balance on REHASH.',
        th: 'ไม่พบหลักฐานจากข้อมูลที่ตรวจสอบว่าจำนวนโทเคน REC ที่ออกเกินยอดสำรองบน REHASH',
      },
    ],
  },
  conclusion: {
    paragraphs: [
      {
        en: 'As of May 2026, the REC Tokenization Project satisfies the reserve condition that tokenized REC supply shall always be less than or equal to the REC balance held on the REHASH platform.',
        th: 'ณ เดือนพฤษภาคม 2026 โครงการ REC Tokenization เป็นไปตามเงื่อนไขสินทรัพย์สำรองที่กำหนดให้จำนวนโทเคน REC ที่ออกต้องน้อยกว่าหรือเท่ากับยอด REC ที่ถืออยู่บนแพลตฟอร์ม REHASH เสมอ',
      },
      {
        en: 'Based on the reviewed REHASH inventory export and the RECTOKEN public dashboard, the reported tokenized REC supply is fully backed by REC reserves held on REHASH.',
        th: 'จากการตรวจสอบไฟล์ข้อมูลสินค้าคงคลังที่ส่งออกจาก REHASH และแดชบอร์ดสาธารณะของ RECTOKEN พบว่าจำนวนโทเคน REC ที่รายงานมีสินทรัพย์สำรอง REC ที่ถืออยู่บน REHASH รองรับเต็มจำนวน',
      },
      {
        en: 'The project therefore demonstrates a reserve coverage position of approximately 100.0000% when measured against the total REHASH REC balance.',
        th: 'โครงการจึงแสดงสถานะความครอบคลุมของสินทรัพย์สำรองประมาณ 100.0000% เมื่อเทียบกับยอด REC รวมบน REHASH',
      },
    ],
    tagline: { en: 'Together, we build a greener future.', th: 'ร่วมกันสร้างอนาคตที่เป็นมิตรต่อสิ่งแวดล้อม' },
  },
  footer: {
    sources: [
      { label: 'REHASH', href: SITE.external.rehash },
      { label: { en: 'RECTOKEN dashboard', th: 'แดชบอร์ด RECTOKEN' }, href: '/data' },
    ],
    disclaimer: {
      en: 'Reserve reconciliation report. Not a financial audit, legal opinion, assurance engagement, securities opinion, or smart-contract certification.',
      th: 'รายงานการกระทบยอดสินทรัพย์สำรอง ไม่ใช่การตรวจสอบบัญชี ความเห็นทางกฎหมาย งานให้ความเชื่อมั่น ความเห็นด้านหลักทรัพย์ หรือการรับรองสัญญาอัจฉริยะ',
    },
  },
} ;

export type ReportData = typeof REPORT_MAY_2026;
