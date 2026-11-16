import { MONTHLY_REPORTS } from './report-monthly';

export const REPORTS = MONTHLY_REPORTS.map((report) => {
  const carried = Boolean(report.movementNote.en);
  return {
    id: report.slug,
    period: report.period,
    month: report.period.en.split(' ')[0],
    year: report.period.en.split(' ')[1],
    title: `REC Portfolio Report - ${report.period.en}`,
    titleTh: `รายงานพอร์ต REC - ${report.period.th}`,
    description: carried
      ? `Monthly portfolio report for ${report.period.en}. No reserve movement; figures are carried forward from the May 2026 reconciliation.`
      : 'Monthly portfolio report covering REC token metrics, asset composition and redemption activities for May 2026.',
    descriptionTh: carried
      ? `รายงานพอร์ตประจำเดือน${report.period.th} ไม่มีการเคลื่อนไหวของสินทรัพย์สำรอง โดยตัวเลขยกมาจากการกระทบยอดเดือนพฤษภาคม 2026`
      : 'รายงานพอร์ตประจำเดือนพฤษภาคม 2026 ครอบคลุมตัวชี้วัดโทเคน REC องค์ประกอบของสินทรัพย์ และกิจกรรมการแลกคืน',
    href: `reports/${report.slug}`,
    sections: 10,
    published: report.published,
    carryForward: carried,
  };
});

export const REPORTS_ABOUT = {
  title: 'About monthly reports',
  lead: 'REC Portfolio Reports are published monthly to provide transparency on:',
  bullets: [
    'Total REC token supply and circulation metrics',
    'Asset composition by project and vintage year',
    'Redemption and retirement activities',
    'Cross-chain bridge operations and balances',
    'Reconciliation status between on-chain tokens and custodied I-RECs',
  ],
  closing: 'Reports are typically published within 7 business days after the end of each month.',
};

export const REPORTS_TH = {
  title: 'เกี่ยวกับรายงานรายเดือน',
  lead: 'รายงานพอร์ต REC เผยแพร่เป็นรายเดือนเพื่อให้ข้อมูลอย่างโปร่งใสในเรื่องต่อไปนี้',
  bullets: [
    'จำนวนโทเคน REC ทั้งหมดและตัวชี้วัดการหมุนเวียน',
    'องค์ประกอบของสินทรัพย์ตามโครงการและปีวินเทจ',
    'กิจกรรมการแลกคืนและการไถ่ถอน',
    'การโอนผ่านสะพานข้ามเชนและยอดคงเหลือ',
    'สถานะการกระทบยอดระหว่างโทเคนบนเชนกับ I-REC ที่อยู่ในการดูแล',
  ],
  closing: 'รายงานมักเผยแพร่ภายใน 7 วันทำการหลังสิ้นเดือน',
};
