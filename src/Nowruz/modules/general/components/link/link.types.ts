import { LinkProps as MUILinkProps } from '@mui/material';

export interface LinkProps extends MUILinkProps {
  label: string;
  customStyle?: string;
}
