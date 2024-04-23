import { Media } from '../media/media.types';
import { Organization } from '../organizations/organizations.types';
import { PaginateRes } from '../types';
import { Education, Experience, User } from '../users/users.types';

export interface CredentialExperienceRes {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'SENT' | 'ISSUED' | 'REJECTED' | 'CLAIMED';
  experience: Experience;
  user: User;
  org: Organization;
  avatar?: Media;
  created_at: Date;
  updated_at: Date;
}

export interface CredentialEducationRes {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'SENT' | 'ISSUED' | 'REJECTED' | 'CLAIMED';
  education: Education;
  user: User;
  org: Organization;
  avatar?: Media;
  created_at: Date;
  updated_at: Date;
}

export interface ClaimVCRes {
  id: string;
  url: string;
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
  present_id: string;
  body: null;
  created_at: Date;
  updated_at: Date;
}

export interface RequestVerificationStatusRes {
  message: string;
  verified: boolean;
}
