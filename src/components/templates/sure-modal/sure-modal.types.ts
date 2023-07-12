import { ModalProps } from '../modal/modal.types';

export interface SureModalProps extends Omit<ModalProps, 'children'> {
  body: string;
  onDone: () => void;
}
