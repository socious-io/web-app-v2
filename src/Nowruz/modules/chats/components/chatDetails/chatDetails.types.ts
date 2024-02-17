import { Chat, Message } from 'src/core/api';

export interface ChatDetailsProps {
  chat?: Chat;
  setOpenDetails: (val: boolean) => void;
  newSocketMessage?: Message;
}
