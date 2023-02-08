import { CommentModel } from '../../pages/feed/post-detail/mobile/mobile.types';

export type CommentProps = {
  onLike: (postId: string, id: string) => void;
  onLikeRemove: (postId: string, id: string) => void;
  list: CommentModel[];
  onMorePageClick: () => void;
  showSeeMore: boolean;
};
