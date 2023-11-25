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
  borderColor?: string;
  bgColor?: string;
  fontColor?: string;
}

export interface MultiSelectProps {
  id?: string;
  searchTitle?: string;
  selectedItems?: MultiSelectItem[];
  items?: MultiSelectItem[];
  max?: number;
  maxLabel?: string;
  placeholder?: string;
  componentValue: MultiSelectItem[];
  setComponentValue: (newVal: MultiSelectItem[]) => void;
  customHeight?: string;
  chipBorderColor?: string;
  chipBgColor?: string;
  chipFontColor?: string;
}
