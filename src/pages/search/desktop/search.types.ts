import { MediaMeta } from 'src/core/api';
import { Pagination } from 'src/core/types';

export type SearchProps = {
  title: string;
};

export type JobModel = Pagination<JobItems[]>;

export interface JobItems {
  description: string;
  title: string;
  id: string;
  city: string;
  created_at: string;
  identity_meta: IdentityMetaObj;
  causes_tags: string[];
  country: string;
  payment_range_higher: string;
  payment_range_lower: string;
  payment_type: string;
  project_type: string;
}

export type PostModel = Pagination<PostItems[]>;

export interface PostItems {
  causes_tags: string[];
  id: string;
  content: string;
  liked: boolean;
  likes: number;
  created_at: string;
  identity_meta: IdentityMetaObj;
  media: MediaMeta[];
}

export interface IdentityMetaObj {
  name: string;
}

export interface PayloadModel {
  page?: number;
  filter: Record<string, string>;
  type: 'posts' | 'users' | 'related_users' | 'projects' | 'chats' | 'organizations';
  q: string;
}
