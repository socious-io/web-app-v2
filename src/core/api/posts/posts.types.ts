import { Media, Identity } from 'src/core/api';

import { SocialCauses, PaginateRes } from '../types';

export interface PostReq {
  causes_tags: SocialCauses[];
  content: string;
  media?: string[] | null;
  title?: string;
  hashtags?: string[];
}

export interface PostReportReq {
  comment: string;
  blocked: boolean;
}

export interface CommentReq {
  content: string;
  reply_id?: string;
}

export interface PostsRes extends PaginateRes {
  items: Post[];
}

export interface CommentsRes extends PaginateRes {
  items: Comment[];
}

export interface Emoji {
  created_at: Date;
  emoji: string;
  id: string;
  identity: Identity;
}

export interface Post {
  id: string;
  likes: number;
  comments: number;
  shared: number;
  shared_id?: string;
  liked: boolean;
  liked_identities: Identity[];
  reported: boolean;
  shared_post?: Post;
  shared_from_identity?: Identity;

  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;

  identity_meta: Identity;
  causes_tags: SocialCauses[];
  content: string;
  media?: Media[];
  title?: string;
  emojis?: Emoji[];
  hashtags?: string[];
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
  identity_meta: Identity['identity_meta'];
  identity_type: Identity['type'];
  created_at: Date;
  updated_at: Date;
  emojis?: Emoji[];
}
