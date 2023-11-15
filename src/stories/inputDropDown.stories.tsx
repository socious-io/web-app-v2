import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { InputDropDown } from 'src/Nowruz/modules/general/components/inputDropDown';
import { InputDropDownItem } from 'src/Nowruz/modules/general/components/inputDropDown/inputDropDown.types';

export default {
  title: 'General/SearchDropDown-V2',
  component: InputDropDown,
} as const;

const sampleAvatar = <Avatar size="24px" type="users" img="https://mui.com/static/images/avatar/1.jpg" />;
const items: InputDropDownItem[] = [
  { label: 'Cherry', value: 'cherry', avatar: sampleAvatar, subtitle: '@unigina123' },
  { label: 'Grape', value: 'grape', avatar: sampleAvatar, subtitle: '@unigina123' },
  { label: 'Lemon', value: 'lemon', avatar: sampleAvatar, subtitle: '@unigina123' },
  { label: 'Orange', value: 'orange', avatar: sampleAvatar, subtitle: '@unigina123' },
  { label: 'Apple', value: 'apple', avatar: sampleAvatar, subtitle: '@unigina123' },
  { label: 'Pear', value: 'pear', avatar: sampleAvatar, subtitle: '@unigina123' },
  { label: 'Strawberry', value: 'strawberry', avatar: sampleAvatar },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Kiwi', value: 'kiwi' },
];

const Template: StoryFn = (args) => {
  const [selected, setSelected] = useState<InputDropDownItem>();
  return (
    <div style={{ width: '400px' }}>
      <InputDropDown id="sdd-1" items={items} selected={selected} setSelected={setSelected} {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'sdd-1',
  label: 'Team member',
  hint: 'hint text',
  placeHolderIcon: <Icon name="user-01" fontSize={20} color="gray" />,
  placeHolderText: 'Select team member',
};
