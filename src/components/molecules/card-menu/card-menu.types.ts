import { CSSProperties } from 'react';

export interface CardMenuProps extends CSSProperties {
  title: string;
  list: Menu[];
  onClick?: (label: string) => void;
}

export type Menu = {
  label: string;
  icon: string;
  onClick?: () => void;
};
