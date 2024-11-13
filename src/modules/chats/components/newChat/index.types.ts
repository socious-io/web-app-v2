export interface NewChatProps {
  handleClose: () => void;
  onSend: (recipientId: string, message: string) => void;
}
