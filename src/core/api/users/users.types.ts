import { Offer } from 'src/core/types';

import { AdditionalRes } from '../additionals/additionals.types';
import { NewContract } from '../contracts/contracts.types';
import { Category, Mission } from '../jobs/jobs.types';
import { Job } from '../jobs/jobs.types';
import { Media } from '../media/media.types';
import { Organization } from '../organizations/organizations.types';
import { Identity, Event } from '../site/site.types';
import { LanguageCode, SDG, PaginateRes, ConnectStatus, ProjectType, LanguageLevel } from '../types';

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

export interface EducationsReq {
  org_id: string;
  title: string;
  description?: string;
  degree?: string;
  grade?: string;
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

export interface UsersRes extends PaginateRes {
  items: User[];
}

export interface Wallet {
  id: string;
  address: string;
  network: string;
  testnet: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  name: string;
  address: string | null;
  avatar: Media | null;
  bio: string | null;
  certificates: AdditionalRes[] | null;
  city: string | null;
  connection_id: string | null;
  connection_status: ConnectStatus | null;
  connections: number;
  country: string | null;
  cover_image: Media | null;
  educations: Education[] | null;
  events: Event[] | null;
  experiences: Experience[] | null;
  first_name: string;
  follower: boolean;
  followers: number;
  following: boolean;
  followings: number;
  geoname_id: string | null;
  id: string;
  identity_verified: boolean;
  impact_points: number;
  is_contributor: boolean | null;
  languages: Language[] | null;
  last_name: string;
  mission: string | null;
  mobile_country_code: string | null;
  open_to_volunteer: boolean;
  open_to_work: boolean;
  phone: string | null;
  portfolios: AdditionalRes[] | null;
  proofspace_connect_id: string | null;
  rate: number;
  recommendations: AdditionalRes[] | null;
  reported: boolean;
  skills: string[] | null;
  social_causes: string[] | null;
  username: string;
  wallet_address: string | null;
  wallets: Wallet[] | null;
  created_at: Date;
}

// export interface UserProfile extends User {
//   following: boolean;
//   follower: boolean;
//   connection_status: ConnectStatus | null;
//   connection_id: string;
//   is_contributor: boolean;
// }

export interface Language extends LanguageReq {
  id: string;
  created_at: Date;
}

export interface Experience extends ExperienceReq {
  id: string;
  org: Organization;
  job_category?: Category;
  created_at?: Date;
  credential?: Credential;
  message?: string;
}

export interface Education extends EducationsReq {
  id: string;
  org: Organization;
  credential?: Credential;
  message?: string;
}

export interface Badge {
  total_points: number;
  social_cause_category: SDG;
}
export interface Badges {
  badges: Badge[];
}

export interface ImpactPoint {
  id: string;
  job_category: {
    name: string;
  };
  mission: Mission;
  project: Job;
  created_at: Date;
  total_points: number;
  organization: Identity;
  offer: Offer;
}

export interface ImpactPoints extends PaginateRes {
  items: ImpactPoint[];
}

export interface Credential {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'SENT' | 'ISSUED' | 'CLAIMED' | 'REJECTED';
  message?: string;
  connection_id?: string;
  connection_url?: string;
  created_at: Date;
  updated_at: Date;
}

export type PreferenceValue =
  | 'ON'
  | 'OFF'
  | 'STRONG_HIGH'
  | 'MODERATE_HIGH'
  | 'NEUTRAL'
  | 'STRONG_LOW'
  | 'MODERATE_LOW'
  | 'PREFER_NOT_SAY';

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

export interface Reviews extends PaginateRes {
  items: Review[];
}

//FIXME Use this type after migrating to v3
export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  mission: string | null;
  impact_points: number;
  social_causes: string[];
  followers: number;
  followings: number;
  skills: string[];
  open_to_work: boolean;
  open_to_volunteer: boolean;
  identity_verified: boolean;
  events: string[];
  tags: string[];
  avatar_id: string | null;
  avatar: Media | null;
  cover_id: string | null;
  cover: Media | null;
  created_at: string;
}
