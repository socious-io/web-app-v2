import { ReactNode } from 'react';

export interface ModalProps {
  open: boolean;
  handleClose: () => void;
  icon?: ReactNode;
  title?: string;
  subTitle?: string;
  content: ReactNode;
  footer?: ReactNode;
  mobileFullHeight?: boolean;
}
