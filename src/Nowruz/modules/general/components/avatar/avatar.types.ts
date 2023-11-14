import { CSSProperties, ReactNode } from 'react';

export interface AvatarProps extends CSSProperties {
  size?: string;
  type: 'organizations' | 'users';
  img?: string;
  iconName?: string;
  onClick?: () => void;
  customStyle?: string;
  badge?: { image: string; color: string; width?: string; height?: string };
}
