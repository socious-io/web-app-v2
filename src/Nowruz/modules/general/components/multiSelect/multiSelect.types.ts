import { ReactNode } from 'react';

export type MultiSelectItem = {
  value: string;
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
  componentValue: MultiSelectItem[];
  setComponentValue: (newVal: MultiSelectItem[]) => void;
  customHeight?: string;
}
