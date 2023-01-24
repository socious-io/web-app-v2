import { CSSProperties } from 'react';

export type ContactItem = {
  id: string;
  name: string;
  text: string;
  img: string;
  type: 'organizations' | 'users';
  date: string;
  date2: string;
  badge: string;
};

export interface ContactItemProps extends CSSProperties {
  onContactClick: (v: ContactItem) => void;
  id: string;
  name: string;
  text: string;
  img: string;
  type: 'organizations' | 'users';
  date: string;
  date2: string;
  badge: string;
}
