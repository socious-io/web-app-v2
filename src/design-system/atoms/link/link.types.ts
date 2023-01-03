import { CSSProperties } from 'react';

export interface LinkProps extends CSSProperties {
  children: React.ReactNode;
  onClick: () => void;
}
