import { REPORT_MAY_2026, type ReportData } from './report-may-2026';

type Bi = { en: string; th: string };
type VintageRow = { label: string; value: string; unit: string; percent: number };

type PortfolioSnapshot = {
  total: string;
  tokenized: string;
  available: string;
  onRetirement: string;
  surplus: string;
  coverage: string;
  retiredTokens: string;
  poolBalance: string;
  bridgedOp: string;
  bridgedKub: string;
  lineItems: string;
  vintages: VintageRow[];
  vintageLabel: Bi;
  vintageTitle: Bi;
  showVintageYearsAttribute: boolean;
  walletSource?: Bi;
  policyNote?: Bi;
  reconciliationConclusion: Bi;
  coverageConclusion: Bi;
  retirementNote: Bi;
  retiredNote: Bi;
  findingBalanced: Bi;
  findingMatched: Bi;
};

/**
 * August-October position. The reserve is the 2024 vintage only; earlier
 * vintages are not accounted at all. From August onward the public reports no
 * longer disclose the year and show one legacy reserve line.
 */
const LEGACY_POSITION: PortfolioSnapshot = {
  total: '1,453,422.4410',
  tokenized: '1,453,422.4410',
  available: '1,453,422.4410',
  onRetirement: '0.0000',
  surplus: '0.0000',
  coverage: '100.0000',
  retiredTokens: '322.5101',
  poolBalance: '1,453,422.4410',
  bridgedOp: '0.0000',
  bridgedKub: '0.0000',
  lineItems: '23',
  vintages: [{ label: 'Legacy', value: '1,453,422.4410', unit: 'MWh', percent: 100 }],
  vintageLabel: { en: 'Legacy reserve', th: 'สินทรัพย์สำรองเดิม' },
  vintageTitle: { en: 'Reserve composition', th: 'องค์ประกอบสินทรัพย์สำรอง' },
  showVintageYearsAttribute: false,
  retirementNote: {
    en: 'The RECTOKEN dashboard reports 322.5101 REC as permanently retired. This figure is not circulating supply. It represents REC tokens that have already been removed from active circulation through the retirement process.',
    th: 'แดชบอร์ด RECTOKEN รายงานจำนวน 322.5101 REC ว่าไถ่ถอนถาวรแล้ว ตัวเลขนี้ไม่นับเป็นจำนวนโทเคนหมุนเวียน แต่เป็นโทเคน REC ที่นำออกจากการหมุนเวียนผ่านกระบวนการไถ่ถอนแล้ว',
  },
  retiredNote: {
    en: 'The 322.5101 REC retired balance is not part of active circulating supply.',
    th: 'ยอดที่ไถ่ถอนแล้ว 322.5101 REC ไม่นับรวมในจำนวนโทเคนที่ยังหมุนเวียนอยู่',
  },
  findingBalanced: {
    en: 'The tokenized REC supply equals the legacy reserve balance.',
    th: 'จำนวนโทเคน REC ที่ออกเท่ากับยอดสินทรัพย์สำรองเดิม',
  },
  findingMatched: {
    en: 'The available REHASH balance and tokenized REC supply are matched.',
    th: 'ยอดคงเหลือที่พร้อมใช้งานบน REHASH และจำนวนโทเคน REC ที่ออกมีค่าเท่ากัน',
  },
  reconciliationConclusion: {
    en: 'The reported tokenized REC supply equals the legacy reserve balance held on REHASH.',
    th: 'จำนวนโทเคน REC ที่รายงานเท่ากับยอดสินทรัพย์สำรองเดิมที่ถืออยู่บน REHASH',
  },
  coverageConclusion: {
    en: 'The legacy reserve balance on REHASH matches the reported tokenized REC supply. The reserve coverage ratio is 100.0000%.',
    th: 'ยอดสินทรัพย์สำรองเดิมบน REHASH เท่ากับจำนวนโทเคน REC ที่รายงาน อัตราความครอบคลุมของสินทรัพย์สำรองคือ 100.0000%',
  },
};

/**
 * November 2026 onward. Only the current vintage (2025) is accounted. The
 * earlier-vintage balances are still in the REHASH account but are excluded
 * from the reported reserve under the pool-freshness policy.
 *
 * Reuse this snapshot for later months until the next vintage swap, replacing
 * 2025 with the then-current vintage.
 */
