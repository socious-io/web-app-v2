import { StoryFn } from '@storybook/react';
import { template } from 'cypress/types/lodash';
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

export const Defult = Template.bind({});
Defult.args = { items: items };
Defult.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=88-16392&mode=design&t=HPrsfldFRA5rFuj1-0',
  },
};

const imgUrl = 'https://socious-new.s3.ap-northeast-1.amazonaws.com/f9d1522cb673fa3d64e4243bd423e2bc.jpg';
const imageItems: CardRadioButtonItem[] = [
  {
    title: 'I am a professional looking for work',
    description: 'Find work and connect with a community of changemakers',
    icon: { name: 'user-01', fontSize: 20 },
    value: 'jobSeeker',
  },
  {
    title: 'I am an organization looking to hire',
    description: 'Post opportunities and start searching for talent',
    img: <img src={imgUrl} width="50" height="40" />,
    value: 'organization',
  },
];

// export const Image = Template.bind({});
// Image.args = { items: imageItems, displayCkeckIcon: false };
