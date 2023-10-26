import { CheckboxProps as DefaultProps } from '@mui/material';
export interface CheckboxProps extends DefaultProps {
  label?: string;
  required?: boolean;
  errors?: string[];
  isValid?: boolean;
}
