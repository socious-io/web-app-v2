export interface PaginateReq {
  page?: number;
  limit?: number;
}
export interface FilterReq extends PaginateReq {
  [key: string]: any;
}

export interface SuccessRes {
  message: string;
}

export interface PaginateRes {
  page: number;
  limit: number;
  total_count: number;
  items: any[];
}

export interface PaginateResV3<T> {
  page: number;
  limit: number;
  total: number;
  results: T[];
}

export type SocialCauses =
  | 'SOCIAL'
  | 'POVERTY'
  | 'HOMELESSNESS'
  | 'HUNGER'
  | 'HEALTH'
  | 'SUBSTANCE_ABUSE'
  | 'MENTAL'
  | 'BULLYING'
  | 'SECURITY'
  | 'EDUCATION'
  | 'GENDER_EQUALITY'
  | 'GENDER_BASED_VIOLENCE'
  | 'SEXUAL_VIOLENCE'
  | 'DOMESTIC_VIOLENCE'
  | 'WATER_SANITATION'
  | 'SUSTAINABLE_ENERGY'
  | 'DECENT_WORK'
  | 'INEQUALITY'
  | 'MINORITY'
  | 'MULTICULTURALISM'
  | 'DIVERSITY_INCLUSION'
  | 'INDIGENOUS_PEOPLES'
  | 'DISABILITY'
  | 'LGBTQI'
  | 'REFUGEE'
  | 'MIGRANTS'
  | 'ORPHANS'
  | 'CHILD_PROTECTION'
  | 'COMMUNITY_DEVELOPMENT'
  | 'DEPOPULATION'
  | 'OVERPOPULATION'
  | 'HUMAN_RIGHTS'
  | 'SUSTAINABILITY'
  | 'RESPONSIBLE_CONSUMPTION'
  | 'CLIMATE_CHANGE'
  | 'NATURAL_DISASTERS'
  | 'BIODIVERSITY'
  | 'ANIMAL_RIGHTS'
  | 'ARMED_CONFLICT'
  | 'PEACEBUILDING'
  | 'DEMOCRACY'
  | 'CIVIC_ENGAGEMENT'
  | 'JUSTICE'
  | 'GOVERNANCE'
  | 'CRIME_PREVENTION'
  | 'CORRUPTION'
  | 'OTHER'
  | 'RURAL_DEVELOPMENT'
  | 'VEGANISM'
  | 'BLACK_LIVES_MATTER'
  | 'ISLAMOPHOBIA'
  | 'ANTI_SEMITISM'
  | 'ABORTION'
  | 'EUTHANASIA'
  | 'NEURODIVERSITY'
  | 'SUSTAINABLE_COMMUNITIES'
  | 'BIODIVERSITY_LIFE_BELOW_WATER'
  | 'PEACE_JUSTICE'
  | 'COLLABORATION_FOR_IMPACT'
  | 'INNOVATION';

export type SDG =
  | 'HEALTH'
  | 'LIFE'
  | 'REDUCED_INEQUALITIES'
  | 'PEACE_JUSTICE'
  | 'SUSTAINABLE_CITIES_COMMUNITIES'
  | 'GENDER_EQUALITY'
  | 'CLIMATE_ACTION'
  | 'NO_POVERTY'
  | 'LIFE_BELOW_WATER'
  | 'GOALS_PARTNERSHIPS'
  | 'ZERO_HUNGER'
  | 'EDUCATION_QUALITY'
  | 'CLEAN_WATER_SANITATION'
  | 'ENERGY'
  | 'ECONOMIC_GROWTH'
  | 'INDUSTRY_INNOVATION_INFRASTRUCTURE'
  | 'RESPONSIBLE_CONSUMPTION_PRODUCTION'
  | 'OTHER';

export type ApplicantStatus = 'PENDING' | 'OFFERED' | 'REJECTED' | 'WITHDRAWN' | 'APPROVED' | 'HIRED';

export type UserStatusType = 'ACTIVE' | 'INACTIVE' | 'SUSPEND';

export type ProjectLengthType =
  | 'LESS_THAN_A_DAY'
  | 'LESS_THAN_A_MONTH'
  | '1_3_MONTHS'
  | '3_6_MONTHS'
  | '6_MONTHS_OR_MORE';

export type ProjectType = 'ONE_OFF' | 'PART_TIME' | 'FULL_TIME';

export type ProjectRemotePreferenceType = 'ONSITE' | 'REMOTE' | 'HYBRID';

export type ProjectStatusType = 'DRAFT' | 'EXPIRE' | 'ACTIVE';

export type ProjectPaymentType = 'VOLUNTEER' | 'PAID';

export type ProjectPaymentSchemeType = 'HOURLY' | 'FIXED';

