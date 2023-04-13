import { CSSProperties } from 'react';

export interface ChatBoxProps extends CSSProperties {
  type: 'receiver' | 'sender';
  children: React.ReactNode;
  onClick?: () => void;
}
