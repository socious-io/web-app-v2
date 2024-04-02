import { ReactNode } from 'react';

export interface ModalCenteredProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  closeButtn?: boolean;
  closeButtonLabel?: string;
  submitButton?: boolean;
  disableSubmitButton?: boolean;
  submitButtonTheme?: 'error' | 'primary' | 'secondary';
  submitButtonLabel?: string;
  children?: ReactNode;
}
