import { SnackbarProps } from '@mui/material';

export interface CustomSnackbarProps extends SnackbarProps {
  icon?: React.ReactNode;
  containerClassName?: string;
  contentClassName?: string;
}
