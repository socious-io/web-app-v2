import { ModalProps } from 'src/components/templates/modal/modal.types';

export interface ConnectModalProps extends Omit<ModalProps, 'children'> {
  onSend: () => void;
  onMessage?: (value: string) => void;
}
