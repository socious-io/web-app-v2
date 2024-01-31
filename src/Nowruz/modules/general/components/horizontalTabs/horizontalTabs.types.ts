import { ReactNode } from 'react';

export type HorizontalTabsItem = {
  label: string;
  content: ReactNode;
};

export interface HorizontalTabsProps {
  tabs: HorizontalTabsItem[];
  leftAligned?: boolean;
  containerCustomStyle?: string;
}
