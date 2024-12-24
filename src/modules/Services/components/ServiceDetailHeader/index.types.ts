import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';

export interface ServiceDetailHeaderProps {
  name: string;
  account: AccountItem;
  onBack: () => void;
  onActions: (actionName: 'edit' | 'share') => void;
}
