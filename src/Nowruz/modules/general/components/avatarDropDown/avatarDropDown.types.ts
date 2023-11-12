export interface AccountItem {
  id: string;
  img?: string;
  type: 'organizations' | 'users';
  name: string;
  username: string;
  selected: boolean;
}

export interface AvatarDropDownProps {
  accounts: AccountItem[];
  buttonHeight?: string;
}
