import { Props } from 'react-select';

export type OptionType = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
};

export interface InputDropdownProps extends Partial<Props<OptionType, false>> {
  isAsync?: boolean;
  label?: string;
  errors?: string[];
  icon?: string;
  hasDropdownIcon?: boolean;
  minWidth?: string;
}
