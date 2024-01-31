import { ModalProps } from '../modal/modal.types';

export interface SureModalProps extends Omit<ModalProps, 'children'> {
  onDone: () => void;
  modalTexts: { title: string; confirmButton: string; cancleButton: string; body: string; titleColor?: string };
}
