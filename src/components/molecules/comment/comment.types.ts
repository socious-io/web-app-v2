import { Comment } from 'src/core/api';

export type CommentProps = {
  onLike: (postId: string, id: string) => void;
  onLikeRemove: (postId: string, id: string) => void;
  list: Comment[];
  onMorePageClick: () => void;
  showSeeMore: boolean;
};
