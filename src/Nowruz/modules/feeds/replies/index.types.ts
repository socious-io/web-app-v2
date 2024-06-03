import { Comment, Identity } from 'src/core/api';

export type SelectedEmoji = {
  emoji: string;
  identities: Partial<Identity>[];
};

export interface RepliesProps {
  postId: string;
  commentId: string;
  list: Comment[];
  showSeeMore?: boolean;
  onSeeMoreClick?: () => void;
}
