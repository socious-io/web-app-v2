import { ReactNode } from 'react';

export type MultiSelectItem = {
  id: string;
  label: string;
};
export interface CustomChipProps {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: (value: string) => void;
}

export interface MultiSelectProps {
  searchTitle?: string;
  selectedItems?: MultiSelectItem[];
  items?: MultiSelectItem[];
  max?: number;
  maxLabel?: string;
  placeholder?: string;
  value: MultiSelectItem[];
  setValue: (newVal: MultiSelectItem[]) => void;
}
