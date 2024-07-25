import { Media } from '../media/media.types';
import { Credential, User } from '../users/users.types';
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
  school_city?: string;
  school_image?: string;
  awarded_date?: string;
  credential_name?: string;
}
export interface CertificateMeta {
  issue_month?: string;
  issue_year?: string;
  expire_month?: string;
  expire_year?: string;
  organization_id: string;
  organization_name: string;
  organization_city?: string;
  organization_image?: string;
  credential_id?: string;
  credential_url?: string;
}

export interface RecommendationMeta {
  recommeder: User;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AdditionalReq {
  type: AdditionalTypes;
  title: string;
  description?: string;
  url?: string | null;
  image?: string | any;
  sub_image?: string | any;
  ref_identity_id?: string | null;
  meta?: EducationMeta | CertificateMeta | RecommendationMeta | any | null;
  enabled: boolean | null;
}

export interface AdditionalRes extends AdditionalReq {
  identity_id: string;
  id: string;
  image?: Media;
  sub_image?: Media;
  create_at: Date;
  update_at: Date;
  credential?: Credential;
}
