import { ButtonProps } from 'src/components/atoms/button/button.types';
import { ModalProps } from '../modal/modal.types';

export interface WebModalProps extends ModalProps {
  header: string;
  buttons?: ButtonProps[];
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
}
