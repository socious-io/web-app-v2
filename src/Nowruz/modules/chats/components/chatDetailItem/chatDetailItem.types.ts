import { Message } from 'src/core/api';

export interface ChatDetailItemProps {
  message: Message;
  senderAvatar?: string;
  senderName?: string;
  senderType?: 'users' | 'organizations';
  className?: string;
}
