import { CredentailStatus, PaginateRes } from 'src/core/api';
import { UserType } from 'src/core/types';

export interface SearchReq {
  type: 'projects' | 'users' | 'posts' | 'organizations' | 'applicants';
  q: string;
  filter: any;
}

export interface DeviceReq {
  token: string;
  meta: any;
}

export interface Device extends DeviceReq {
  id: string;
  created_at: Date;
}

export interface Identity {
  id: string;
  type: 'organizations' | 'users';
  meta: OrgMeta | UserMeta;
  created_at: Date;
  verification_status: CredentailStatus;
  identity_meta?: UserMeta | OrgMeta;
  identity_type?: UserType;
}

export interface UserMeta {
  id: string;
  city: string;
  name: string;
  email: string;
  avatar?: string;
  status: string;
  address: null;
  country: string;
  username: string;
  open_to_work: boolean;
  wallet_address: null;
  open_to_volunteer: boolean;
  identity_verified: boolean;
  verification_status: null | 'PENDING' | 'APPROVED' | 'REJECTED';
  is_contributor?: boolean;
}

export interface OrgMeta {
  id: string;
  city: string;
  name: string;
  email: string;
  image: string;
  hiring: boolean;
  status: string;
  address?: string;
  country: string;
  mission: string;
  shortname: string;
  description?: string;
  wallet_address?: string;
  verified_impact: boolean;
  verified: boolean;
}

export interface CurrentIdentity extends Identity {
  current: boolean;
  primary: boolean;
}

export interface Skill {
  id: string;
  name: string;
  created_at: Date;
}

export interface SkillRes extends PaginateRes {
  items: Skill[];
}
