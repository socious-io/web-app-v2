import { InputProps } from 'src/components/atoms/input/input.types';

export interface Item {
  title: string;
  value: string;
  subtitle?: string;
  amount?: string;
}

export interface InputModalProps extends InputProps {
  items: Item[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedItem: string;
  onSelectItem: (selectedItem: Item) => void;
  modalHeader?: string;
}
