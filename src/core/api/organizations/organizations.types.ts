import { AdditionalRes } from '../additional/additional.types';
import { Media } from '../media/media.types';
import { SocialCauses, PaginateRes, OrganizationType, ConnectStatus } from '../types';

export type OrganizationSize = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'L';

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
  social_causes?: string[];
  website?: string;
  mobile_country_code?: string;
  image?: string | any;
  cover_image?: string | any;
  mission?: string;
  culture?: string;
  industry?: string;
  size?: OrganizationSize;
}

export type OrganizationsRes = PaginateRes<Organization>;

export type MembersRes = PaginateRes<Member>;

export interface PublicOrganization {
  id: string;
  name: string;
  shortname: string;
  email: string;
  bio: string | null;
  description: string | null;
  website: string | null;
  address: string | null;
  country: string | null;
  city: string | null;
  benefits: AdditionalRes[] | null;
  impact_points: number;
  social_causes: SocialCauses[] | null;
  follower: boolean;
  followers: number;
  following: boolean;
  followings: number;
  connections: number;
  connection_id: string | null;
  connection_status: ConnectStatus | null;
  culture: string | null;
  did: string | null;
  geoname_id?: number;
  type: OrganizationType | null;
  image: Media | null;
  cover_image: Media | null;
  hiring: boolean;
  impact_detected: boolean;
  industry: string | null;
  mission: string | null;
  mobile_country_code: string | null;
  phone: string | null;
  recommendations?: AdditionalRes[];
  status: string;
  verified_impact: boolean;
  verified: boolean;
  wallet_address: string | null;
  employee_count: string | null;
  size: OrganizationSize | null;
  created_at: Date;
  //FIXME: no in v3, tell Mohammad
  avatar_id: string | null;
  avatar: Media | null; // replace with image
  cover_id: string | null;
  cover: Media | null; // replace with cover_image
}

export interface Organization extends PublicOrganization {
  //ّFIXME: no private Organization
  updated_at: Date;
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

export type IndustriesRes = PaginateRes<Industry>;
