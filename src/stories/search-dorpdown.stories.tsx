import React from 'react';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

export default {
  title: 'General/SearchDropdown',
  component: SearchDropdown,
};

const Template = (args) => <SearchDropdown {...args} />;

export const Default = Template.bind({});
const options = [
  { label: 'Cherry', value: 'cherry', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Grape', value: 'grape', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Lemon', value: 'lemon', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Orange', value: 'orange', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Apple', value: 'apple', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Pear', value: 'pear', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Strawberry', value: 'strawberry', avatar: 'https://mui.com/static/images/avatar/1.jpg' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Kiwi', value: 'kiwi' },
];
Default.args = {
  placeholder: 'look for a team member',
  label: 'Select an option:',
  multiple: false,
  options,
};
