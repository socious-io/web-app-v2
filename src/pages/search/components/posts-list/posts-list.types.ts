import { Feed } from 'src/components/organisms/feed-list/feed-list.types';

export interface PostListProps {
  list: Feed[];
  onMorePageClick: () => void;
  onClick: (people: Feed) => void;
  showMorePage: boolean;
}
