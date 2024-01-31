import { Props } from 'react-select';

export interface InputDropdownProps extends Props {
  isAsync?: boolean;
  label?: string;
  errors?: string[];
  icon?: string;
  hasDropdownIcon?: boolean;
  minWidth?: string;
}
