import {
  AdditionalRes,
  NewContract,
  Category,
  Mission,
  Job,
  Media,
  Organization,
  Identity,
  Event,
  CredentialStatus,
  Offer,
} from '..';
import { LanguageCode, SDG, PaginateRes, ConnectStatus, ProjectType, LanguageLevel, SocialCauses } from '../types';

export type PreferenceValue =
  | 'ON'
  | 'OFF'
  | 'STRONG_HIGH'
  | 'MODERATE_HIGH'
  | 'NEUTRAL'
  | 'STRONG_LOW'
  | 'MODERATE_LOW'
  | 'PREFER_NOT_SAY';

export interface Wallet {
  id: string;
  address: string;
  network: string;
  testnet: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface PublicUser {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  mission: string | null;
  bio: string | null;
  impact_points: number;
  social_causes: SocialCauses[] | null;
  followers: number;
  followings: number;
  skills: string[] | null;
  open_to_work: boolean;
  open_to_volunteer: boolean;
  identity_verified: boolean;
  events: Event[] | null;
  tags: string[] | null;
  avatar_id: string | null;
  avatar: Media | null;
  cover_id: string | null;
  cover: Media | null;
  created_at: Date;
  //FIXME: no in v3, tell mohammad
  follower: boolean;
  following: boolean;
  connections: number;
  connection_id: string | null;
  connection_status: ConnectStatus | null;
}

export interface User extends PublicUser {
  email: string;
  phone: string | null;
  wallet_address: string | null;
  city: string | null;
  address: string | null;
  languages: Language[] | null;
  skills: string[] | null;
  country: string | null;
  mobile_country_code: string | null;
  certificates: AdditionalRes[] | null;
  educations: Education[] | null;
  geoname_id: string | null;
  proofspace_connect_id: string | null;
  is_contributor: boolean;
  wallets: Wallet[] | null;
  //FIXME: no in v3, tell mohammad
  experiences: Experience[] | null;
  portfolios: AdditionalRes[] | null;
  rate: number;
  recommendations: AdditionalRes[] | null;
  reported: boolean;
}

export type UsersRes = PaginateRes<User>;

export type Badge = {
  total_points: number;
  social_cause_category: SDG;
};
export interface Badges {
  badges: Badge[];
}

export interface ImpactPoint {
  id: string;
  job_category: { name: string };
  mission: Mission;
  project: Job;
  created_at: Date;
  total_points: number;
  organization: Identity;
  offer: Offer;
}

export type ImpactPoints = PaginateRes<ImpactPoint>;

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
  address: string;
  network: string;
  testnet: boolean;
}

export interface LanguageReq {
  name: LanguageCode;
  level: LanguageLevel;
}

export interface Language extends LanguageReq {
  id: string;
  created_at: Date;
}

export interface Credential {
  id: string;
  status: CredentialStatus;
  message?: string;
  connection_id?: string;
  connection_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ExperienceReq {
  org_id: string;
  title: string;
  description?: string;
  skills?: string[];
  start_at: string;
  end_at?: string;
  job_category_id?: string;
  country?: string;
  city?: string;
  employment_type?: ProjectType;
  weekly_hours?: number | null;
  total_hours?: number | null;
}

export interface Experience extends ExperienceReq {
  id: string;
  org: Organization;
  job_category?: Category;
  created_at?: Date;
  credential?: Credential;
  message?: string;
}

export interface EducationsReq {
  org_id: string;
  title: string;
  description?: string;
  degree?: string;
  grade?: string;
  start_at: string;
  end_at?: string;
}

export interface Education extends EducationsReq {
  id: string;
  org: Organization;
  credential?: Credential;
  message?: string;
}

export interface ChangePasswordReq {
  current_password?: string;
  password: string;
}

export interface DeleteUserReq {
  reason: string;
}

export interface Preference {
  title: string;
  value: PreferenceValue;
  description?: string | null;
}

export interface ReferReq {
  emails: string[];
}

export interface ImportExperiencesRes {
  job: string;
  company: Organization;
  end_date: Date;
  location: string;
  start_date: Date;
  descriptions: string;
}

export interface ImportEducationRes {
  name: string;
  grade: string;
  degree: string;
  end_at: string;
  start_at: string;
  organization: Organization;
}

export interface ImportRes {
  id: string;
  identity_id: string;
  // TODO: define all possible types
  type: 'LINKDIN';
  //TODO: define all possible statuses
  status: string; //"PENDING"
  updated_at: Date;
  created_at: Date;
  body: {
    name: string;
    email: string;
    skills: string[];
    summary: string;
    Languages: LanguageReq[];
    educations: ImportEducationRes[];
    experiences: ImportExperiencesRes[];
  };
}

export interface Review {
  id: string;
  content: string;
  identity_id: string;
  project_id: string;
  created_at: Date;
  contract_id: string;
  satisfied: boolean;
  identity: Identity;
  contract: NewContract;
}

export type Reviews = PaginateRes<Review>;
