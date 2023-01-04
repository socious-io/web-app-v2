import { CSSProperties } from 'react';

export interface HeaderProps extends CSSProperties {
  onBack?: () => void;
  title: string;
}
