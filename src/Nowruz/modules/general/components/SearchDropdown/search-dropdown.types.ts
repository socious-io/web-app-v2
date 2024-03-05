import { Props } from 'react-select';

export interface SelectProps extends Props {
  isAsync?: boolean;
  creatable?: boolean;
  label?: string;
  errors?: string[];
  icon?: string;
  hasDropdownIcon?: boolean;
  border?: boolean;
}
