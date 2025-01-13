import { ButtonProps as DefaultProps } from '@mui/material';

export interface ButtonProps extends DefaultProps {
  customStyle?: string;
  block?: boolean;
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'inherit';
  to?: string;
  target?: '_blank' | '_top' | '_self' | '_parent';
}
