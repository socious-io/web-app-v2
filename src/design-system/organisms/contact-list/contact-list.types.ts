import { CSSProperties } from 'react';
import { ContactItem } from '../../molecules/contact-item/contact-item.types';

export interface ContactListProps extends CSSProperties {
  list: ContactItem[];
  message?: { title: string; body?: string };
  onContactClick: (item: ContactItem) => void;
  onSearch: (v: string) => void;
}
