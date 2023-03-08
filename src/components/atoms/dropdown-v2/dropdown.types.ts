import { FormGroup } from '../../../core/form/useForm/useForm.types';

export type DropdownItem = { label: string; value: string | number };

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
