export interface SendMessageProps {
  recipientId?: string;
  onSend?: (message: string) => void;
  handleCreateChat?: (recipientId: string, text: string) => void;
}
