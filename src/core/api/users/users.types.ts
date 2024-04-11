import { Offer } from 'src/core/types';

import { AdditionalRes } from '../additionals/additionals.types';
import { Category, Mission } from '../jobs/jobs.types';
import { Job } from '../jobs/jobs.types';
import { Media } from '../media/media.types';
import { Organization } from '../organizations/organizations.types';
import { Identity } from '../site/site.types';
import { LanguageCode, SDG, PaginateRes, ConnectStatus } from '../types';
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
  job_category_id?: string;
  country?: string;
  city?: string;
  employment_type?: 'ONE_OFF' | 'PART_TIME' | 'FULL_TIME';
  weekly_hours?: number | null;
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

export interface User {
  id: string;
  username: string;
  email: string;
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
  avatar?: Media;
  cover_image?: Media;
  reported: boolean;
  mobile_country_code?: string;
  open_to_work: boolean;
  open_to_volunteer: boolean;
  languages?: Language[] | null;
  experiences?: Experience[] | null;
  created_at: Date;
  geoname_id?: string;
  educations?: AdditionalRes[];
  recommendations?: AdditionalRes[];
  portfolios?: AdditionalRes[];
  certificates?: AdditionalRes[];
  identity_verified: boolean;
  name?: string;
}

export interface UserProfile extends User {
  following: boolean;
  follower: boolean;
  connection_status: ConnectStatus | null;
  connection_id: string;
}

export interface Language extends LanguageReq {
  id: string;
  created_at: Date;
}

export interface Experience extends ExperienceReq {
  id: string;
  org: Organization;
  job_category: Category;
  created_at: Date;
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
  status: 'PENDING' | 'APPROVED' | 'SENT' | 'CLAIMED' | 'REJECTED';
  message?: string;
  connection_id?: string;
  connection_url?: string;
  created_at: Date;
  updated_at: Date;
}
