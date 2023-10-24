import { CSSProperties } from 'react';

export interface CategoriesClickableProps extends CSSProperties {
  list: { value: string | number; label: string }[] | undefined;
  selected?: Array<string | number>;
  onChange?: (newList: string[]) => void;
  clickable?: boolean;
  min?: number;
  max?: number;
}
