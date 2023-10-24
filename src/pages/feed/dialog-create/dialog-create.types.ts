import { Post } from 'src/core/api';

export type DialogCreateProps = {
  onClose: () => void;
  setFeedList: (feed: Post[]) => void;
};
