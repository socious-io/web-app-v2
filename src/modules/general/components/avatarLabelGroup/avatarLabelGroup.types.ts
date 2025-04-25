import { AccountItem } from '../avatarDropDown/avatarDropDown.types';

export interface AvatarLabelGroupProps {
  account: AccountItem;
  avatarSize?: string;
  removeFull?: boolean;
  justAvatarClickable?: boolean;
  handleClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  customStyle?: string;
  isVerified?: boolean;
}
