import { TextFieldProps as DefaultProps } from '@mui/material';
export interface InputProps extends DefaultProps {
  label?: string;
  required?: boolean;
  errors?: string[];
  isValid?: boolean;
  validMessage?: string;
  prefix?: string;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}
