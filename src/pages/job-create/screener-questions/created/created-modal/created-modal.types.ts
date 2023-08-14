import { ModalProps } from 'src/components/templates/modal/modal.types';

export interface CreatedModalProps extends Omit<ModalProps, 'children'> {
  onBack: () => void;
  onDone: () => void;
  onEdit: (question:any) => void;
}
