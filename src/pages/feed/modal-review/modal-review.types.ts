import { ModalProps } from 'src/components/templates/modal/modal.types';
import { Post, SocialCauses } from 'src/core/api';

export interface ModalReviewProps extends Omit<ModalProps, 'children'> {
  soucialValue: SocialCauses;
  text: string;
  setFeedList: (feed: Post[]) => void;
  onDone: () => void;
  imgFile?: string;
  imgUrl?: string;
}
