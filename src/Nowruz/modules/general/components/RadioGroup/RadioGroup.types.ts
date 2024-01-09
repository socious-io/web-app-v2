import { ReactNode } from 'react';

type Item = { label: string; value: string | number; disabled?: boolean; children?: ReactNode; error?: string[] };
export interface RadioGroupProps {
  row?: boolean;
  items: Item[];
  id?: string;
  name?: string;
  label?: string;
  errors?: string[];
  onChange?: (item: Item) => void;
  preselectIndex?: number;
}
