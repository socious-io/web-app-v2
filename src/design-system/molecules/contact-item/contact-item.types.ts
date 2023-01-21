import { CSSProperties } from 'react';

export interface ContactItemProps extends CSSProperties {
  id: string;
  name: string;
  text: string;
  img: string;
  date: string;
  date2: string;
  badge: string;
}
