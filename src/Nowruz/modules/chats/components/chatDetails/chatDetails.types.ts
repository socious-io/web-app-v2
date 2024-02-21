import { Chat, Message } from 'src/core/api';

export interface ChatDetailsProps {
  selectedChatId: string;
  setOpenDetails: (val: boolean) => void;
  newSocketMessage: Message | null;
  chats: Chat[];
  setChats: (val: Chat[]) => void;
}
