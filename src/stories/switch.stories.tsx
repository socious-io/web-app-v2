import { StoryFn } from '@storybook/react';
import { AvatarDropDown } from 'src/Nowruz/modules/general/components/avatarDropDown';
import { AccountItem } from 'src/Nowruz/modules/general/components/avatarDropDown/avatarDropDown.types';

export default {
  title: 'Layout/SwitchAccount',
  component: AvatarDropDown,
} as const;

const Template: StoryFn = (args) => {
  const accounts: AccountItem[] = [
    { id: '1', type: 'users', name: 'user 1', username: '@username1', selected: true },
    { id: '2', type: 'users', name: 'user 2', username: '@username2', selected: false },
    { id: '3', type: 'organizations', name: 'org 1', username: '@oraganization1', selected: false },
  ];
  return <AvatarDropDown accounts={accounts} />;
};

export const Default = Template.bind({});
Default.args = {};
