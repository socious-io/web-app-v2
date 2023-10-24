import { CSSProperties } from 'react';
import { Post } from 'src/core/api';

export interface FeedListProps extends CSSProperties {
  data: Post[];
  onMorePageClick: () => void;
  onMoreClick?: (id: Post) => void;
  onLike: (id: string) => void;
  onRemoveLike: (id: string) => void;
  showSeeMore: boolean;
}
