import { CSSProperties } from 'react';
import { ContactItemProps } from '../../molecules/contact-item/contact-item.types';

export interface ContactListProps extends CSSProperties {
  list: ContactItemProps[];
  onSearch: (v: string) => void;
}
