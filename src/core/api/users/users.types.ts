// -------------------- Requests ----------------------

export interface ReportReq {
  comment?: string;
  blocked: boolean;
}
export interface UpdateProfileReq {
  first_name: string;
  last_name: string;
  username: string;
  bio?: string;
  mission?: string;
  language?: string;
  country?: string;
  city?: string;
  geoname_id?: number | null;
  address?: string;
  phone?: string;
  wallet_address?: string;
  avatar?: string;
  cover_image?: string;
  social_causes?: string[];
  skills?: string[];
  mobile_country_code?: string;
  certificates?: string[];
  goals?: string;
  educations?: string[];
}

export interface UpdateWalletReq {
  wallet_address: string;
}

export interface LanguageReq {
  name: LanguageCode;
  level: 'BASIC' | 'CONVERSANT' | 'PROFICIENT' | 'FLUENT' | 'NATIVE';
}

export interface ExperienceReq {
  org_id: string;
  title: string;
  description?: string;
  skills?: string[];
  start_at: string;
  end_at?: string;
}

export interface ChangePasswordReq {
  current_password: string;
  password: string;
}

export interface ChangePasswordDirectReq {
  password: string;
}

export interface DeleteUserReq {
  reason: string;
}

// -------------------- Responses ----------------------

export interface User {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  country?: string;
  mission?: string;
  bio?: string;
  impact_points: number;
  skills: string[];
  followers: number;
  followings: number;
  wallet_address?: string;
  proofspace_connect_id?: string;
  phone?: string;
  address?: string;
  social_causes: string[];
  avatar?: string;
  cover_image?: string;
  reported: boolean;
  mobile_country_code?: string;
  open_to_work: boolean;
  open_to_volunteer: boolean;
  languages?: Language[] | null;
  experiences?: Experience[] | null;
  created_at: Date;
}

export interface Language extends LanguageReq {
  id: string;
  created_at: Date;
}

export interface Experience extends ExperienceReq {
  id: string;
  org: {
    id: string;
    name: string;
    shortname: string;
    bio?: string;
    website?: string;
  };
  created_at: Date;
}

export type LanguageCode =
  | 'AA'
  | 'AB'
  | 'AE'
  | 'AF'
  | 'AK'
  | 'AM'
  | 'AN'
  | 'AR'
  | 'AS'
  | 'AV'
  | 'AY'
  | 'AZ'
  | 'BA'
  | 'BE'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BR'
  | 'BS'
  | 'CA'
  | 'CE'
  | 'CH'
  | 'CO'
  | 'CR'
  | 'CS'
  | 'CU'
  | 'CV'
  | 'CY'
  | 'DA'
  | 'DE'
  | 'DV'
  | 'DZ'
  | 'EE'
  | 'EL'
  | 'EN'
  | 'EO'
  | 'ES'
  | 'ET'
  | 'EU'
  | 'FA'
  | 'FF'
  | 'FI'
  | 'FJ'
  | 'FO'
  | 'FR'
  | 'FY'
  | 'GA'
  | 'GD'
  | 'GL'
  | 'GN'
  | 'GU'
  | 'GV'
  | 'HA'
  | 'HE'
  | 'HI'
  | 'HO'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'HY'
  | 'HZ'
  | 'IA'
  | 'ID'
  | 'IE'
  | 'IG'
  | 'II'
  | 'IK'
  | 'IO'
  | 'IS'
  | 'IT'
  | 'IU'
  | 'JA'
  | 'JV'
  | 'KA'
  | 'KG'
  | 'KI'
  | 'KJ'
  | 'KK'
  | 'KL'
  | 'KM'
  | 'KN'
  | 'KO'
  | 'KR'
  | 'KS'
  | 'KU'
  | 'KV'
  | 'KW'
  | 'KY'
  | 'LA'
  | 'LB'
  | 'LG'
  | 'LI'
  | 'LN'
  | 'LO'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'MG'
  | 'MH'
  | 'MI'
  | 'MK'
  | 'ML'
  | 'MN'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MY'
  | 'NA'
  | 'NB'
  | 'ND'
  | 'NE'
  | 'NG'
  | 'NL'
  | 'NN'
  | 'NO'
  | 'NR'
  | 'NV'
  | 'NY'
  | 'OC'
  | 'OJ'
  | 'OM'
  | 'OR'
  | 'OS'
  | 'PA'
  | 'PI'
  | 'PL'
  | 'PS'
  | 'PT'
  | 'QU'
  | 'RM'
  | 'RN'
  | 'RO'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SI'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SQ'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SU'
  | 'SV'
  | 'SW'
  | 'TA'
  | 'TE'
  | 'TG'
  | 'TH'
  | 'TI'
  | 'TK'
  | 'TL'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TS'
  | 'TT'
  | 'TW'
  | 'TY'
  | 'UG'
  | 'UK'
  | 'UR'
  | 'UZ'
  | 'VE'
  | 'VI'
  | 'VO'
  | 'WA'
  | 'WO'
  | 'XH'
  | 'YI'
  | 'YO'
  | 'ZA'
  | 'ZH'
  | 'ZU';
