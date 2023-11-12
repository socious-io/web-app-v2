import { AvatarDropDown } from '.';
import { AccountItem } from './avatarDropDown.types';

export const TestSwitchDropDown = () => {
  const accounts: AccountItem[] = [
    { id: '1', type: 'users', name: 'user 1', username: '@username1', selected: true },
    { id: '2', type: 'users', name: 'user 2', username: '@username2', selected: false },
    { id: '3', type: 'organizations', name: 'org 1', username: '@oraganization1', selected: false },
  ];

  return <AvatarDropDown accounts={accounts} />;
};
