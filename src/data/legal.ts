import type { Bi } from './whitepaper';

type LegalSection = {
  title: Bi;
  body: Bi;
  bullets?: Bi[];
};

export const PRIVACY: LegalSection[] = [
  {
    title: { en: '1. Introduction', th: '1. บทนำ' },
    body: {
      en: 'The website and platform of REC Token ("we", "the Company", "the Platform") attach great importance to the personal data of users ("you", "the user") and are committed to protecting your rights in accordance with applicable laws. This Policy explains how we collect, use, and protect your personal data, as well as your rights in relation to such data.',
      th: 'เว็บไซต์และแพลตฟอร์มของ REC Token ("เรา" "บริษัท" "แพลตฟอร์ม") ให้ความสำคัญกับข้อมูลส่วนบุคคลของผู้ใช้ ("คุณ" "ผู้ใช้") และมุ่งมั่นคุ้มครองสิทธิ์ของคุณตามกฎหมายที่ใช้บังคับ นโยบายนี้อธิบายวิธีที่เราเก็บรวบรวม ใช้ และคุ้มครองข้อมูลส่วนบุคคลของคุณ รวมถึงสิทธิ์ของคุณเกี่ยวกับข้อมูลดังกล่าว',
    },
  },
  {
    title: { en: '2. Information We May Collect', th: '2. ข้อมูลที่เราอาจเก็บรวบรวม' },
    body: {
      en: 'We may collect the following types of information (depending on your usage behaviour):',
      th: 'เราอาจเก็บรวบรวมข้อมูลประเภทต่อไปนี้ (ขึ้นอยู่กับพฤติกรรมการใช้งานของคุณ):',
    },
    bullets: [
      {
        en: 'Personal data: IP address, wallet connection information (wallet address).',
        th: 'ข้อมูลส่วนบุคคล: ที่อยู่ IP ข้อมูลการเชื่อมต่อกระเป๋า (ที่อยู่กระเป๋า)',
      },
      {
        en: 'Usage data: website access history, pages and features you visit, transaction data (for example buying, selling or exchanging REC), data related to blockchain network interactions, and usage logs.',
        th: 'ข้อมูลการใช้งาน: ประวัติการเข้าถึงเว็บไซต์ หน้าและฟีเจอร์ที่คุณเข้าชม ข้อมูลธุรกรรม (เช่น การซื้อ ขาย หรือแลกเปลี่ยน REC) ข้อมูลที่เกี่ยวข้องกับการโต้ตอบกับเครือข่ายบล็อกเชน และบันทึกการใช้งาน',
      },
      {
        en: 'System-generated data: cookies, device IDs, browser and operating-system information.',
        th: 'ข้อมูลที่ระบบสร้างขึ้น: คุกกี้ รหัสอุปกรณ์ ข้อมูลเบราว์เซอร์และระบบปฏิบัติการ',
      },
    ],
  },
  {
    title: { en: '3. Purposes for Using the Data', th: '3. วัตถุประสงค์ในการใช้ข้อมูล' },
    body: {
      en: 'We will use your data for purposes such as:',
      th: 'เราจะใช้ข้อมูลของคุณเพื่อวัตถุประสงค์ต่าง ๆ เช่น:',
    },
    bullets: [
      {
        en: 'Providing services you request (for example buying, selling or exchanging REC Token, and checking balances).',
        th: 'ให้บริการตามที่คุณร้องขอ (เช่น การซื้อ ขาย หรือแลกเปลี่ยน REC Token และการตรวจสอบยอดคงเหลือ)',
      },
      { en: 'Improving the performance and security of the Platform.', th: 'ปรับปรุงประสิทธิภาพและความปลอดภัยของแพลตฟอร์ม' },
      { en: 'Analysing usage behaviour to improve UX, UI and features.', th: 'วิเคราะห์พฤติกรรมการใช้งานเพื่อปรับปรุง UX, UI และฟีเจอร์' },
      { en: 'Complying with laws or legal obligations (if any).', th: 'ปฏิบัติตามกฎหมายหรือหน้าที่ตามกฎหมาย (หากมี)' },
    ],
  },
  {
    title: { en: '4. Disclosure of Data to Third Parties', th: '4. การเปิดเผยข้อมูลต่อบุคคลที่สาม' },
    body: {
      en: 'We will not disclose your personal data to third parties without your consent, except in the following cases:',
      th: 'เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของคุณต่อบุคคลที่สามโดยไม่ได้รับความยินยอมจากคุณ เว้นแต่ในกรณีต่อไปนี้:',
    },
    bullets: [
      {
        en: 'To provide services through affiliates or external service providers who help operate the system (for example hosting, infrastructure, wallet and blockchain providers), where we ensure such persons store the data securely and use it only for the agreed purposes.',
        th: 'เพื่อให้บริการผ่านบริษัทในเครือหรือผู้ให้บริการภายนอกที่ช่วยดำเนินระบบ (เช่น ผู้ให้บริการโฮสติ้ง โครงสร้างพื้นฐาน กระเป๋า และบล็อกเชน) โดยเราจะดูแลให้บุคคลดังกล่าวจัดเก็บข้อมูลอย่างปลอดภัยและใช้ข้อมูลเฉพาะเพื่อวัตถุประสงค์ที่ตกลงกัน',
      },
      { en: 'To comply with laws, regulatory authorities or legal claims.', th: 'เพื่อปฏิบัติตามกฎหมาย ข้อกำหนดของหน่วยงานกำกับดูแล หรือข้อเรียกร้องทางกฎหมาย' },
      {
        en: 'In the case of a business transfer, merger or sale of the Company (if any), where we will notify you in advance.',
        th: 'ในกรณีการโอนธุรกิจ การควบรวม หรือการขายบริษัท (หากมี) โดยเราจะแจ้งให้คุณทราบล่วงหน้า',
      },
    ],
  },
  {
    title: { en: '5. Data Storage and Security', th: '5. การจัดเก็บและความปลอดภัยของข้อมูล' },
    body: {
      en: 'We will store your data in electronic form and/or other appropriate forms, with suitable security measures in place to prevent unauthorised access, alteration or loss of data.',
      th: 'เราจะจัดเก็บข้อมูลของคุณในรูปแบบอิเล็กทรอนิกส์และ/หรือรูปแบบอื่นที่เหมาะสม พร้อมมาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อป้องกันการเข้าถึงหรือแก้ไขข้อมูลโดยไม่ได้รับอนุญาต และการสูญเสียข้อมูล',
    },
  },
  {
    title: { en: '6. Your Rights', th: '6. สิทธิ์ของคุณ' },
    body: {
      en: 'Under personal data protection laws, you have the following rights:',
      th: 'ภายใต้กฎหมายคุ้มครองข้อมูลส่วนบุคคล คุณมีสิทธิ์ดังต่อไปนี้:',
    },
    bullets: [
      { en: 'The right to access your personal data (Right of Access).', th: 'สิทธิ์เข้าถึงข้อมูลส่วนบุคคลของคุณ (Right of Access)' },
      { en: 'The right to request correction of inaccurate data (Right of Rectification).', th: 'สิทธิ์ขอแก้ไขข้อมูลที่ไม่ถูกต้อง (Right of Rectification)' },
      { en: 'The right to request deletion of data (Right of Erasure / Right to be Forgotten).', th: 'สิทธิ์ขอลบข้อมูล (Right of Erasure / Right to be Forgotten)' },
      {
        en: 'The right to withdraw consent (Right to Withdraw Consent) where data processing is based on your consent.',
        th: 'สิทธิ์ถอนความยินยอม (Right to Withdraw Consent) ในกรณีที่การประมวลผลข้อมูลอาศัยความยินยอมของคุณ',
      },
    ],
  },
  {
    title: { en: '7. Changes to This Policy', th: '7. การเปลี่ยนแปลงนโยบายนี้' },
    body: {
      en: 'We may update this Policy from time to time to comply with new laws or service improvements. If there are any changes, we will notify users via the website. Your continued use of the website will be deemed as acceptance of such changes.',
      th: 'เราอาจปรับปรุงนโยบายนี้เป็นระยะเพื่อให้สอดคล้องกับกฎหมายใหม่หรือการปรับปรุงบริการ หากมีการเปลี่ยนแปลง เราจะแจ้งผู้ใช้ผ่านเว็บไซต์ การใช้เว็บไซต์ต่อไปถือเป็นการยอมรับการเปลี่ยนแปลงดังกล่าว',
    },
  },
  {
    title: { en: '8. Contact Us', th: '8. ติดต่อเรา' },
    body: {
      en: 'If you have any questions, complaints or wish to exercise your rights regarding your personal data, please contact us at info@blockedge.co.',
      th: 'หากคุณมีคำถาม ข้อร้องเรียน หรือต้องการใช้สิทธิ์เกี่ยวกับข้อมูลส่วนบุคคลของคุณ กรุณาติดต่อเราที่ info@blockedge.co',
    },
  },
];

