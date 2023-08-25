import { ModalProps } from '@templates/modal/modal.types';

export interface CreatedModalProps extends Omit<ModalProps, 'children'> {
  onBack: () => void;
  onDone: () => void;
}
