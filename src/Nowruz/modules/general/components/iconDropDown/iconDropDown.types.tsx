import { ReactNode } from 'react';

import { AccountItem } from '../avatarDropDown/avatarDropDown.types';
import { IconListItemProps } from '../avatarDropDown/iconListItem';

export interface IconDropDownProps {
  type: 'organizations' | 'users';
  img?: string;
  iconName?: string;
  accounts?: AccountItem[];
  iconItems?: IconListItemProps[];
  customItems?: ReactNode[];
  size?: string;
  customStyle?: string;
}
