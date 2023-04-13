import { CSSProperties } from 'react';

export interface AvatarProps extends CSSProperties {
  size?: string;
  type: 'organizations' | 'users';
  img?: string;
  onClick?: () => void;
}
