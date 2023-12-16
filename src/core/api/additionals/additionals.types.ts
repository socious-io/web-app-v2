import { Media } from '../media/media.types';
export type AdditionalTypes = 'PORTFOLIO' | 'CERTIFICATE' | 'EDUCATION' | 'BENEFIT' | 'RECOMMENDATIONS';

export interface AdditionalReq {
  type: AdditionalTypes;
  title: string;
  description: string;
  url: string | null;
  image: string | any;
  sub_image: string | any;
  identity_id: string;
  ref_identity_id: string | null;
  meta: any | null;
  enabled: boolean | null;
}

export interface AdditionalRes extends AdditionalReq {
  id: string;
  image: Media;
  sub_image: Media;
  create_at: Date;
  update_at: Date;
}
