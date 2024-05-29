import { Post } from 'src/core/api';

export interface FeedsListProps {
  list: Post[];
  showSeeMore: boolean;
  onShowMoreFeeds: () => void;
  updateFeedsListLiked: (id: string) => void;
  updateFeedsListRepost: (response: Post) => void;
}
