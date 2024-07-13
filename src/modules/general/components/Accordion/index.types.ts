import { ReactNode } from 'react';

export interface AccordionProps {
  title: string;
  children: ReactNode | string;
  expand?: boolean;
  contentClassName?: string;
}
