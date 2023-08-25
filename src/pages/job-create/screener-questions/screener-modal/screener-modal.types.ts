import { ModalProps } from '@templates/modal/modal.types';

export interface ScreenerModalProps extends Omit<ModalProps, 'children'> {
  onDone: () => void;
  onOpen: () => void;
  // onBack: () => void;
}
