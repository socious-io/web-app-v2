export interface SearchReq {
  type: 'projects' | 'users' | 'posts' | 'organizations';
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
}

export interface CurrentIdentity extends Identity {
  current: boolean;
  primary: boolean;
}
