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
  mobileCentered?: boolean;
  headerDivider?: boolean;
  footerDivider?: boolean;
  id?: string;
  inlineTitle?: boolean;
  customStyle?: string;
  contentClassName?: string;
  closeButtonClassName?: string;
  className?: string;
  customTitleStyle?: string;
}