const NOVEMBER_POSITION: PortfolioSnapshot = {
  total: '1,453,422.4400',
  tokenized: '1,453,422.4400',
  available: '1,453,422.4400',
  onRetirement: '0.0000',
  surplus: '0.0000',
  coverage: '100.0000',
  retiredTokens: '0.0000',
  poolBalance: '0.3300',
  bridgedOp: '10,000.0000',
  bridgedKub: '1,443,422.1100',
  lineItems: '10',
  vintages: [{ label: '2025', value: '1,453,422.4400', unit: 'MWh', percent: 100 }],
  vintageLabel: { en: '2025', th: '2025' },
  vintageTitle: { en: 'Reserve composition', th: 'องค์ประกอบสินทรัพย์สำรอง' },
  showVintageYearsAttribute: true,
  walletSource: {
    en: 'ThaiFi pool token balance held at 0x5266Dfa5ae013674f8FdC832b7c601B838D94eE6, read from ThaiFi.',
    th: 'ยอดคงเหลือโทเคนพูลบน ThaiFi ที่ 0x5266Dfa5ae013674f8FdC832b7c601B838D94eE6 อ่านจาก ThaiFi',
  },
  policyNote: {
    en: 'From November 2026 onward, the reported reserve is measured on the current vintage only. All RECs from earlier vintages are excluded from this report under the project’s pool-freshness policy.',
    th: 'ตั้งแต่เดือนพฤศจิกายน 2026 เป็นต้นไป สินทรัพย์สำรองที่รายงานจะวัดจากวินเทจปัจจุบันเท่านั้น REC จากวินเทจก่อนหน้าทั้งหมดถูกตัดออกจากรายงานฉบับนี้ตามนโยบายรักษาความสดใหม่ของพูล',
  },
  reconciliationConclusion: {
    en: 'The reported tokenized REC supply equals the 2025-vintage REC balance held on REHASH.',
    th: 'จำนวนโทเคน REC ที่รายงานเท่ากับยอด REC วินเทจ 2025 ที่ถืออยู่บน REHASH',
  },
  coverageConclusion: {
    en: 'The 2025-vintage reserve balance on REHASH matches the reported tokenized REC supply. The reserve coverage ratio is 100.0000%.',
    th: 'ยอดสำรองบน REHASH วินเทจ 2025 เท่ากับจำนวนโทเคน REC ที่รายงาน อัตราความครอบคลุมของสินทรัพย์สำรองคือ 100.0000%',
  },
  retirementNote: {
    en: 'The current retired-token contract reports 0 REC permanently retired. Prior-period retirements relate to earlier vintages and are outside the 2025-vintage reserve presented here.',
    th: 'สัญญาโทเคนที่ไถ่ถอนแล้วฉบับปัจจุบันรายงานว่าไถ่ถอนถาวร 0 REC รายการไถ่ถอนในงวดก่อนหน้าเกี่ยวข้องกับวินเทจก่อนหน้าและอยู่นอกเหนือจากสินทรัพย์สำรองวินเทจ 2025 ที่รายงานในฉบับนี้',
  },
  retiredNote: {
    en: 'No REC is currently reported as retired on the active retired-token contract.',
    th: 'ปัจจุบันไม่มี REC ที่ถูกรายงานว่าไถ่ถอนแล้วบนสัญญาโทเคนที่ไถ่ถอนแล้วฉบับที่ใช้งานอยู่',
  },
  findingBalanced: {
    en: 'The tokenized REC supply equals the 2025-vintage REHASH balance.',
    th: 'จำนวนโทเคน REC ที่ออกเท่ากับยอดคงเหลือบน REHASH วินเทจ 2025',
  },
  findingMatched: {
    en: 'Of the tokenized supply, 0.33 REC remains on ThaiFi, 10,000.00 REC is on Optimism and 1,443,422.11 REC is on Kubchain.',
    th: 'ในจำนวนโทเคนที่ออก 0.33 REC อยู่บน ThaiFi, 10,000.00 REC อยู่บน Optimism และ 1,443,422.11 REC อยู่บน Kubchain',
  },
};

