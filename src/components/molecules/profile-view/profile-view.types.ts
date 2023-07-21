import { CSSProperties } from 'react';

export interface ProfileViewProps extends CSSProperties {
  type: 'organizations' | 'users';
  img?: string;
  width?: string;
  size?: string;
  name: string;
  username?: string;
  theme?: 'dark' | 'light';
  location?: JSX.Element | string;
}
