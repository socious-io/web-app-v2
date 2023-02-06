export type DropdownProps = {
  list: Dropdown[];
  selectedValue?: string;
  onGetValue?: (value: string) => void;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  label?: string;
  placeholder: string;
};

export type DropdownItem = {
  title: string;
  value: string | number;
};

export type Items = {
  title: string;
  value: string;
};
