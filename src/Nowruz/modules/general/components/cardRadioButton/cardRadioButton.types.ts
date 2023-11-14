import { IconProps } from 'src/Nowruz/general/Icon';

export interface CardRadioButtonProps {
  items: CardRadioButtonItem[];
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
}

export type CardRadioButtonItem = {
  title: string;
  value: string;
  description?: string;
  icon: IconProps;
};
