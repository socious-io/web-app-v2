import { ModalProps } from 'src/components/templates/modal/modal.types';

export interface InfoModalProps extends Omit<ModalProps, 'children'> {
  onDone: () => void;
  onBack: () => void;
}
