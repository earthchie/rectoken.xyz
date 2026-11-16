import { REPORT_MAY_2026, type ReportData } from './report-may-2026';

type MonthConfig = {
  slug: string;
  monthEn: string;
  monthTh: string;
  year: string;
  published: string;
  carryForward: boolean;
};

const MONTHS: MonthConfig[] = [
  { slug: 'october-2026', monthEn: 'October', monthTh: 'ตุลาคม', year: '2026', published: '2026-10-31', carryForward: true },
  { slug: 'september-2026', monthEn: 'September', monthTh: 'กันยายน', year: '2026', published: '2026-09-30', carryForward: true },
  { slug: 'august-2026', monthEn: 'August', monthTh: 'สิงหาคม', year: '2026', published: '2026-08-31', carryForward: true },
  { slug: 'july-2026', monthEn: 'July', monthTh: 'กรกฎาคม', year: '2026', published: '2026-07-31', carryForward: true },
  { slug: 'june-2026', monthEn: 'June', monthTh: 'มิถุนายน', year: '2026', published: '2026-06-30', carryForward: true },
  { slug: 'may-2026', monthEn: 'May', monthTh: 'พฤษภาคม', year: '2026', published: '2026-05-31', carryForward: false },
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

function buildReport(config: MonthConfig): ReportData {
  const report = JSON.parse(JSON.stringify(REPORT_MAY_2026)) as ReportData;
  if (!config.carryForward) return report;

  replaceMonth(report, config.monthEn, config.monthTh, config.year);

  report.slug = config.slug;
  report.period = {
    en: `${config.monthEn} ${config.year}`,
    th: `${config.monthTh} ${config.year}`,
  };
  report.published = config.published;
  report.dataCutoff = {
    en: 'No change since May 2026',
    th: 'ไม่มีการเปลี่ยนแปลงตั้งแต่เดือนพฤษภาคม 2026',
  };
  report.movementNote = {
    en: `No change in reserve, tokenized supply, bridged balances or retirements during ${config.monthEn} ${config.year}. Figures are carried forward from the May 2026 reconciliation.`,
    th: `ในเดือน${config.monthTh} ${config.year} ไม่มีการเปลี่ยนแปลงของสินทรัพย์สำรอง จำนวนโทเคนที่ออก ยอดคงเหลือที่โอนข้ามเชน หรือรายการไถ่ถอน โดยตัวเลขยกมาจากการกระทบยอดเดือนพฤษภาคม 2026`,
  };
  report.scope.sources[0] = {
    en: `REHASH inventory data exported as of 19 May 2026, unchanged through ${config.monthEn} ${config.year}.`,
    th: `ข้อมูลสินค้าคงคลังจาก REHASH ที่ส่งออก ณ วันที่ 19 พฤษภาคม 2026 ไม่มีการเปลี่ยนแปลงจนถึงเดือน${config.monthTh} ${config.year}`,
  };

  return report;
}

export const MONTHLY_REPORTS: ReportData[] = MONTHS.map(buildReport);
export const LATEST_REPORT = MONTHLY_REPORTS[0];

export function getReport(slug: string): ReportData | undefined {
  return MONTHLY_REPORTS.find((report) => report.slug === slug);
}
