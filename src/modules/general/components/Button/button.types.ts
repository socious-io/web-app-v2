import { ButtonProps as DefaultProps, LinkProps } from '@mui/material';

export interface ButtonProps extends DefaultProps {
  customStyle?: string;
  block?: boolean;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'inherit';
  to?: string;
  target?: '_blank' | '_top' | '_self' | '_parent';
}