type MonthConfig = {
  slug: string;
  monthEn: string;
  monthTh: string;
  year: string;
  published: string;
  dataCutoff: Bi;
  movementNote: Bi;
  sourceNote: Bi;
  snapshot?: PortfolioSnapshot;
};

const MONTHS: MonthConfig[] = [
  {
    slug: 'november-2026',
    monthEn: 'November',
    monthTh: 'พฤศจิกายน',
    year: '2026',
    published: '2026-11-24',
    dataCutoff: { en: 'Data as of 24 November 2026', th: 'ข้อมูล ณ วันที่ 24 พฤศจิกายน 2026' },
    movementNote: {
      en: 'On 18 November 2026, 1,453,422.44 MWh of 2025-vintage RECs were imported. From this report onward, only the current vintage is accounted; all earlier vintages are excluded under the pool-freshness policy. The tokenised supply is held mainly on Kubchain (1,443,422.11 REC) and Optimism (10,000.00 REC), with 0.33 REC remaining on ThaiFi.',
      th: 'เมื่อวันที่ 18 พฤศจิกายน 2026 มีการนำเข้า REC วินเทจ 2025 จำนวน 1,453,422.44 MWh ตั้งแต่รายงานฉบับนี้เป็นต้นไป จะนับเฉพาะวินเทจปัจจุบันเท่านั้น โดยวินเทจก่อนหน้าทั้งหมดถูกตัดออกตามนโยบายรักษาความสดใหม่ของพูล จำนวนโทเคนที่ออกถืออยู่บน Kubchain 1,443,422.11 REC และ Optimism 10,000.00 REC ส่วนที่เหลือ 0.33 REC อยู่บน ThaiFi',
    },
    sourceNote: {
      en: 'REHASH inventory data as of 24 November 2026.',
      th: 'ข้อมูลสินค้าคงคลังจาก REHASH ณ วันที่ 24 พฤศจิกายน 2026',
    },
    snapshot: NOVEMBER_POSITION,
  },
  {
    slug: 'october-2026',
    monthEn: 'October',
    monthTh: 'ตุลาคม',
    year: '2026',
    published: '2026-10-31',
    dataCutoff: { en: 'No change since 31 July 2026', th: 'ไม่มีการเปลี่ยนแปลงตั้งแต่เดือนกรกฎาคม 2026' },
    movementNote: {
      en: 'No change in the REHASH reserve during October 2026. Figures are carried forward from the 31 July 2026 position.',
      th: 'ไม่มีการเปลี่ยนแปลงของสินทรัพย์สำรองบน REHASH ในเดือนตุลาคม 2026 โดยตัวเลขยกมาจากสถานะ ณ วันที่ 31 กรกฎาคม 2026',
    },
    sourceNote: {
      en: 'REHASH inventory data as of 31 July 2026, unchanged through October 2026.',
      th: 'ข้อมูลสินค้าคงคลังจาก REHASH ณ วันที่ 31 กรกฎาคม 2026 ไม่มีการเปลี่ยนแปลงจนถึงเดือนตุลาคม 2026',
    },
    snapshot: LEGACY_POSITION,
  },
  {
    slug: 'september-2026',
    monthEn: 'September',
    monthTh: 'กันยายน',
    year: '2026',
    published: '2026-09-30',
    dataCutoff: { en: 'No change since 31 July 2026', th: 'ไม่มีการเปลี่ยนแปลงตั้งแต่เดือนกรกฎาคม 2026' },
    movementNote: {
      en: 'No change in the REHASH reserve during September 2026. Figures are carried forward from the 31 July 2026 position.',
      th: 'ไม่มีการเปลี่ยนแปลงของสินทรัพย์สำรองบน REHASH ในเดือนกันยายน 2026 โดยตัวเลขยกมาจากสถานะ ณ วันที่ 31 กรกฎาคม 2026',
    },
    sourceNote: {
      en: 'REHASH inventory data as of 31 July 2026, unchanged through September 2026.',
      th: 'ข้อมูลสินค้าคงคลังจาก REHASH ณ วันที่ 31 กรกฎาคม 2026 ไม่มีการเปลี่ยนแปลงจนถึงเดือนกันยายน 2026',
    },
    snapshot: LEGACY_POSITION,
  },
  {
    slug: 'august-2026',
    monthEn: 'August',
    monthTh: 'สิงหาคม',
    year: '2026',
    published: '2026-08-31',
    dataCutoff: { en: 'No change since 31 July 2026', th: 'ไม่มีการเปลี่ยนแปลงตั้งแต่เดือนกรกฎาคม 2026' },
    movementNote: {
      en: 'No change in the REHASH reserve during August 2026. Figures are carried forward from the 31 July 2026 position.',
      th: 'ไม่มีการเปลี่ยนแปลงของสินทรัพย์สำรองบน REHASH ในเดือนสิงหาคม 2026 โดยตัวเลขยกมาจากสถานะ ณ วันที่ 31 กรกฎาคม 2026',
    },
    sourceNote: {
      en: 'REHASH inventory data as of 31 July 2026, unchanged through August 2026.',
      th: 'ข้อมูลสินค้าคงคลังจาก REHASH ณ วันที่ 31 กรกฎาคม 2026 ไม่มีการเปลี่ยนแปลงจนถึงเดือนสิงหาคม 2026',
    },
    snapshot: LEGACY_POSITION,
  },
  {
    slug: 'july-2026',
    monthEn: 'July',
    monthTh: 'กรกฎาคม',
    year: '2026',
    published: '2026-07-31',
    dataCutoff: { en: 'Data as of 31 July 2026', th: 'ข้อมูล ณ วันที่ 31 กรกฎาคม 2026' },
    movementNote: {
      en: 'On 29 July 2026, the prior vintage was exported; the 2024 vintage is the pool backing at the reporting date. The REHASH balance is 1,453,422.4410 MWh. No other reserve movement occurred during July 2026.',
      th: 'เมื่อวันที่ 29 กรกฎาคม 2026 มีการส่งออกวินเทจก่อนหน้า โดยวินเทจ 2024 เป็นสินทรัพย์รองรับพูล ณ วันที่รายงาน ยอดคงเหลือบน REHASH คือ 1,453,422.4410 MWh ไม่มีการเคลื่อนไหวของสินทรัพย์สำรองอื่นในเดือนกรกฎาคม 2026',
    },
    sourceNote: {
      en: 'REHASH inventory data as of 31 July 2026, after the 29 July 2026 export.',
      th: 'ข้อมูลสินค้าคงคลังจาก REHASH ณ วันที่ 31 กรกฎาคม 2026 หลังการส่งออกเมื่อวันที่ 29 กรกฎาคม 2026',
    },
  },
  {
    slug: 'june-2026',
    monthEn: 'June',
    monthTh: 'มิถุนายน',
    year: '2026',
    published: '2026-06-30',
    dataCutoff: { en: 'No change since May 2026', th: 'ไม่มีการเปลี่ยนแปลงตั้งแต่เดือนพฤษภาคม 2026' },
    movementNote: {
      en: 'No change in the REHASH reserve during June 2026. Figures are carried forward from the May 2026 reconciliation.',
      th: 'ไม่มีการเปลี่ยนแปลงของสินทรัพย์สำรองบน REHASH ในเดือนมิถุนายน 2026 โดยตัวเลขยกมาจากการกระทบยอดเดือนพฤษภาคม 2026',
    },
    sourceNote: {
      en: 'REHASH inventory data exported as of 19 May 2026, unchanged through June 2026.',
      th: 'ข้อมูลสินค้าคงคลังจาก REHASH ที่ส่งออก ณ วันที่ 19 พฤษภาคม 2026 ไม่มีการเปลี่ยนแปลงจนถึงเดือนมิถุนายน 2026',
    },
  },
  {
    slug: 'may-2026',
    monthEn: 'May',
    monthTh: 'พฤษภาคม',
    year: '2026',
    published: '2026-05-31',
    dataCutoff: { en: 'Data as of 19 May 2026', th: 'ข้อมูล ณ วันที่ 19 พฤษภาคม 2026' },
    movementNote: { en: '', th: '' },
    sourceNote: {
      en: 'REHASH inventory data exported as of 19 May 2026.',
      th: 'ข้อมูลสินค้าคงคลังจาก REHASH ที่ส่งออก ณ วันที่ 19 พฤษภาคม 2026',
    },
  },
];

