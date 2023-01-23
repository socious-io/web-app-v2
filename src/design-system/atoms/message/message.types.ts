import { CSSProperties } from 'react';

export interface Message {
  id: string;
  img: string;
  type: 'sender' | 'receiver';
  text: string;
}
export interface MessageProps extends CSSProperties {
  id: string;
  img: string;
  type: 'sender' | 'receiver';
  text: string;
}
