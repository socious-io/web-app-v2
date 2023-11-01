import { ReactNode } from 'react';

export interface CustomChipProps {
  label: string;
  icon: ReactNode;
  onClick: (value: string) => void;
}

export interface MultiSelectProps {
  searchTitle?: string;
  selectedItems?: string[];
  items?: string[];
  max?: number;
  maxLabel?: string;
  placeholder?: string;
  value: string[];
  setValue: (newVal: string[]) => void;
}
