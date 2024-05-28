import { SnackbarProps } from '@mui/material';

export interface CustomSnackbarProps extends SnackbarProps {
  text: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
}
