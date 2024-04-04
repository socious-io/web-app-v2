import { ReactNode } from 'react';

export interface ModalProps {
  children?: ReactNode;
  open: boolean;
  handleClose: (a?: any) => void;
  icon?: ReactNode;
  title?: string | ReactNode;
  subTitle?: string;
  content?: ReactNode;
  footer?: ReactNode;
  mobileFullHeight?: boolean;
  headerDivider?: boolean;
  footerDivider?: boolean;
  customStyle?: string;
  id?: string;
}
