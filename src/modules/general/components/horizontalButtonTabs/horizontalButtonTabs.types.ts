import { ReactNode } from 'react';

export type HorizontalTabsItem = {
  label: ReactNode;
  content: ReactNode;
};

export interface HorizontalButtonTabsProps {
  tabs: HorizontalTabsItem[];
}
