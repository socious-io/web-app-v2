import { CSSProperties } from 'react';

export interface AvatarProps extends CSSProperties {
  size?: string;
  type: 'organization' | 'user';
}
