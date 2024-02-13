import { ReactNode } from 'react';

export type HorizontalTabsItem = {
  label: ReactNode;
  content: ReactNode;
};

export interface HorizontalTabsProps {
  tabs: HorizontalTabsItem[];
  leftAligned?: boolean;
  containerCustomStyle?: string;
}
