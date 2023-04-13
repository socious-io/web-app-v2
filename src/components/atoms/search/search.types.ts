import { ChangeEventHandler, CSSProperties } from 'react';

export interface SearchProps extends CSSProperties {
  value?: string;
  placeholder: string;
  defaultValue?: string;
  onEnter?: (value: string) => void; 
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (value: string) => void;
}