export const TERMS: LegalSection[] = [
  {
    title: { en: '1. Acceptance of Terms', th: '1. การยอมรับข้อกำหนด' },
    body: {
      en: 'By accessing or conducting any transaction through the REC Token Platform (such as buying, selling or exchanging REC, connecting a wallet, or using the dashboard), you are deemed to have read, understood and accepted all terms and conditions set out in this document.',
      th: 'เมื่อคุณเข้าถึงหรือทำธุรกรรมใด ๆ ผ่านแพลตฟอร์ม REC Token (เช่น การซื้อ ขาย หรือแลกเปลี่ยน REC การเชื่อมต่อกระเป๋า หรือการใช้แดชบอร์ด) จะถือว่าคุณได้อ่าน เข้าใจ และยอมรับข้อกำหนดและเงื่อนไขทั้งหมดในเอกสารนี้แล้ว',
    },
  },
  {
    title: { en: '2. Service License', th: '2. สิทธิ์การใช้บริการ' },
    body: {
      en: 'REC Token grants you a limited (non-exclusive, non-transferable) right to access and use the Platform in accordance with the conditions specified herein.',
      th: 'REC Token ให้สิทธิ์แก่คุณอย่างจำกัดในการเข้าถึงและใช้แพลตฟอร์ม โดยไม่ใช่สิทธิ์แต่เพียงผู้เดียวและไม่สามารถโอนให้ผู้อื่นได้ ทั้งนี้ตามเงื่อนไขที่ระบุไว้ในเอกสารนี้',
    },
  },
  {
    title: { en: '3. Restrictions on Use', th: '3. ข้อจำกัดในการใช้งาน' },
    body: { en: 'You agree not to use the Platform for:', th: 'คุณตกลงที่จะไม่ใช้แพลตฟอร์มเพื่อ:' },
    bullets: [
      { en: 'Any illegal activities or supporting illegal activities.', th: 'กิจกรรมที่ผิดกฎหมายหรือสนับสนุนกิจกรรมที่ผิดกฎหมาย' },
      {
        en: 'Money laundering or bringing in money or assets derived from illegal activities.',
        th: 'การฟอกเงินหรือนำเงินหรือทรัพย์สินที่ได้มาจากกิจกรรมผิดกฎหมายเข้ามา',
      },
      {
        en: 'Any use that may damage, attack or pose security risks to the Platform.',
        th: 'การใช้งานที่อาจสร้างความเสียหายแก่แพลตฟอร์ม โจมตีแพลตฟอร์ม หรือก่อความเสี่ยงด้านความปลอดภัยต่อแพลตฟอร์ม',
      },
    ],
  },
  {
    title: { en: '4. User Responsibilities', th: '4. ความรับผิดชอบของผู้ใช้' },
    body: {
      en: 'You are responsible for the security of your personal wallet (wallet private keys, seed phrase) and all login information. In the event of loss, hacking or unauthorised access by third parties, REC Token will not be liable for any damages arising therefrom.',
      th: 'คุณรับผิดชอบความปลอดภัยของกระเป๋าส่วนตัว (กุญแจส่วนตัวของกระเป๋าและ seed phrase) และข้อมูลเข้าสู่ระบบทั้งหมด ในกรณีที่เกิดการสูญหาย การแฮก หรือการเข้าถึงโดยบุคคลที่สามโดยไม่ได้รับอนุญาต REC Token จะไม่รับผิดชอบต่อความเสียหายใด ๆ ที่เกิดขึ้นจากกรณีดังกล่าว',
    },
  },
  {
    title: { en: '5. Suspension / Termination of Use', th: '5. การระงับ / การสิ้นสุดการใช้งาน' },
    body: {
      en: 'We may suspend or terminate your account or access if we find that you have violated these Terms or behaved in a way that poses a risk to the security or integrity of the system.',
      th: 'เราอาจระงับหรือยุติบัญชีหรือการเข้าถึงของคุณ หากพบว่าคุณละเมิดข้อกำหนดเหล่านี้หรือมีพฤติกรรมที่ก่อความเสี่ยงต่อความปลอดภัยหรือความสมบูรณ์ของระบบ',
    },
  },
  {
    title: { en: '6. Changes to the Terms', th: '6. การเปลี่ยนแปลงข้อกำหนด' },
    body: {
      en: 'We may amend these Terms and Conditions from time to time by announcing such amendments on the website. Your continued use of the Platform after such announcement shall be deemed as acceptance of the amended Terms.',
      th: 'เราอาจแก้ไขข้อกำหนดและเงื่อนไขเหล่านี้เป็นระยะโดยประกาศการแก้ไขบนเว็บไซต์ การใช้แพลตฟอร์มต่อไปหลังการประกาศดังกล่าวถือเป็นการยอมรับข้อกำหนดที่แก้ไขแล้ว',
    },
  },
  {
    title: { en: '7. Disclaimer & Limitation of Liability', th: '7. ข้อปฏิเสธและข้อจำกัดความรับผิด' },
    body: {
      en: 'The Platform is provided on an "as-is" basis. We do not warrant the accuracy, completeness, security or suitability of the Platform for any particular purpose, and we shall not be liable for any direct or indirect damages arising from the use of the Platform (including but not limited to market conditions, hacking or loss of assets).',
      th: 'แพลตฟอร์มให้บริการตามสภาพ "as-is" เราไม่รับประกันความถูกต้อง ความครบถ้วน ความปลอดภัย หรือความเหมาะสมของแพลตฟอร์มเพื่อวัตถุประสงค์ใดโดยเฉพาะ และจะไม่รับผิดชอบต่อความเสียหายทางตรงหรือทางอ้อมที่เกิดจากการใช้แพลตฟอร์ม (รวมถึงแต่ไม่จำกัดเพียงสภาวะตลาด การแฮก หรือการสูญเสียสินทรัพย์)',
    },
  },
  {
    title: { en: '8. Governing Law and Jurisdiction', th: '8. กฎหมายที่ใช้บังคับและเขตอำนาจศาล' },
    body: {
      en: 'These Terms shall be governed by the laws of the Kingdom of Thailand. Any disputes arising hereunder shall be subject to the jurisdiction of Thai courts.',
      th: 'ข้อกำหนดเหล่านี้อยู่ภายใต้กฎหมายของราชอาณาจักรไทย ข้อพิพาทใด ๆ ที่เกิดขึ้นตามข้อกำหนดเหล่านี้อยู่ภายใต้เขตอำนาจของศาลไทย',
    },
  },
  {
    title: { en: '9. Severability', th: '9. การแยกส่วนของข้อกำหนด' },
    body: {
      en: 'If any provision of this document is found by a court to be void or unenforceable, the remaining provisions shall continue in full force and effect.',
      th: 'หากศาลวินิจฉัยว่าข้อกำหนดใดในเอกสารนี้เป็นโมฆะหรือไม่สามารถบังคับใช้ได้ ข้อกำหนดที่เหลือยังคงมีผลบังคับใช้อย่างสมบูรณ์ต่อไป',
    },
  },
];

