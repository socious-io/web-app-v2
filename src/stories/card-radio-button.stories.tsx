import { StoryFn } from '@storybook/react';
import { Building05 } from 'public/icons/nowruz/building-05';
import { User01 } from 'public/icons/nowruz/user-01';
import { useState } from 'react';
import CardRadioButton from 'src/Nowruz/general/cardRadioButton/cardRadioButton';
import { CardRadioButtonItem } from 'src/Nowruz/general/cardRadioButton/cardRadioButton.types';

export default {
  title: 'Card-Radio-Button',
  component: CardRadioButton,
} as const;

const items: CardRadioButtonItem[] = [
  {
    title: 'I am a professional looking for work',
    description: 'Find work and connect with a community of changemakers',
    icon: User01,
    value: 'jobSeeker',
  },
  {
    title: 'I am an organization looking to hire',
    description: 'Post opportunities and start searching for talent',
    icon: Building05,
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
