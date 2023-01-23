import { CSSProperties } from 'react';

export interface ProfileViewProps extends CSSProperties {
  type: 'organizations' | 'users';
  img?: string;
  name: string;
  location?: string;
}
