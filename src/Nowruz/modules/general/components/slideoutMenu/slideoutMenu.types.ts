import { ReactNode } from 'react';

export type OverlayProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};
