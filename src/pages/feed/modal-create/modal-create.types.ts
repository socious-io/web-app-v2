import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { ModalProps } from 'src/components/templates/modal/modal.types';

export interface ModalCreateProps extends Omit<ModalProps, 'children'> {
  setFeedList: (feed: Feed[]) => void;
}
