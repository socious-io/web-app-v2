import { CheckboxProps as DefaultProps } from '@mui/material';
export interface CheckboxProps extends DefaultProps {
  id?: string;
  name?: string;
  label?: string;
  required?: boolean;
  errors?: string[];
  isValid?: boolean;
  checked?: boolean;
  disabled?: boolean;
}
