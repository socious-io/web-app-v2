export interface SelectProps {
  options: string[];
  id: string;
  value: string;
  setValue: (newVal: string) => void;
}
