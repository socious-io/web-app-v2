import { CSSProperties } from 'react';

export interface ChatBoxProps extends CSSProperties {
  text: string;
  type: 'receive' | 'sender';
  children: React.ReactNode;
}