export type CommitmentPeriod = 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export type OrganizationType =
  | 'SOCIAL'
  | 'NONPROFIT'
  | 'COOP'
  | 'IIF'
  | 'PUBLIC'
  | 'INTERGOV'
  | 'DEPARTMENT'
  | 'OTHER'
  | 'STARTUP';

export type NotificationType =
  | 'FOLLOWED'
  | 'COMMENT_LIKE'
  | 'POST_LIKE'
  | 'CHAT'
  | 'SHARE_POST'
  | 'SHARE_PROJECT'
  | 'COMMENT'
  | 'APPLICATION'
  | 'OFFER'
  | 'REJECT'
  | 'APPROVED'
  | 'HIRED'
  | 'PROJECT_COMPLETE'
  | 'ASSIGNEE_CANCELED'
  | 'ASSIGNER_CANCELED'
  | 'ASSIGNER_CONFIRMED'
  | 'CONNECT'
  | 'ACCEPT_CONNECT'
  | 'MEMBERED'
  | 'REFERRAL_JOINED'
  | 'REFERRAL_VERIFIED'
  | 'REFERRAL_HIRED'
  | 'REFERRAL_HIRED'
  | 'REFERRAL_COMPLETED_JOB'
  | 'REFERRAL_CONFIRMED_JOB'
  | 'EXPERIENCE_VERIFY_REQUEST'
  | 'EXPERIENCE_VERIFY_APPROVED'
  | 'EXPERIENCE_VERIFY_REJECTED'
  | 'EXPERIENCE_ISSUED'
  | 'EXPERIENCE_ISSUED_APPROVED'
  | 'EXPERIENCE_ISSUED_REJECTED';

export type NotificationTitle =
  | 'FOLLOWED'
  | 'COMMENT_LIKE'
  | 'POST_LIKE'
  | 'CHAT'
  | 'SHARE_POST'
  | 'SHARE_PROJECT'
  | 'COMMENT'
  | 'APPLICATION'
  | 'OFFER'
  | 'REJECT'
  | 'APPROVED'
  | 'HIRED'
  | 'PROJECT_COMPLETE'
  | 'ASSIGNEE_CANCELED'
  | 'ASSIGNER_CANCELED'
  | 'ASSIGNER_CONFIRMED'
  | 'CONNECT'
  | 'ACCEPT_CONNECT'
  | 'MEMBERED'
  | 'REFERRAL_JOINED'
  | 'REFERRAL_VERIFIED'
  | 'REFERRAL_HIRED'
  | 'REFERRAL_HIRED'
  | 'REFERRAL_COMPLETED_JOB'
  | 'REFERRAL_CONFIRMED_JOB'
  | 'EXPERIENCE_VERIFY_REQUEST'
  | 'EXPERIENCE_VERIFY_APPROVED'
  | 'EXPERIENCE_VERIFY_REJECTED'
  | 'EXPERIENCE_ISSUED'
  | 'EXPERIENCE_ISSUED_APPROVED'
  | 'EXPERIENCE_ISSUED_REJECTED';

export type IdentityType = 'ORG' | 'USER';

export type ChatType = 'CHAT' | 'GROUPED' | 'CHANNEL';

export type ChatMemberType = 'MEMBER' | 'ADMIN';

export type SearchType = 'POSTS' | 'USERS' | 'RELATED_USERS' | 'PROJECTS' | 'CHATS' | 'ORGANIZATIONS';

export type MediaContentType =
  | 'image/jpeg'
  | 'image/png'
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export type PaymentCurrency = 'USD' | 'JPY';

export type PaymentService = 'STRIPE' | 'CRYPTO';

export type PaymentMode = 'FIAT' | 'CRYPTO';

export type LanguageLevel = 'BASIC' | 'CONVERSANT' | 'PROFICIENT' | 'FLUENT' | 'NATIVE';

export type MissionStatus = 'ACTIVE' | 'COMPLETE' | 'CONFIRMED' | 'CANCELED' | 'KICKED_OUT';

export type OfferStatus = 'PENDING' | 'WITHDRAWN' | 'APPROVED' | 'HIRED' | 'CLOSED' | 'CANCELED';

export type ConnectStatus = 'PENDING' | 'CONNECTED' | 'BLOCKED';

export type OAuthProviders = 'STRIPE';

export type PaymentChannel = 'ONLINE' | 'OFFLINE';

export type AddressType = 'HOME' | 'MAILING' | 'BILLING';

export type GoalType = 'SHORT_TERM' | 'MID_TERM' | 'LONG_TERM';

export type GoalStatus = 'IN_PROGRESS' | 'COMPLETE' | 'CANCELED';

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

export type CapacitorPlatform = 'mobile' | 'web' | 'ios' | 'android' | 'all';
