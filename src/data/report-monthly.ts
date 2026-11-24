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
  retirementNote: Bi;
  retiredNote: Bi;
  findingMatched: Bi;
};

/**
 * Position after the 29 July 2026 export. The entire 2023 vintage
 * (1,782,356.8899 MWh) left REHASH, leaving the 2024 vintage plus the
 * 22.1101 MWh that was already on retirement.
 */
const JULY_POSITION: PortfolioSnapshot = {
  total: '1,453,444.5511',
  tokenized: '1,453,422.4410',
  available: '1,453,422.4410',
  onRetirement: '22.1101',
  surplus: '22.1101',
  coverage: '100.0015',
  retiredTokens: '322.5101',
  poolBalance: '1,453,422.4410',
  bridgedOp: '0.0000',
  bridgedKub: '0.0000',
  lineItems: '24',
  vintages: [
    { label: '2024', value: '1,453,422.4410', unit: 'MWh', percent: 99.9985 },
    { label: '2023', value: '22.1101', unit: 'MWh', percent: 0.0015 },
  ],
  vintageLabel: { en: '2023 and 2024', th: '2023 และ 2024' },
  vintageTitle: { en: 'Vintage breakdown', th: 'แยกตามปีวินเทจ' },
  showVintageYearsAttribute: true,
  retirementNote: {
    en: 'The RECTOKEN dashboard reports 322.5101 REC as permanently retired. This figure is not circulating supply. It represents REC tokens that have already been removed from active circulation through the retirement process.',
    th: 'แดชบอร์ด RECTOKEN รายงานจำนวน 322.5101 REC ว่าไถ่ถอนถาวรแล้ว ตัวเลขนี้ไม่นับเป็นจำนวนโทเคนหมุนเวียน แต่เป็นโทเคน REC ที่นำออกจากการหมุนเวียนผ่านกระบวนการไถ่ถอนแล้ว',
  },
  retiredNote: {
    en: 'The 322.5101 REC retired balance is not part of active circulating supply.',
    th: 'ยอดที่ไถ่ถอนแล้ว 322.5101 REC ไม่นับรวมในจำนวนโทเคนที่ยังหมุนเวียนอยู่',
  },
  findingMatched: {
    en: 'The available REHASH balance and tokenized REC supply are effectively matched, with only a minor difference.',
    th: 'ยอดคงเหลือที่พร้อมใช้งานบน REHASH และจำนวนโทเคน REC ที่ออกมีค่าใกล้เคียงกันมาก โดยต่างกันเพียงเล็กน้อย',
  },
};

/**
 * August-October position. The reserve itself did not change after 29 July, but
 * from the August report onward the public reports no longer disclose the
 * 2023 or 2024 vintage years. The balance is shown as one legacy reserve line.
 */
const LEGACY_POSITION: PortfolioSnapshot = {
  ...JULY_POSITION,
  vintages: [{ label: 'Legacy', value: '1,453,444.5511', unit: 'MWh', percent: 100 }],
  vintageLabel: { en: 'Legacy reserve', th: 'สินทรัพย์สำรองเดิม' },
  vintageTitle: { en: 'Reserve composition', th: 'องค์ประกอบสินทรัพย์สำรอง' },
  showVintageYearsAttribute: false,
};

/**
 * Position after the 18 November 2026 import. The 2025 vintage
 * (1,453,422.44 MWh) is tokenised; the remaining balances stay as
 * un-tokenised legacy reserve.
 */
