import { FormGroup } from '../../../core/form/useForm/useForm.types';

export type DropdownItem = {
  id: string | number;
  label: string;
  value: string | number;
  helperText?: string;
};

export type DropdownProps = {
  label?: string;
  name?: string;
  list: Array<DropdownItem>;
  optional?: boolean;
  size?: number;
  value?: string | number;
  placeholder?: string;
  onValueChange?: (option: DropdownItem) => void;
  register?: Required<FormGroup>;
};
