import { ReactNode } from 'react';

export interface LinkItemProps {
  menuOpen?: boolean;
  iconName?: string;
  label: string;
  navigateFunc?: () => void;
  children?: LinkItemProps[];
  badgeIcon?: ReactNode;
}
