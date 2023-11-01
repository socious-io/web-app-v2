import { OutlinedTextFieldProps as DefaultProps } from '@mui/material';
export interface InputProps extends DefaultProps {
  name: string;
  label?: string;
  required?: boolean;
  errors?: string[];
  isValid?: boolean;
  validMessage?: string;
  prefix?: string;
}
