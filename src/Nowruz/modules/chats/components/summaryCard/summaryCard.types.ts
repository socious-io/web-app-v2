import { Chat } from 'src/core/api';

export interface SummaryCardProps {
  chat: Chat;
  handleSelect: (id: string) => void;
}
