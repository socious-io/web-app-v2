import { CSSProperties } from 'react';

export interface PeopleListProps extends CSSProperties {
  data: People[];
  onMorePageClick: () => void;
  onClick: (people: People) => void;
  showMorePage: boolean;
}

export type People = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  geoname_id: number;
  mission: null | string;
  bio: null | string;
  impact_points: number;
  skills: Array<string>;
  followers: number;
  followings: number;
  created_at: string;
  wallet_address: null | string;
  social_causes: string[];
  proofspace_connect_id: null | string;
  phone: null | string;
  address: null | string;
  avatar: null | string;
  cover_image: null | string;
  reported: boolean;
  languages: null | string;
  experiences: null | string;
};
