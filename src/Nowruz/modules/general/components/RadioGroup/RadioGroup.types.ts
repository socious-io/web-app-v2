type Item = { label: string; value: string | number; disabled?: boolean };
export interface RadioGroupProps {
  row?: boolean;
  items: Item[];
  id: string;
  name: string;
  label?: string;
}
