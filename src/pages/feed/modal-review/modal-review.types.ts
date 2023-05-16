import { ModalProps } from 'src/components/templates/modal/modal.types';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';

export interface ModalReviewProps extends Omit<ModalProps, 'children'> {
  soucialValue: string;
  text: string;
  imgFile?: string;
  imgUrl?: string;
  setFeedList: (feed: Feed[]) => void;
}
