export interface FeedActionsProps {
  liked: boolean;
  onLikeClick: (liked: boolean) => void;
  onCommentClick: () => void;
  onRepostClick: () => void;
  hasRepostAction?: boolean;
}
