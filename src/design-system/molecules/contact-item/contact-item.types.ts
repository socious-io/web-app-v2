import { CSSProperties } from 'react';

export interface ContactItemProps extends CSSProperties {
  name: string;
  text: string;
  img: string;
  date: string;
}
