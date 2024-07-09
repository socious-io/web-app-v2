import { Media } from '../media/media.types';
import { Organization } from '../organizations/organizations.types';
import { PaginateRes } from '../types';
import { Education, Experience, User } from '../users/users.types';

export type CredentialStatus = 'PENDING' | 'APPROVED' | 'SENT' | 'ISSUED' | 'REJECTED' | 'CLAIMED';

export interface CredentialExperienceRes {
  id: string;
  status: CredentialStatus;
  experience: Experience;
  user: User;
  org: Organization;
  avatar?: Media;
  created_at: Date;
  updated_at: Date;
  org_image?: Media;
}

export interface CredentialEducationRes {
  id: string;
  status: CredentialStatus;
  education: Education;
  user: User;
  org: Organization;
  avatar?: Media;
  created_at: Date;
  updated_at: Date;
  org_image?: Media;
}

export interface ClaimVCRes {
  id: string;
  url: string;
  short_url: string;
}

export interface CredentialExperiencePaginateRes extends PaginateRes {
  items: CredentialExperienceRes[];
}
export interface CredentialEducationPaginateRes extends PaginateRes {
  items: CredentialEducationRes[];
}

export interface RequestVerificationRes {
  id: string;
  status: string;
  identity_id: string;
  connection_id: string;
  connection_url: string;
  short_url: string;
  present_id: string;
  body: null;
  created_at: Date;
  updated_at: Date;
}

export interface OrgRequestVerificationRes {
  id: string;
  identity_id: string;
  status: CredentialStatus;
  created_at: Date;
  updated_at: Date;
  documents: [
    {
      id: string;
      media_id: string;
      verification_id: string;
      created_at: Date;
      updated_at: Date;
    },
  ];
}
export interface RequestVerificationStatusRes {
  message: string;
  verified: boolean;
}
