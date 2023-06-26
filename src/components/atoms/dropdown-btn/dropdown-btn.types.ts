export type DropdownBtnItem = {
  id: string | number;
  label: string;
  value: string | number;
//   cb: (item: DropdownBtnItem) => void;
};

export type DropdownBtnProps = {
  placeholder: string;
  menus: DropdownBtnItem[];
  onValueChange: (item: DropdownBtnItem) => void;
};
