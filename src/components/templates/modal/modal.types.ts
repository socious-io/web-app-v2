export type ModalProps = {
  children: JSX.Element | string;
  open: boolean;
  width?: string;
  height?: string;
  onClose: () => void;
};
