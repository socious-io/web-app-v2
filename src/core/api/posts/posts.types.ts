import { Media, Identity } from 'src/core/api';

import { SocialCauses, PaginateRes } from '../types';

export interface PostReq {
  content: string;
  causes_tags: SocialCauses[];
  hashtags?: string[];
  media?: string[];
}

export interface PostReportReq {
  comment: string;
  blocked: boolean;
}

export interface CommentReq {
  content: string;
  replay_id?: string;
}

export interface PostsRes extends PaginateRes {
  items: Post[];
}

export interface CommentsRes extends PaginateRes {
  items: Comment[];
}

export interface Post {
  id: string;
  likes: number;
  shared: number;
  shared_id?: string;
  liked: boolean;
  reported: boolean;
  shared_post?: string;
  shared_from_identity?: string;

  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;

  identity_meta: Identity;
  content: string;
  causes_tags: SocialCauses[];
  hashtags?: string[];
  media?: Media[];
}

export interface Comment {
  id: string;
  post_id: string;
  content: string;
  reply_id?: string;
  replied: boolean;
  likes: number;
  reported: boolean;
  liked: boolean;
  identity_meta: Identity;
  created_at: Date;
  updated_at: Date;
}
