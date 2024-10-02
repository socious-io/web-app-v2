import { ReactNode } from 'react';

export interface SlideOutProps {
  open: boolean;
  handleClose: () => void;
  component: ReactNode;
}
