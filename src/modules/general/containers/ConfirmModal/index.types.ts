import { ButtonProps } from 'src/modules/general/components/Button/button.types';
import { ModalProps } from 'src/modules/general/components/modal/modal.types';

export interface ConfirmModalProps extends ModalProps {
  open: boolean;
  handleClose: () => void;
  confirmHeader: string;
  confirmSubheader?: string;
  buttons?: ButtonProps[];
}
