import { ValueGroup } from '../valueContainer/valueContainer.types';

export interface ValueAccordionItem {
  valueGroup: ValueGroup;
  key: string;
  title: string;
  subtitle: string;
  value: 'ON' | 'OFF';
  description?: string;
}

export interface ValueAccordionProps {
  valueGroup: ValueGroup;
  title: string;
  items: ValueAccordionItem[];
  setItems: (value: ValueAccordionItem[]) => void;
}
