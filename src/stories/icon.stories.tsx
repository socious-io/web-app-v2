import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
// Use docs/icons-reference.html for icons refrence

export default {
  title: 'General/Icon',
  component: Icon,
} as Meta;

const Template: Story = (args) => <Icon {...args} />;

export const IconComponent = Template.bind({});
IconComponent.args = {
  name: 'variable',
  fontSize: 48,
  color: 'red',
};
IconComponent.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/S1ci8UfKAlphHYlzEwlHSC/DS-3.1-Line-Icons?type=design&node-id=204-8084&mode=design&t=8MiS5kkaK7i8VB3J-4',
  },
};
