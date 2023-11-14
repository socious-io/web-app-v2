import { ReactNode } from 'react';

import { AccountItem } from '../avatarDropDown/avatarDropDown.types';
import { IconListItemProps } from '../avatarDropDown/iconListItem';

export interface IconDropDownProps {
  type: 'organizations' | 'users'; // if image and icon does not have value, the user or org icon is displayed based on the type
  img?: string; // if it has value, instead of icon the image will be displayed on the circle button
  iconName?: string; // if it has value, this icon will be displayed on the circle button
  accounts?: AccountItem[]; // account list
  iconItems?: IconListItemProps[]; // function list such as log out
  customItems?: ReactNode[]; // any other custom component to de displayed in the menu
  size?: string; // the width of the manu
  customStyle?: string;
}
