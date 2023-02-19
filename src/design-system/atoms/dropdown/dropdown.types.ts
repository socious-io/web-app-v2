export type DropdownProps = {
  list: Items[];
  selectedValue?: string | number;
  /** @deprecated  deprecated in favor of onValueChange */
  onGetValue?: (value: string) => void;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder: string;
};

export type Items = {
  title: string;
  value: string;
};

export type DropdownItem = Items;