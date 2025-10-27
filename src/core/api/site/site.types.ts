import {
  ApplicantsRes,
  CredentialStatus,
  JobsRes,
  OrganizationsRes,
  PaginateRes,
  PostsRes,
  ServicesRes,
  UsersRes,
  UserType,
} from 'src/core/api';

export type SearchTypeMap = {
  projects: JobsRes;
  users: UsersRes;
  organizations: OrganizationsRes;
  posts: PostsRes;
  applicants: ApplicantsRes;
};

export interface SearchReq {
  //FIXME: if all move to v3 we can add `services` to SearchTypeMap
  type: keyof SearchTypeMap | 'services';
  q: string;
  filter: any;
  sort?: any;
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
  verification_status: CredentialStatus;
  identity_meta?: UserMeta | OrgMeta;
  identity_type?: UserType;
}

export interface UserMeta {
  id: string;
  city: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  address?: string | null;
  country: string;
  username: string;
  open_to_work?: boolean;
  wallet_address?: string | null;
  open_to_volunteer?: boolean;
  identity_verified?: boolean;
  verification_status?: null | 'PENDING' | 'APPROVED' | 'REJECTED';
  is_contributor?: boolean;
}

export interface OrgMeta {
  id: string;
  city: string;
  name: string;
  email: string;
  image: string;
  hiring?: boolean;
  status?: string;
  address?: string;
  country: string;
  mission: string;
  shortname: string;
  description?: string;
  wallet_address?: string;
  verified_impact?: boolean;
  verified?: boolean;
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

export type SkillsRes = PaginateRes<Skill>;

export interface Event {
  id: string;
  title: string;
  description: string;
  event_at: Date;
  created_at: Date;
}

export type EventsRes = PaginateRes<Event>;
