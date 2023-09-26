import { ModalProps } from 'src/components/templates/modal/modal.types';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';

export interface ModalCreateProps extends Omit<ModalProps, 'children'> {
  setFeedList: (feed: Feed[]) => void;
}
