import axios from 'axios';
import BASE_URL from './config';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Country {
  _id: string;
  name: string;
  code: string;
  phoneCode: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
}

export interface Major {
  _id: string;
  name: string;
  field?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  results: number;
}

// ─── Fallback Data (22 Arab Countries & Standard Academic Majors) ─────────────

export const FALLBACK_ARAB_COUNTRIES: Country[] = [
  { _id: 'c1', name: 'Saudi Arabia 🇸🇦 (السعودية)', code: 'SA', phoneCode: '+966', currencyCode: 'SAR', currencyName: 'Saudi Riyal', currencySymbol: 'SR' },
  { _id: 'c2', name: 'Egypt 🇪🇬 (مصر)', code: 'EG', phoneCode: '+20', currencyCode: 'EGP', currencyName: 'Egyptian Pound', currencySymbol: 'LE' },
  { _id: 'c3', name: 'United Arab Emirates 🇦🇪 (الإمارات)', code: 'AE', phoneCode: '+971', currencyCode: 'AED', currencyName: 'UAE Dirham', currencySymbol: 'AED' },
  { _id: 'c4', name: 'Kuwait 🇰🇼 (الكويت)', code: 'KW', phoneCode: '+965', currencyCode: 'KWD', currencyName: 'Kuwaiti Dinar', currencySymbol: 'KD' },
  { _id: 'c5', name: 'Qatar 🇶🇦 (قطر)', code: 'QA', phoneCode: '+974', currencyCode: 'QAR', currencyName: 'Qatari Riyal', currencySymbol: 'QR' },
  { _id: 'c6', name: 'Bahrain 🇧🇭 (البحرين)', code: 'BH', phoneCode: '+973', currencyCode: 'BHD', currencyName: 'Bahraini Dinar', currencySymbol: 'BD' },
  { _id: 'c7', name: 'Oman 🇴🇲 (عُمان)', code: 'OM', phoneCode: '+968', currencyCode: 'OMR', currencyName: 'Omani Rial', currencySymbol: 'RO' },
  { _id: 'c8', name: 'Jordan 🇯🇴 (الأردن)', code: 'JO', phoneCode: '+962', currencyCode: 'JOD', currencyName: 'Jordanian Dinar', currencySymbol: 'JD' },
  { _id: 'c9', name: 'Lebanon 🇱🇧 (لبنان)', code: 'LB', phoneCode: '+961', currencyCode: 'LBP', currencyName: 'Lebanese Pound', currencySymbol: 'LBP' },
  { _id: 'c10', name: 'Iraq 🇮🇶 (العراق)', code: 'IQ', phoneCode: '+964', currencyCode: 'IQD', currencyName: 'Iraqi Dinar', currencySymbol: 'IQD' },
  { _id: 'c11', name: 'Syria 🇸🇾 (سوريا)', code: 'SY', phoneCode: '+963', currencyCode: 'SYP', currencyName: 'Syrian Pound', currencySymbol: 'SYP' },
  { _id: 'c12', name: 'Palestine 🇵🇸 (فلسطين)', code: 'PS', phoneCode: '+970', currencyCode: 'ILS', currencyName: 'Palestinian Shekel', currencySymbol: 'NIS' },
  { _id: 'c13', name: 'Yemen 🇾🇪 (اليمن)', code: 'YE', phoneCode: '+967', currencyCode: 'YER', currencyName: 'Yemeni Rial', currencySymbol: 'YR' },
  { _id: 'c14', name: 'Libya 🇱🇾 (ليبيا)', code: 'LY', phoneCode: '+218', currencyCode: 'LYD', currencyName: 'Libyan Dinar', currencySymbol: 'LD' },
  { _id: 'c15', name: 'Tunisia 🇹🇳 (تونس)', code: 'TN', phoneCode: '+216', currencyCode: 'TND', currencyName: 'Tunisian Dinar', currencySymbol: 'TD' },
  { _id: 'c16', name: 'Algeria 🇩🇿 (الجزائر)', code: 'DZ', phoneCode: '+213', currencyCode: 'DZD', currencyName: 'Algerian Dinar', currencySymbol: 'DA' },
  { _id: 'c17', name: 'Morocco 🇲🇦 (المغرب)', code: 'MA', phoneCode: '+212', currencyCode: 'MAD', currencyName: 'Moroccan Dirham', currencySymbol: 'MAD' },
  { _id: 'c18', name: 'Sudan 🇸🇩 (السودان)', code: 'SD', phoneCode: '+249', currencyCode: 'SDG', currencyName: 'Sudanese Pound', currencySymbol: 'SDG' },
  { _id: 'c19', name: 'Mauritania 🇲🇷 (موريتانيا)', code: 'MR', phoneCode: '+222', currencyCode: 'MRU', currencyName: 'Mauritanian Ouguiya', currencySymbol: 'MRU' },
  { _id: 'c20', name: 'Somalia 🇸🇴 (الصومال)', code: 'SO', phoneCode: '+252', currencyCode: 'SOS', currencyName: 'Somali Shilling', currencySymbol: 'SOS' },
  { _id: 'c21', name: 'Djibouti 🇩🇯 (جيبوتي)', code: 'DJ', phoneCode: '+253', currencyCode: 'DJF', currencyName: 'Djiboutian Franc', currencySymbol: 'DJF' },
  { _id: 'c22', name: 'Comoros 🇰🇲 (جزر القمر)', code: 'KM', phoneCode: '+269', currencyCode: 'KMF', currencyName: 'Comorian Franc', currencySymbol: 'CF' },
];

