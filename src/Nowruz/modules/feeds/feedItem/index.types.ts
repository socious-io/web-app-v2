import { Identity, Post } from 'src/core/api';

export interface FeedItemProps {
  postId: string;
  userIdentity: Identity;
  date: string;
  cause: string | null;
  content: string;
  media: string;
  likesCount: number;
  commentsCount: number;
  liked: boolean;
  likedIdentities?: Identity[];
  sharedPost?: {
    userIdentity: Identity | null;
    date: string;
    cause: string | null;
    content: string;
    media: string;
    title?: string;
  } | null;
  title?: string;
  updateFeedsListLiked: () => void;
  updateFeedsListRepost: (response: Post) => void;
}
