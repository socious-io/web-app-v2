export interface SelectCardProps {
  id: string;
  name: string;
  value: string | number;
  type?: 'radio' | 'checkbox';
  checked?: boolean;
  onChange?: (value: string | number, checked?: boolean) => void;
  imageProps?: { src?: string; width?: number; height?: number; alt?: string };
  text?: string;
  disabled?: boolean;
  cardClass?: string;
  contentClass?: string;
  inputClass?: string;
}
