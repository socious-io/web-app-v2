import { ReactNode } from 'react';

export type Item = {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: ReactNode;
  error?: string[];
};
export interface RadioGroupProps {
  row?: boolean;
  items: Item[];
  selectedItem?: Item;
  id?: string;
  name?: string;
  label?: string;
  errors?: string[];
  onChange?: (item: Item) => void;
  preselectIndex?: number;
  defaultValue?: string | number;
  labelClassName?: string;
}
