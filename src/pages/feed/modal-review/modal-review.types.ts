import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { ModalProps } from 'src/components/templates/modal/modal.types';

export interface ModalReviewProps extends Omit<ModalProps, 'children'> {
  soucialValue: string;
  text: string;
  setFeedList: (feed: Feed[]) => void;
  onDone: () => void;
  imgFile?: string;
  imgUrl?: string;
}
