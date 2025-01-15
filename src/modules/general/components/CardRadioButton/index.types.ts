import { ReactNode } from 'react';
import { IconProps } from 'src/modules/general/components/Icon';

export type CardRadioButtonItem = {
  value: string;
  title: string;
  description?: string;
  content?: ReactNode;
  icon?: IconProps;
  img?: ReactNode;
};

export interface CardRadioButtonProps {
  items: CardRadioButtonItem[];
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
  containerClassName?: string;
}
