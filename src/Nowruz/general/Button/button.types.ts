import { ButtonProps as DefaultProps } from '@mui/material';

export interface ButtonProps extends DefaultProps {
  customStyle?: string;
  block?: boolean;
  color: 'primary' | 'secondary' | 'error';
}
