import { OutlinedInputProps as DefaultProps } from '@mui/material';
import { ReactNode } from 'react';

export interface InputProps extends DefaultProps {
  id?: string;
  name?: string;
  label?: string;
  required?: boolean;
  errors?: string[];
  isValid?: boolean;
  validMessage?: string;
  prefix?: string;
  customHeight?: string;
  register?: any;
  hints?: Array<{ hint: string; hide: boolean }>;
  startIcon?: ReactNode;
  postfix?: string | ReactNode;
}
