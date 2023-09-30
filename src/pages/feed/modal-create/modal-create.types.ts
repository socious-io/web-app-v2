import { ModalProps } from 'src/components/templates/modal/modal.types';
import { Post } from 'src/core/api';

export interface ModalCreateProps extends Omit<ModalProps, 'children'> {
  setFeedList: (feed: Post[]) => void;
}
