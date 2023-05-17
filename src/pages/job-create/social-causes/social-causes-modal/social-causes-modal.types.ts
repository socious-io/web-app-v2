import { ModalProps } from 'src/components/templates/modal/modal.types';

export interface SocialCausesModalProps extends Omit<ModalProps, 'children'> {
  onDone: () => void;
}
