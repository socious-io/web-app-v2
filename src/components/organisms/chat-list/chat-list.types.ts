import { CSSProperties } from 'react';

import { Message } from '../../atoms/message/message.types';

export interface ChatListProps extends CSSProperties {
  list: Message[];
  loadMore?: (p: number) => void;
  hasMore?: boolean;
}
