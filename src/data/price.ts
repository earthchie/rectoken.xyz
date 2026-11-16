export const PRICE_PAGE = {
  title: 'REC Token price',
  subtitle: 'Historical REC Token price charts and the underlying I-REC assessment.',
  callout: 'REC Tokens are backed by REC Hydro from Vietnam - generated from hydropower renewable energy projects.',
  charts: [
    {
      title: 'REC Price 2025',
      description: 'REC Token price trend for 2025',
      src: '/price/Price2025_0.png',
      alt: 'REC Token price chart for 2025',
    },
    {
      title: 'REC Price 2024',
      description: 'REC Token price trend for 2024',
      src: '/price/Price2024_0.png',
      alt: 'REC Token price chart for 2024',
    },
  ],
};

export const PRICE_TH = {
  title: 'ราคา REC Token',
  subtitle: 'กราฟราคาย้อนหลังของ REC Token และการประเมินราคา I-REC อ้างอิง',
  callout: 'REC Token มีใบรับรอง REC จากโครงการผลิตไฟฟ้าพลังน้ำในเวียดนามเป็นสินทรัพย์อ้างอิง',
  charts: [
    { title: 'ราคา REC ปี 2025', description: 'แนวโน้มราคา REC Token ปี 2025' },
    { title: 'ราคา REC ปี 2024', description: 'แนวโน้มราคา REC Token ปี 2024' },
  ],
};

/** Transcribed from the published S&P Global Energy assessment image (3 Mar 2026). */
export const ASSESSMENT = {
  title: 'I-REC price assessments',
  date: '3 March 2026',
  source: 'S&P Global Energy',
  note:
    'Values are USD/MWh unless stated. Transcribed from the published assessment sheet; the image version is available below. “Suspended” means no assessment was published.',
  columns: ['Country', 'Unit', 'Solar v2024', 'Solar v2025', 'Wind v2024', 'Wind v2025', 'Hydro v2024', 'Hydro v2025', 'Biomass v2024', 'Biomass v2025'],
  rows: [
    ['Vietnam', 'USD/MWh', '0.18', '0.31', '0.18', '0.31', '0.03', '0.11', '0.07', '0.12'],
    ['India', 'USD/MWh', '0.19', '0.50', '0.19', '0.50', 'Suspended', 'Suspended', '-', '-'],
    ['Malaysia', 'USD/MWh', '1.78', '3.49', '-', '-', '1.08', '1.23', '0.95', '1.38'],
    ['Thailand', 'USD/MWh', '0.37', '0.53', '-', '-', '0.43', '0.48', '0.37', '0.47'],
  ],
  singapore: {
    title: 'Singapore - solar',
    columns: ['Country', 'Unit', 'Previous year', 'Current year', 'Year +1', 'Year +2'],
    rows: [
      ['Singapore', 'USD/MWh', '3.111', '20.219', '27.996', '28.774'],
      ['', 'SGD/MWh', '4.00', '26.00', '36.00', '37.00'],
    ],
  },
  openPrice: {
    label: 'Token trading open price',
    value: 'THB 40 (USD 1.176) / token',
    note: 'Present on the 2024 assessment sheet only.',
  },
};

export const ASSESSMENT_TH = {
  title: 'การประเมินราคา I-REC',
  date: '3 มีนาคม 2026',
  note:
    'ราคาแสดงเป็น USD/MWh เว้นแต่จะระบุหน่วยอื่น ข้อมูลถอดจากเอกสารประเมินราคาที่เผยแพร่ โดยมีภาพต้นฉบับด้านล่าง “Suspended” หมายถึงไม่มีการเผยแพร่ราคาประเมิน',
  columns: ['ประเทศ', 'หน่วย', 'โซลาร์ v2024', 'โซลาร์ v2025', 'ลม v2024', 'ลม v2025', 'พลังน้ำ v2024', 'พลังน้ำ v2025', 'ชีวมวล v2024', 'ชีวมวล v2025'],
  singaporeTitle: 'สิงคโปร์ - โซลาร์',
  openLabel: 'ราคาเปิดซื้อขายโทเคน',
};

export const CNERG = {
  title: 'CnerG price index',
  body:
    'Track REC and carbon credit prices across global markets with interactive charts. Monitor market trends by country, fuel type, product category and vintage.',
  tags: ['I-REC', 'US-REC', 'K-REC', 'Carbon credits'],
  features: [
    { title: 'Multi-country', body: 'Track prices across global markets' },
    { title: 'Interactive charts', body: 'Build custom price trend analysis' },
    { title: 'Real-time data', body: 'Live market pricing updates' },
    { title: 'Project-level', body: 'Filter by specific projects' },
  ],
};

export const CNERG_TH = {
  title: 'ดัชนีราคา CnerG',
  body:
    'ติดตามราคา REC และคาร์บอนเครดิตในตลาดทั่วโลกผ่านกราฟแบบโต้ตอบ พร้อมดูแนวโน้มแยกตามประเทศ ประเภทพลังงาน ประเภทผลิตภัณฑ์ และวินเทจ',
  tags: ['I-REC', 'US-REC', 'K-REC', 'คาร์บอนเครดิต'],
  features: [
    { title: 'หลายประเทศ', body: 'ติดตามราคาในตลาดโลก' },
    { title: 'กราฟโต้ตอบ', body: 'วิเคราะห์แนวโน้มราคาตามที่ต้องการ' },
    { title: 'ข้อมูลเรียลไทม์', body: 'ติดตามราคาในตลาดที่อัปเดตแบบเรียลไทม์' },
    { title: 'ระดับโครงการ', body: 'กรองข้อมูลตามโครงการที่ต้องการ' },
  ],
};
