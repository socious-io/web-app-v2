import { ModalProps } from '@templates/modal/modal.types';
import { Feed } from '@organisms/feed-list/feed-list.types';

export interface ModalReviewProps extends Omit<ModalProps, 'children'> {
  soucialValue: string;
  text: string;
  setFeedList: (feed: Feed[]) => void;
  onDone: () => void;
  imgFile?: string;
  imgUrl?: string;
}
