import { CSSProperties } from 'react';

export interface CategoriesClickableProps extends CSSProperties {
  list: { value: string; label: string }[];
  selected?: string[];
  onChange?: (newList: string[]) => void;
  clickable?: boolean;
}
