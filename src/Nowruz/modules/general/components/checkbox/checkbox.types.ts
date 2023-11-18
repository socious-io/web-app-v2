import { CheckboxProps as DefaultProps } from '@mui/material';
export interface CheckboxProps extends DefaultProps {
  id: string;
  label?: string;
  required?: boolean;
  errors?: string[];
  isValid?: boolean;
}
