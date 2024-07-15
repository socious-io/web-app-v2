import { IconButtonProps as MUIIconButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface IconButtonProps extends MUIIconButtonProps {
  iconName?: string;
  img?: ReactNode;
  handleClick?: () => void;
  size: 'small' | 'medium' | 'large';
  iconSize: number;
  iconColor: string;
  customStyle?: string;
}
