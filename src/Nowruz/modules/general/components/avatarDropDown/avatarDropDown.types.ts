export interface AccountItem {
  id: string;
  img?: string;
  type: 'organizations' | 'users';
  name: string;
  username: string;
  selected?: boolean;
}

export interface AvatarDropDownProps {
  buttonHeight?: string;
  createOrg?: boolean;
  displayOtherAccounts?: boolean;
  displaySetting?: boolean;
  createOrgFunc?: () => void;
}
