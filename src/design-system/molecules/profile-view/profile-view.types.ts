import { CSSProperties } from 'react';

export interface ProfileViewProps extends CSSProperties {
  type: 'organizations' | 'users';
  img?: string;
  size?: string;
  name: string;
  location?: string;
}
