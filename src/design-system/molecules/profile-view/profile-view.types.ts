import { CSSProperties } from 'react';

export interface ProfileViewProps extends CSSProperties {
  type: 'organization' | 'user';
  img?: string;
  name: string;
  location: string;
}
