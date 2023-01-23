import { CSSProperties } from 'react';

export interface MessageProps extends CSSProperties {
  img: string;
  type: 'sender' | 'receiver'
  text: string;
}
