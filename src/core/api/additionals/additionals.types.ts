import { Media } from '../media/media.types';
import { Organization } from '../organizations/organizations.types';
export type AdditionalTypes = 'PORTFOLIO' | 'CERTIFICATE' | 'EDUCATION' | 'BENEFIT' | 'RECOMMENDATIONS';

export interface EducationMeta {
  field?: string;
  grade?: string;
  degree?: string;
  end_month?: string;
  end_year?: string;
  start_month?: string;
  start_year?: string;
  school_id: string;
  school_name: string;
}

export interface AdditionalReq {
  type: AdditionalTypes;
  title: string;
  description?: string;
  url?: string | null;
  image?: string | any;
  sub_image?: string | any;
  ref_identity_id?: string | null;
  meta?: EducationMeta | any | null;
  enabled: boolean | null;
}

export interface AdditionalRes extends AdditionalReq {
  identity_id: string;
  id: string;
  image: Media;
  sub_image: Media;
  create_at: Date;
  update_at: Date;
}
