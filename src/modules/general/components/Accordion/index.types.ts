import { ReactNode } from 'react';

export interface AccordionProps {
  title: string;
  subtitle?: string;
  children: ReactNode | string;
  expand?: boolean;
  hasBorder?: boolean;
  contentClassName?: string;
}
