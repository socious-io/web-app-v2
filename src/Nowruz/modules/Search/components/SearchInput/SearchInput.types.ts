export interface SearchInputProps {
  onChange: (search: string) => void;
  placeholder: string;
  value: string;
  onEnter: () => void;
  open: boolean;
  onEscape: () => void;
}
