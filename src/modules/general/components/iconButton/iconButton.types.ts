import { IconButtonProps as MUIIconButtonProps } from '@mui/material';

export interface IconButtonProps extends MUIIconButtonProps {
  iconName: string;
  handleClick?: () => void;
  size: 'small' | 'medium' | 'large';
  iconSize: number;
  iconColor: string;
  customStyle?: string;
}
