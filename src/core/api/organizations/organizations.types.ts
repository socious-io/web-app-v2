import { AdditionalRes } from '../additionals/additionals.types';
import { Media } from '../media/media.types';
import { SocialCauses, PaginateRes, OrganizationType, ConnectStatus } from '../types';

export interface OrganizationReq {
  name: string;
  shortname?: string;
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
  industry?: string;
  size?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'L';
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
  connections?: number;
  wallet_address?: string;
  impact_points: number;
  image?: Media;
  cover_image?: Media;
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
  verified: boolean;
  hiring: boolean;
  recommendations?: AdditionalRes[];
  benefits?: AdditionalRes[];
  industry?: string;
  created_at: Date;
  updated_at: Date;
}
export interface OrganizationProfile extends Organization {
  following: boolean;
  follower: boolean;
  connection_status: ConnectStatus | null;
  connection_id: string;
}
export interface Member {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: { url: string };
}

export interface Industry {
  name: string;
}

export interface IndustryRes extends PaginateRes {
  items: Industry[];
}
