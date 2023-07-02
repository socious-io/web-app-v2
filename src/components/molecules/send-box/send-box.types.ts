export type SendBoxProps = {
  onValueChange?: (value: string) => void;
  onSend?: () => void;
  value?: string;
  img?: string;
  disabled?: boolean;
  className?: string;
};
