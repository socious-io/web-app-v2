import { FormGroup } from '../../../core/form/useForm/useForm.types';

export type DropdownProps = {
  list: Items[];
  selectedValue?: string | number;
  /** @deprecated  deprecated in favor of onValueChange */
  onGetValue?: (value: string) => void;
  onValueChange?: (value: string) => void;
  register?: Required<FormGroup>;
  name?: string;
  label?: string;
  placeholder: string;
  containerClassName?: string;
};

export type Items = {
  title: string;
  value: string;
};

export type DropdownItem = Items;
