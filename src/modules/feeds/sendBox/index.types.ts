export interface SendBoxProps {
  userImg: string;
  value: string;
  onChange: (value: string) => void;
  onEmojiSelect: (emoji: string) => void;
  onSend: () => void;
  name?: string;
  placeholder?: string;
  buttonText?: string;
  disabled?: boolean;
  className?: string;
}
