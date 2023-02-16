import { CSSProperties } from 'react';

export interface TypeSelectorProps extends CSSProperties {
  list: { label: string; value: string }[];
  onChange: (value: string) => void;
  value: string;
}