const NOVEMBER_POSITION: PortfolioSnapshot = {
  total: '2,906,866.9911',
  tokenized: '1,453,422.4400',
  available: '2,906,866.9911',
  onRetirement: '0.0000',
  surplus: '1,453,444.5511',
  coverage: '200.0015',
  retiredTokens: '0.0000',
  poolBalance: '0.3300',
  bridgedOp: '10,000.0000',
  bridgedKub: '1,443,422.1100',
  lineItems: '34',
  vintages: [
    { label: '2025', value: '1,453,422.4400', unit: 'MWh', percent: 49.9996 },
    { label: 'Legacy', value: '1,453,444.5511', unit: 'MWh', percent: 50.0004 },
  ],
  vintageLabel: { en: '2025 and legacy reserve', th: '2025 และสินทรัพย์สำรองเดิม' },
  vintageTitle: { en: 'Reserve composition', th: 'องค์ประกอบสินทรัพย์สำรอง' },
  showVintageYearsAttribute: true,
  walletSource: {
    en: 'ThaiFi pool token balance held at 0x5266Dfa5ae013674f8FdC832b7c601B838D94eE6, read from ThaiFi.',
    th: 'ยอดคงเหลือโทเคนพูลบน ThaiFi ที่ 0x5266Dfa5ae013674f8FdC832b7c601B838D94eE6 อ่านจาก ThaiFi',
  },
  retirementNote: {
    en: 'The current retired-token contract reports 0 REC permanently retired. The 322.5101 REC reported in prior periods is not reflected in the current contract.',
    th: 'สัญญาโทเคนที่ไถ่ถอนแล้วฉบับปัจจุบันรายงานว่าไถ่ถอนถาวร 0 REC จำนวน 322.5101 REC ที่รายงานในงวดก่อนหน้าไม่ได้สะท้อนอยู่ในสัญญาฉบับปัจจุบัน',
  },
  retiredNote: {
    en: 'No REC is currently reported as retired on the active retired-token contract.',
    th: 'ปัจจุบันไม่มี REC ที่ถูกรายงานว่าไถ่ถอนแล้วบนสัญญาโทเคนที่ไถ่ถอนแล้วฉบับที่ใช้งานอยู่',
  },
  findingMatched: {
    en: 'The REHASH balance exceeds the tokenized REC supply by 1,453,444.5511 MWh, reflecting legacy inventory that is held in reserve but not tokenised.',
    th: 'ยอดคงเหลือบน REHASH สูงกว่าจำนวนโทเคน REC ที่ออกอยู่ 1,453,444.5511 MWh ซึ่งสะท้อนสินค้าคงคลังเดิมที่ถือเป็นสินทรัพย์สำรองแต่ยังไม่ได้แปลงเป็นโทเคน',
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
      en: 'On 18 November 2026, 1,453,422.44 MWh of 2025-vintage RECs were imported. The REHASH balance is 2,906,866.9911 MWh at the reporting date. The tokenised supply is held mainly on Kubchain (1,443,422.11 REC) and Optimism (10,000.00 REC), with 0.33 REC remaining on ThaiFi.',
      th: 'เมื่อวันที่ 18 พฤศจิกายน 2026 มีการนำเข้า REC วินเทจ 2025 จำนวน 1,453,422.44 MWh ยอดคงเหลือบน REHASH ณ วันที่รายงานคือ 2,906,866.9911 MWh โดยจำนวนโทเคนที่ออกถืออยู่บน Kubchain 1,443,422.11 REC และ Optimism 10,000.00 REC ส่วนที่เหลือ 0.33 REC อยู่บน ThaiFi',
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
      en: 'On 29 July 2026, 1,782,356.8899 MWh of 2023-vintage RECs were exported, reducing the REHASH balance to 1,453,444.5511 MWh. No other reserve movement occurred during July 2026.',
      th: 'เมื่อวันที่ 29 กรกฎาคม 2026 มีการส่งออก REC วินเทจ 2023 จำนวน 1,782,356.8899 MWh ทำให้ยอดคงเหลือบน REHASH ลดลงเหลือ 1,453,444.5511 MWh ไม่มีการเคลื่อนไหวของสินทรัพย์สำรองอื่นในเดือนกรกฎาคม 2026',
    },
    sourceNote: {
      en: 'REHASH inventory data as of 31 July 2026, after the 29 July 2026 export.',
      th: 'ข้อมูลสินค้าคงคลังจาก REHASH ณ วันที่ 31 กรกฎาคม 2026 หลังการส่งออกเมื่อวันที่ 29 กรกฎาคม 2026',
    },
    snapshot: JULY_POSITION,
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

function deepReplace<T>(value: T, pairs: Array<[string, string]>): T {
  /*
   * Two passes with unique markers. A single pass would corrupt values such as
   * 22.1101 when the shorter source 22.110 is replaced afterwards, because the
   * replacement text itself contains the shorter source.
   */
  const markers = pairs.map((_, index) => `\u0001${index}\u0001`);

  const walk = (input: unknown, map: (text: string) => string): unknown => {
    if (typeof input === 'string') return map(input);
    if (Array.isArray(input)) return input.map((item) => walk(item, map));
    if (input && typeof input === 'object') {
      for (const key of Object.keys(input)) {
        (input as Record<string, unknown>)[key] = walk(
          (input as Record<string, unknown>)[key],
          map
        );
      }
    }
    return input;
  };

  walk(value, (text) => {
    let next = text;
    pairs.forEach(([from], index) => {
      next = next.split(from).join(markers[index]);
    });
    return next;
  });

  return walk(value, (text) => {
    let next = text;
    markers.forEach((marker, index) => {
      next = next.split(marker).join(pairs[index][1]);
    });
    return next;
  }) as T;
}

function applySnapshot(report: ReportData, snapshot: PortfolioSnapshot): void {
  /* Longest source string first so 1,453,422.4410 is replaced before 1,453,422.441. */
  const pairs = (
    [
      ['3,235,801.4410', snapshot.total],
      ['3,235,779.3310', snapshot.tokenized],
      ['3,235,779.3309', snapshot.available],
      ['1,963,679.3310', snapshot.poolBalance],
      ['1,262,100.0000', snapshot.bridgedKub],
      ['10,000.0000', snapshot.bridgedOp],
      ['3,235,801.441', snapshot.total],
      ['3,235,779.331', snapshot.tokenized],
      ['322.5101', snapshot.retiredTokens],
      ['100.0007', snapshot.coverage],
      ['22.1101', snapshot.onRetirement],
      ['22.1100', snapshot.surplus],
      ['22.110', snapshot.surplus],
      ['38', snapshot.lineItems],
    ] as Array<[string, string]>
  ).sort((a, b) => b[0].length - a[0].length);

  deepReplace(report, pairs);

  report.reserve.vintages = snapshot.vintages;
  report.reserve.vintageTitle = snapshot.vintageTitle;
  report.reserve.total.value = snapshot.total;

  const setAttribute = (label: string, value: Bi) => {
    const row = report.reserve.attributes.find((attribute) => attribute.label.en === label);
    if (row) row.value = value;
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
  report.retirement.paragraphs[1] = snapshot.retirementNote;
  report.findings.items[3] = snapshot.findingMatched;
  if (snapshot.walletSource) report.scope.sources.push(snapshot.walletSource);
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
