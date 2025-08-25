import { ReactNode } from 'react';

export interface ModalProps {
  children?: ReactNode;
  open: boolean;
  handleClose: (a?: any) => void;
  icon?: ReactNode;
  title?: string | ReactNode;
  subTitle?: string | ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  mobileFullHeight?: boolean;
  mobileCentered?: boolean;
  headerDivider?: boolean;
  footerDivider?: boolean;
  customStyle?: string;
  id?: string;
  inlineTitle?: boolean;
  centerHeader?: boolean;
  contentClassName?: string;
  closeButtonClassName?: string;
}
