import { Identity, Media, Post } from 'src/core/api';

import { EditedData } from '../createPostModal/index.types';

export interface FeedItemProps {
  postId: string;
  userIdentity: Identity;
  date: string;
  cause: string | null;
  content: string;
  media: Media | null;
  likesCount: number;
  commentsCount: number;
  liked: boolean;
  likedIdentities?: Identity[];
  sharedPost?: {
    userIdentity: Identity | null;
    date: string;
    cause: string | null;
    content: string;
    media: Media | null;
    title?: string;
  } | null;
  updateFeedsListLiked: (postId: string) => void;
  updateFeedsListRepost: (response: Post) => void;
  updateFeedsListEdit: (data: EditedData) => void;
  updateFeedsListRemove: (postId: string) => void;
  title?: string;
}
