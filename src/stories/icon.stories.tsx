import { StoryFn } from '@storybook/react';
import React from 'react';
import { Icon } from 'src/modules/general/components/Icon';
// Use docs/icons-reference.html for icons refrence

export default {
  title: 'General/Icon',
  component: Icon,
};

const Template: StoryFn = args => <Icon name="variable" {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'variable',
  fontSize: 48,
  color: 'red',
};
Default.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/S1ci8UfKAlphHYlzEwlHSC/DS-3.1-Line-Icons?type=design&node-id=204-8084&mode=design&t=8MiS5kkaK7i8VB3J-4',
  },
};
