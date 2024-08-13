export interface NewChatProps {
  handleClose: () => void;
  onSend: (receipientId: string, message: string) => void;
}
