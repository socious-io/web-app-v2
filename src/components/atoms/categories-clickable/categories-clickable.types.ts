import { CSSProperties } from 'react';

export interface CategoriesClickableProps extends CSSProperties {
  list: { value: string | number; label: string }[];
  selected?: Array<string | number>;
  onChange?: (newList: string[]) => void;
  clickable?: boolean;
}
