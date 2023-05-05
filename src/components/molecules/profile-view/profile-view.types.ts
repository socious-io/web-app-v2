import { CSSProperties } from 'react';

export interface ProfileViewProps extends CSSProperties {
  type: 'organizations' | 'users';
  img?: string;
  size?: string;
  name: string;
  theme?: 'dark' | 'light';
  location?: JSX.Element | string;
}
