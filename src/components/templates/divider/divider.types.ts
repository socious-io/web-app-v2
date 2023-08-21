import { CSSProperties } from 'react';

export interface DividerProps extends CSSProperties {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
  divider?: 'line' | 'space';
  onEdit?: () => void;
}
