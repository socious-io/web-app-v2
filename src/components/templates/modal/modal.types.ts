export type ModalProps = {
  children: JSX.Element | string;
  zIndex?: number;
  open: boolean;
  width?: string;
  height?: string;
  maxHeight?: string;
  maxWidth?: string;
  onClose: () => void;
};
