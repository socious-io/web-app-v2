import { Chat } from 'src/core/api';

export interface ChatDetailsProps {
  chat?: Chat;
  setOpenDetails: (val: boolean) => void;
}
