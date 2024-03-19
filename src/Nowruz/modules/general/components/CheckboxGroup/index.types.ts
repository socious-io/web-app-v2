export type Item = { label: string; value: string | number; disabled?: boolean; checked?: boolean; error?: string[] };

export interface CheckboxGroupProps {
  items: Item[];
  selectedItems: Item[];
  id?: string;
  name?: string;
  label?: string;
  errors?: string[];
  onChange?: (item: Item[]) => void;
  labelClassName?: string;
}
