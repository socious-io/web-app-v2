export interface AlertModalProps {
  title?: string;
  message: string;
  customImage?: string;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  closeButtn?: boolean;
  closeButtonLabel?: string;
  submitButton?: boolean;
  submitButtonLabel?: string;
}
