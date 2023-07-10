import { CSSProperties } from 'react';

export interface CardMenuProps extends CSSProperties {
  title: string;
  list: Menu[];
}

export type Menu = {
  label: string;
  icon: string;
  link: () => void;
};
