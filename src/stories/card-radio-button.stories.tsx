import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import { CardRadioButton } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton';
import { CardRadioButtonItem } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton.types';

export default {
  title: 'General/Card-Radio-Button',
  component: CardRadioButton,
} as const;

const items: CardRadioButtonItem[] = [
  {
    title: 'I am a professional looking for work',
    description: 'Find work and connect with a community of changemakers',
    icon: { name: 'user-01', fontSize: 20 },
    value: 'jobSeeker',
  },
  {
    title: 'I am an organization looking to hire',
    description: 'Post opportunities and start searching for talent',
    icon: { name: 'building-05', fontSize: 20 },
    value: 'organization',
  },
];
const Template: StoryFn = (args) => {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <div style={{ width: '370px' }}>
      <CardRadioButton items={items} selectedValue={selectedValue} setSelectedValue={setSelectedValue} {...args} />;
    </div>
  );
};

export const Signup = Template.bind({});
Signup.args = { items: items };
