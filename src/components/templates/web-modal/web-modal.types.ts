import { ButtonProps } from '@atoms/button/button.types';
import { ModalProps } from '../modal/modal.types';

export interface WebModalProps extends ModalProps {
  header: string;
  buttons?: ButtonProps[];
  onBack?: () => void;
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
}
