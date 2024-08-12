import { ValueGroup } from 'src/modules/Preferences/OrgPreferences/valueContainer/valueContainer.types';

export interface ValueAccordionItem {
  valueGroup: ValueGroup;
  key: string;
  title: string;
  subtitle: string;
  value: 'ON' | 'OFF';
  description?: string | null;
}

export interface ValueAccordionProps {
  valueGroup: ValueGroup;
  title: string;
  items: ValueAccordionItem[];
  setItems: (value: ValueAccordionItem[]) => void;
  error: string;
  setError: (valueGroup: ValueGroup, error: string) => void;
}
