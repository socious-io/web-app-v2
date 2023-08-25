import { ModalProps } from '@templates/modal/modal.types';

export interface SocialCausesModalProps extends Omit<ModalProps, 'children'> {
  onDone: () => void;
  onOpen: () => void;
}
