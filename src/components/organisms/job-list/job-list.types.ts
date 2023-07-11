import { CSSProperties } from 'react';

export interface JobListProps extends CSSProperties {
  data: Job[];
  onMorePageClick: () => void;
  onClick: (id: string) => void;
  showMorePage: boolean;
}

export type Job = {
  id: string;
  applied: boolean;
  identity_id: string;
  description: string;
  project_type: 'FULL_TIME';
  project_length: 'LESS_THAN_A_MONTH';
  payment_currency: null;
  payment_range_lower: string;
  payment_range_higher: string;
  experience_level: 2;
  created_at: '2022-12-29T11:04:38.091Z';
  updated_at: '2022-12-29T11:04:38.091Z';
  deleted_at: null;
  status: 'ACTIVE';
  payment_type: 'VOLUNTEER' | 'PAID';
  payment_scheme: 'HOURLY' | 'FIXED';
  title: string;
  expires_at: null;
  country: 'IR';
  skills: ['UAT'];
  causes_tags: string[];
  old_id: null;
  other_party_id: null;
  other_party_title: null;
  other_party_url: null;
  remote_preference: 'HYBRID';
  search_tsv: "'-90':7 '60':6 'hourly':1,4 'test1':3 'volunteer':2,5";
  city: string;
  weekly_hours_lower: null;
  weekly_hours_higher: null;
  commitment_hours_lower: '60';
  commitment_hours_higher: '89';
  geoname_id: null;
  job_category_id: '4b7b8490-cde2-43e6-be2f-730c5ec0e163';
  identity_type: 'organizations';
  identity_meta: {
    id: '24bbb590-cfc5-45e3-a38e-0d40b8974e00';
    city: 'California, Maryland';
    name: string;
    email: string;
    image: string;
    status: 'ACTIVE';
    address: null;
    country: string;
    shortname: string;
    mission: string;
  };
  job_category: {
    id: '4b7b8490-cde2-43e6-be2f-730c5ec0e163';
    name: 'Data science';
    hourly_wage_dollars: 37.5;
    created_at: '2022-12-08T18:56:35.873285+00:00';
    updated_at: '2022-12-08T18:56:35.873285+00:00';
  } | null;
  applicants: 2;
};
