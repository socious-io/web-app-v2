import { ReactNode } from 'react';

export interface LeftNavBarProps {}

export interface LeftNavBarItemProps {
  open?: boolean;
  icon?: ReactNode;
  label: string;
  navigateFunc: () => void;
  children?: LeftNavBarItemProps[];
}
