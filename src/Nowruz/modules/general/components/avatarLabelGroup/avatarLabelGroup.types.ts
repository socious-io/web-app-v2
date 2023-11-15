import { AccountItem } from '../avatarDropDown/avatarDropDown.types';

export interface AvatarLabelGroupProps {
  account: AccountItem;
  customStyle?: string;
  handleClick?: () => void;
}