export const COOKIES: LegalSection[] = [
  {
    title: { en: '1. What Are Cookies?', th: '1. คุกกี้คืออะไร' },
    body: {
      en: 'Cookies are small text files that a website sends to be stored on your device (computer, mobile phone, tablet or other devices) through a web browser. The information in cookies may serve as an identifier or store details about website usage, such as language preferences, display settings and access history.',
      th: 'คุกกี้คือไฟล์ข้อความขนาดเล็กที่เว็บไซต์ส่งไปจัดเก็บบนอุปกรณ์ของคุณ (คอมพิวเตอร์ โทรศัพท์มือถือ แท็บเล็ต หรืออุปกรณ์อื่น) ผ่านเว็บเบราว์เซอร์ ข้อมูลในคุกกี้อาจทำหน้าที่เป็นตัวระบุหรือจัดเก็บรายละเอียดการใช้งานเว็บไซต์ เช่น การตั้งค่าภาษา การตั้งค่าการแสดงผล และประวัติการเข้าถึง',
    },
  },
  {
    title: { en: '2. How We Use Cookies', th: '2. วิธีที่เราใช้คุกกี้' },
    body: { en: 'Our Platform uses cookies for the following purposes:', th: 'แพลตฟอร์มของเราใช้คุกกี้เพื่อวัตถุประสงค์ต่อไปนี้:' },
    bullets: [
      {
        en: 'To enable the website to function properly (Functional / Essential Cookies), for example remembering your theme, language and wallet connection status.',
        th: 'เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง (คุกกี้เพื่อการทำงาน / คุกกี้ที่จำเป็น) เช่น จดจำธีม ภาษา และสถานะการเชื่อมต่อกระเป๋าของคุณ',
      },
      {
        en: 'To analyse usage behaviour (Analytics Cookies) in order to improve UX, UI and Platform performance.',
        th: 'เพื่อวิเคราะห์พฤติกรรมการใช้งาน (คุกกี้วิเคราะห์) และปรับปรุง UX, UI และประสิทธิภาพของแพลตฟอร์ม',
      },
      { en: 'For security purposes, such as preventing attacks and impersonation.', th: 'เพื่อวัตถุประสงค์ด้านความปลอดภัย เช่น ป้องกันการโจมตีและการสวมรอย' },
    ],
  },
  {
    title: { en: '3. Managing Cookies', th: '3. การจัดการคุกกี้' },
    body: {
      en: 'You can configure or refuse cookies via your web browser settings. However, please note that disabling certain types of cookies may cause some parts of our website to function improperly.',
      th: 'คุณสามารถตั้งค่าหรือปฏิเสธคุกกี้ผ่านการตั้งค่าเว็บเบราว์เซอร์ อย่างไรก็ตาม โปรดทราบว่าการปิดคุกกี้บางประเภทอาจทำให้บางส่วนของเว็บไซต์ของเราทำงานไม่ถูกต้อง',
    },
  },
  {
    title: { en: '4. Consent', th: '4. ความยินยอม' },
    body: {
      en: 'By accessing and using our website and Platform, you are deemed to have consented to our use of cookies as described in this Policy. If you do not consent, please disable cookies via your browser or discontinue use of the service.',
      th: 'การเข้าถึงและใช้เว็บไซต์และแพลตฟอร์มของเราถือว่าคุณยินยอมให้เราใช้คุกกี้ตามที่อธิบายในนโยบายนี้ หากคุณไม่ยินยอม กรุณาปิดคุกกี้ผ่านเบราว์เซอร์หรือหยุดใช้บริการ',
    },
  },
  {
    title: { en: '5. Changes to This Policy', th: '5. การเปลี่ยนแปลงนโยบายนี้' },
    body: {
      en: 'We reserve the right to update this Cookie Policy from time to time and will notify you via the website if there are any changes.',
      th: 'เราขอสงวนสิทธิ์ในการปรับปรุงนโยบายคุกกี้นี้เป็นระยะ และจะแจ้งให้คุณทราบผ่านเว็บไซต์หากมีการเปลี่ยนแปลง',
    },
  },
];

export const LEGAL_META = {
  privacy: {
    title: 'Privacy Policy',
    thaiTitle: 'นโยบายความเป็นส่วนตัว',
    description: 'How RECTOKEN collects, uses and protects personal data.',
    thaiDescription: 'วิธีที่ RECTOKEN เก็บรวบรวม ใช้ และคุ้มครองข้อมูลส่วนบุคคล',
  },
  terms: {
    title: 'Terms of Service / Terms of Use',
    thaiTitle: 'ข้อกำหนดการให้บริการ / ข้อกำหนดการใช้งาน',
    description: 'The terms governing access to and use of the REC Token Platform.',
    thaiDescription: 'ข้อกำหนดในการเข้าถึงและใช้แพลตฟอร์ม REC Token',
  },
  cookies: {
    title: 'Cookie Policy',
    thaiTitle: 'นโยบายคุกกี้',
    description: 'How RECTOKEN uses cookies and how you can control them.',
    thaiDescription: 'วิธีที่ RECTOKEN ใช้คุกกี้และวิธีที่คุณควบคุมได้',
  },
} as const;
