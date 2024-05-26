export interface OptionType {
  value: string;
  label: string;
}

export type Form = {
  cause: OptionType | null;
  content: string;
  file: File | null;
  title?: string;
};

export interface CreatePostModalProps {
  open: boolean;
  handleClose: () => void;
  onCreatePost: () => void;
  data?: Form;
}
