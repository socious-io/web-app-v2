import { Post } from 'src/core/api';

import { EditedData } from '../createPostModal/index.types';

export interface FeedsListProps {
  list: Post[];
  showSeeMore: boolean;
  onShowMoreFeeds: () => void;
  updateFeedsListLiked: (id: string) => void;
  updateFeedsListRepost: (response: Post) => void;
  updateFeedsListEdit: (data: EditedData) => void;
  updateFeedsListRemove: (id: string) => void;
}