export const FALLBACK_MAJORS: Major[] = [
  { _id: 'm1', name: 'Computer Science (علوم الحاسب)', field: 'Engineering & Technology' },
  { _id: 'm2', name: 'Software Engineering (هندسة البرمجيات)', field: 'Engineering & Technology' },
  { _id: 'm3', name: 'Information Technology (تكنولوجيا المعلومات)', field: 'Engineering & Technology' },
  { _id: 'm4', name: 'Artificial Intelligence & Data Science (الذكاء الاصطناعي وعلوم البيانات)', field: 'Engineering & Technology' },
  { _id: 'm5', name: 'Cybersecurity (الأمن السيبراني)', field: 'Engineering & Technology' },
  { _id: 'm6', name: 'Electrical Engineering (الهندسة الكهربائية)', field: 'Engineering & Technology' },
  { _id: 'm7', name: 'Mechanical Engineering (الهندسة الميكانيكية)', field: 'Engineering & Technology' },
  { _id: 'm8', name: 'Civil Engineering (الهندسة المدنية)', field: 'Engineering & Technology' },
  { _id: 'm9', name: 'Chemical Engineering (الهندسة الكيميائية)', field: 'Engineering & Technology' },
  { _id: 'm10', name: 'Architecture (الهندسة المعمارية)', field: 'Engineering & Architecture' },
  { _id: 'm11', name: 'Business Administration (إدارة الأعمال)', field: 'Business & Finance' },
  { _id: 'm12', name: 'Accounting & Finance (المحاسبة والمالية)', field: 'Business & Finance' },
  { _id: 'm13', name: 'Marketing & Digital Media (التسويق والإعلام)', field: 'Business & Media' },
  { _id: 'm14', name: 'Economics & Political Science (الاقتصاد والعلوم السياسية)', field: 'Social Sciences' },
  { _id: 'm15', name: 'Medicine & Surgery (الطب والجراحة)', field: 'Medical Sciences' },
  { _id: 'm16', name: 'Pharmacy (الصيدلة)', field: 'Medical Sciences' },
  { _id: 'm17', name: 'Dentistry (طب الأسنان)', field: 'Medical Sciences' },
  { _id: 'm18', name: 'Nursing & Allied Health (التمريض والعلوم الصحية)', field: 'Medical Sciences' },
  { _id: 'm19', name: 'Law & Sharia (القانون والشريعة)', field: 'Law' },
  { _id: 'm20', name: 'Languages & Translation (اللغات والترجمة)', field: 'Humanities' },
  { _id: 'm21', name: 'Basic Sciences - Math/Physics/Chem (العلوم الأساسية)', field: 'Sciences' },
  { _id: 'm22', name: 'Education & Pedagogy (التربية والتعليم)', field: 'Education' },
];

// ─── API Functions ─────────────────────────────────────────────────────────────

export const getCountries = async (): Promise<Country[]> => {
  try {
    const res = await axios.get<PaginatedResponse<Country>>(
      `${BASE_URL}/countries`
    );
    if (res.data?.data && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // API call failed or endpoint unreachable, fallback to complete Arab countries list
  }
  return FALLBACK_ARAB_COUNTRIES;
};

export const getMajors = async (): Promise<Major[]> => {
  try {
    const res = await axios.get<PaginatedResponse<Major>>(`${BASE_URL}/majors`);
    if (res.data?.data && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // API call failed or endpoint unreachable, fallback to standard majors list
  }
  return FALLBACK_MAJORS;
};
