import { Post, SocialCauses } from 'src/core/api';

export type DialogReviewProps = {
  onClose: () => void;
  soucialValue: SocialCauses;
  imgFile: string;
  text: string;
  imgUrl: string;
  setFeedList: (feed: Post[]) => void;
};
