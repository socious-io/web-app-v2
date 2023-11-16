import { ReactNode } from 'react';

export type InputDropDownItem = {
  value: string;
  label: string;
  avatar?: ReactNode;
  subtitle?: string;
};

export interface InputDropDownProps {
  id: string;
  label?: string;
  hint?: string;
  items: InputDropDownItem[];
  selected?: InputDropDownItem;
  setSelected: (newVal: InputDropDownItem | undefined) => void;
  placeHolderIcon?: ReactNode;
  placeHolderText?: string;
}

export interface CustomInputProps extends InputDropDownProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  menuItems: InputDropDownItem[];
  setMenuItems: (value: InputDropDownItem[]) => void;
}
