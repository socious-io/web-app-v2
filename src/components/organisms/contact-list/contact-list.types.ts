import { CSSProperties } from 'react';
import { ContactItem } from '../../molecules/contact-item/contact-item.types';

export interface ContactListProps extends CSSProperties {
  list: ContactItem[];
  height: string;
  message?: { title: string; body?: string };
  onContactClick: (item: ContactItem) => void;
  onScroll?: (page: number) => void;
  onSearch: (v: string) => void;
}
