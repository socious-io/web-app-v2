import { SocialCauses, PaginateRes, OrganizationType } from '../types';

export interface OrganizationReq {
  name: string;
  shortname: string;
  bio?: string;
  description?: string;
  email: string;
  phone?: string;
  type?: OrganizationType;
  country?: string;
  city?: string;
  geoname_id?: number;
  address?: string;
  social_causes?: SocialCauses[];
  website?: string;
  mobile_country_code?: string;
  image?: string | any;
  cover_image?: string | any;
  mission?: string;
  culture?: string;
}

export interface OrganizationsRes extends PaginateRes {
  items: Organization[];
}

export interface MembersRes extends PaginateRes {
  items: Member[];
}

export interface Organization extends OrganizationReq {
  id: string;
  followers: number;
  followings: number;
  wallet_address?: string;
  impact_points: number;
  image?: Image;
  cover_image?: Image;
  mobile_country_code?: string;
  created_by?: string;
  shortname: string;
  status: string;
  search_tsv: string;
  other_party_id: string;
  other_party_title: string;
  other_party_url: string;
  geoname_id?: number;
  verified_impact: boolean;
  hiring: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Image {
  id: string;
  identity_id: string;
  filename: string;
  url: string;
  created_at: Date;
}

export interface Member {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}
