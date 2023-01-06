import { ChangeEventHandler, CSSProperties } from 'react';

export interface SearchProps extends CSSProperties {
  value: string;
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onValueChange: (value: string) => void;
}
