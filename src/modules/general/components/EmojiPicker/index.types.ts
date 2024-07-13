export interface EmojiPickerProps {
  open: boolean;
  handleClose: () => void;
  onEmojiSelect: (emoji: { native: string }) => void;
  theme?: 'light' | 'dark';
  previewPosition?: 'top' | 'bottom' | 'none';
  customStyle?: string;
}
