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

export type IdentityMeta = {
  name: string;
  image: string;
  avatar: string;
  username: string;
  shortname?: string;
};

export type Media = {
  id: string;
  url: string;
};
