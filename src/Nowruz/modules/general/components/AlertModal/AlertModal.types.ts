import { ReactNode } from 'react';

export interface AlertModalProps {
  title?: string;
  message: string;
  customImage?: string;
  customIcon?: ReactNode;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  closeButtn?: boolean;
  closeButtonLabel?: string;
  submitButton?: boolean;
  submitButtonTheme?: 'error' | 'primary' | 'secondary';
  submitButtonLabel?: string;
}
