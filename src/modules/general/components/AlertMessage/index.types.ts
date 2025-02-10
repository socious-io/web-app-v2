import { ReactNode } from 'react';

export interface AlertMessageProps {
  theme: 'primary' | 'gray' | 'error' | 'warning' | 'success';
  iconName: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  colOrderMobileView?: boolean;
  containerClassName?: string;
}
