import { Media } from '../media/media.types';
import { Organization } from '../organizations/organizations.types';
import { PaginateRes } from '../types';
import { Experience, User } from '../users/users.types';

export interface CredentialExperienceRes {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'SENT' | 'REJECTED' | 'CLAIMED';
  experience: Experience;
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
