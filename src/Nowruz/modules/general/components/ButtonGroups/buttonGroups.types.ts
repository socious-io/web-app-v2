import { ReactNode } from 'react';

export type ButtonGroupItem = {
  label: string;
  content: ReactNode;
};

export interface ButtonGroupsProps {
  tabs: ButtonGroupItem[];
}
