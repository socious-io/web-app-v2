import { CommentModel } from 'src/pages/feed/post-detail/post-detail.types';

export type CommentProps = {
  onLike: (postId: string, id: string) => void;
  onLikeRemove: (postId: string, id: string) => void;
  list: CommentModel[];
  onMorePageClick: () => void;
  showSeeMore: boolean;
};