function replaceMonth<T>(value: T, monthEn: string, monthTh: string, year: string): T {
  if (typeof value === 'string') {
    return value
      .replaceAll('May 2026', `${monthEn} ${year}`)
      .replaceAll('พฤษภาคม 2026', `${monthTh} ${year}`) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => replaceMonth(item, monthEn, monthTh, year)) as T;
  }
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) {
      (value as Record<string, unknown>)[key] = replaceMonth(
        (value as Record<string, unknown>)[key],
        monthEn,
        monthTh,
        year
      );
    }
  }
  return value;
}

function setRowValue(
  rows: Array<{ label: Bi; value: string }>,
  label: string,
  value: string
): void {
  const row = rows.find((item) => item.label.en === label);
  if (!row) throw new Error(`Report row not found: ${label}`);
  row.value = value;
}

function applySnapshot(report: ReportData, snapshot: PortfolioSnapshot): void {
  setRowValue(report.metrics, 'Total REC balance on REHASH', snapshot.total);
  setRowValue(report.metrics, 'Tokenized REC supply', snapshot.tokenized);
  setRowValue(report.metrics, 'Reserve surplus', snapshot.surplus);
  setRowValue(report.metrics, 'Reserve coverage ratio', snapshot.coverage);

  setRowValue(report.summary.rows, 'Total REC balance on REHASH', snapshot.total);
  setRowValue(report.summary.rows, 'Available REC balance on REHASH', snapshot.available);
  setRowValue(report.summary.rows, 'REC on retirement on REHASH', snapshot.onRetirement);
  setRowValue(
    report.summary.rows,
    'Total REC tokenized reported on RECTOKEN.XYZ',
    snapshot.tokenized
  );
  setRowValue(
    report.summary.rows,
    'Total retired tokens reported on RECTOKEN.XYZ',
    snapshot.retiredTokens
  );

  const setAttribute = (label: string, value: Bi) => {
    const row = report.reserve.attributes.find((attribute) => attribute.label.en === label);
    if (!row) throw new Error(`Report attribute not found: ${label}`);
    row.value = value;
  };
  if (snapshot.showVintageYearsAttribute) {
    setAttribute('Vintage years', snapshot.vintageLabel);
  } else {
    report.reserve.attributes = report.reserve.attributes.filter(
      (attribute) => attribute.label.en !== 'Vintage years'
    );
  }
  setAttribute('Inventory line items', { en: snapshot.lineItems, th: snapshot.lineItems });
  setAttribute('Total REC balance', { en: `${snapshot.total} MWh`, th: `${snapshot.total} MWh` });
  setAttribute('Available balance', { en: `${snapshot.available} MWh`, th: `${snapshot.available} MWh` });
  setAttribute('REC on retirement', { en: `${snapshot.onRetirement} MWh`, th: `${snapshot.onRetirement} MWh` });

  report.reserve.vintages = snapshot.vintages;
  report.reserve.vintageTitle = snapshot.vintageTitle;
  report.reserve.total.value = snapshot.total;

  setRowValue(report.supply.rows, 'Total REC tokenized', snapshot.tokenized);
  setRowValue(report.supply.rows, 'RECTOKEN pool balance', snapshot.poolBalance);
  setRowValue(report.supply.rows, 'Bridged to Optimism', snapshot.bridgedOp);
  setRowValue(report.supply.rows, 'Bridged to Kubchain', snapshot.bridgedKub);
  setRowValue(report.supply.rows, 'Total retired', snapshot.retiredTokens);

  const compositionTotal = Number(snapshot.tokenized.replace(/,/g, '')) || 0;
  const share = (value: string) => {
    const amount = Number(value.replace(/,/g, ''));
    return compositionTotal > 0 ? (amount / compositionTotal) * 100 : 0;
  };
  report.supply.composition = [
    { label: { en: 'RECTOKEN pool', th: 'พูล RECTOKEN' }, value: snapshot.poolBalance, percent: share(snapshot.poolBalance) },
    { label: { en: 'Kubchain', th: 'Kubchain' }, value: snapshot.bridgedKub, percent: share(snapshot.bridgedKub) },
    { label: { en: 'Optimism', th: 'Optimism' }, value: snapshot.bridgedOp, percent: share(snapshot.bridgedOp) },
  ];
  report.supply.retiredNote = snapshot.retiredNote;

  setRowValue(report.reconciliation.rows, 'Total REC balance on REHASH', snapshot.total);
  setRowValue(report.reconciliation.rows, 'Total REC tokenized on RECTOKEN', snapshot.tokenized);
  setRowValue(report.reconciliation.rows, 'Reserve surplus', snapshot.surplus);
  report.reconciliation.conclusion = snapshot.reconciliationConclusion;

  report.coverage.numerator = snapshot.total;
  report.coverage.denominator = snapshot.tokenized;
  report.coverage.ratio = snapshot.coverage;
  report.coverage.conclusion = snapshot.coverageConclusion;

  report.retirement.paragraphs = [
    {
      en: `The REHASH inventory records ${snapshot.onRetirement} MWh as "On Retirement." For reserve reconciliation purposes, this amount is treated separately from freely available inventory, but remains part of the reported reserve balance at the reporting date.`,
      th: `ข้อมูลสินค้าคงคลังของ REHASH บันทึกจำนวน ${snapshot.onRetirement} MWh ว่า "อยู่ระหว่างการไถ่ถอน" ในการกระทบยอดสินทรัพย์สำรอง จำนวนนี้แยกจากสินค้าคงคลังที่สามารถใช้ได้อย่างอิสระ แต่ยังคงรวมอยู่ในยอดสำรองที่รายงาน ณ วันที่รายงาน`,
    },
    snapshot.retirementNote,
  ];
  setRowValue(report.retirement.cards, 'On retirement at REHASH', snapshot.onRetirement);
  setRowValue(report.retirement.cards, 'Permanently retired on RECTOKEN', snapshot.retiredTokens);

  report.findings.items = [
    {
      en: `The total REHASH REC balance is ${snapshot.total} MWh.`,
      th: `ยอด REC รวมบน REHASH คือ ${snapshot.total} MWh`,
    },
    {
      en: `The RECTOKEN dashboard reports total REC tokenized of ${snapshot.tokenized} REC.`,
      th: `แดชบอร์ด RECTOKEN รายงานยอด REC ที่แปลงเป็นโทเคนรวม ${snapshot.tokenized} REC`,
    },
    snapshot.findingBalanced,
    snapshot.findingMatched,
    {
      en: 'No evidence was identified from the reviewed data that the tokenized REC supply exceeds the reserve balance on REHASH.',
      th: 'ไม่พบหลักฐานจากข้อมูลที่ตรวจสอบว่าจำนวนโทเคน REC ที่ออกเกินยอดสำรองบน REHASH',
    },
  ];

  report.conclusion.paragraphs[2] = {
    en: `The project therefore demonstrates a reserve coverage position of ${snapshot.coverage}% when measured against the total REHASH REC balance.`,
    th: `โครงการจึงแสดงสถานะความครอบคลุมของสินทรัพย์สำรอง ${snapshot.coverage}% เมื่อเทียบกับยอด REC รวมบน REHASH`,
  };

  if (snapshot.walletSource) report.scope.sources.push(snapshot.walletSource);
  if (snapshot.policyNote) {
    report.reserve.intro = {
      en: `${report.reserve.intro.en} ${snapshot.policyNote.en}`,
      th: `${report.reserve.intro.th} ${snapshot.policyNote.th}`,
    };
  }
}

function buildReport(config: MonthConfig): ReportData {
  const report = JSON.parse(JSON.stringify(REPORT_MAY_2026)) as ReportData;
  if (config.slug === 'may-2026') return report;

  replaceMonth(report, config.monthEn, config.monthTh, config.year);

  report.slug = config.slug;
  report.period = {
    en: `${config.monthEn} ${config.year}`,
    th: `${config.monthTh} ${config.year}`,
  };
  report.published = config.published;
  report.dataCutoff = config.dataCutoff;
  report.movementNote = config.movementNote;
  report.scope.sources[0] = config.sourceNote;

  if (config.snapshot) applySnapshot(report, config.snapshot);

  return report;
}

export const MONTHLY_REPORTS: ReportData[] = MONTHS.map(buildReport);
export const LATEST_REPORT = MONTHLY_REPORTS[0];

export function getReport(slug: string): ReportData | undefined {
  return MONTHLY_REPORTS.find((report) => report.slug === slug);
}
