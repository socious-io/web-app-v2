import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';

export interface ServiceDetailHeaderProps {
  name: string;
  account: AccountItem;
  isOwner: boolean;
  onBack: () => void;
  onActions: (actionName: 'edit' | 'contact' | 'share') => void;
}
