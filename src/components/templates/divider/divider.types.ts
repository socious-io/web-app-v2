import { CSSProperties } from 'react';

export interface DividerProps extends CSSProperties {
  children: React.ReactNode;
  title?: string;
  divider?: 'line' | 'space'
}
