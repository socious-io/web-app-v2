import { StoryFn } from '@storybook/react';
import { IconDropDown } from 'src/Nowruz/modules/general/components/iconDropDown';

export default {
  title: 'General/IconDropDown',
  component: IconDropDown,
} as const;

const Template: StoryFn = (args) => {
  return <IconDropDown type="users" {...args} />;
};

const imgUrl = 'https://socious-new.s3.ap-northeast-1.amazonaws.com/f9d1522cb673fa3d64e4243bd423e2bc.jpg';
const accounts = [
  { id: '1', img: imgUrl, type: 'users', name: 'Umaya', username: '@umayausername' },
  { id: '2', type: 'organizations', name: 'Ocean', username: '@oceanusername' },
];
const items = [
  { iconName: 'help-circle', label: 'Support' },
  { iconName: 'log-out-01', label: 'Log out' },
];

export const Default = Template.bind({});
Default.args = {
  type: 'users',
  accounts: accounts,
  iconItems: items,
};

export const Organization = Template.bind({});
Organization.args = {
  type: 'organizations',
  accounts: accounts,
  iconItems: items,
};
