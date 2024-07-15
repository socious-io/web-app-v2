import { ButtonProps } from 'src/modules/general/components/Button/button.types';
import { ModalProps } from 'src/modules/general/components/modal/modal.types';

export interface LeaveDeleteModalProps {
  title: string;
  subtitle: string;
  content?: string | React.ReactNode;
  buttons: ButtonProps[];
}

export type LeaveDeleteMemberProps = ModalProps & LeaveDeleteModalProps;
