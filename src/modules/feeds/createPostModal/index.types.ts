import { Media } from 'src/core/api';

export interface OptionType {
  value?: string;
  label?: string;
}

export type Form = {
  cause: OptionType | undefined | null;
  content: string;
  file?: any;
  title?: string;
};

export type EditedData = {
  postId: string;
  file: Media | null;
} & Omit<Form, 'file'>;

export interface CreatePostModalProps {
  open: boolean;
  handleClose: () => void;
  onCreatePost: (data?: EditedData) => void;
  data?: EditedData;
}
