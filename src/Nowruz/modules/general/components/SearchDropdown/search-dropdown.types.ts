import { Props } from 'react-select';

export interface SelectProps extends Props {
  isAsync?: boolean;
  label?: string;
  errors?: string[];
  icon?: string;
  hasDropdownIcon?: boolean;
}
