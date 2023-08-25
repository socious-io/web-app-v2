import { Message } from '@atoms/message/message.types';
import { CSSProperties } from 'react';

export interface ChatListProps extends CSSProperties {
  list: Message[];
  loadMore?: (p: number) => void;
  hasMore?: boolean;
}
