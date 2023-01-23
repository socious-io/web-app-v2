import { CSSProperties } from 'react';

export type ContactItem = {
  id: string;
  name: string;
  text: string;
  img: string;
  type: 'organizations' | 'user';
  date: string;
  date2: string;
  badge: string;
};

export interface ContactItemProps extends CSSProperties {
  id: string;
  name: string;
  text: string;
  img: string;
  type: 'organizations' | 'user';
  date: string;
  date2: string;
  badge: string;
}
