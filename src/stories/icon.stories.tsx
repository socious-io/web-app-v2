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
};

export const IconComponentColored = Template.bind({});
IconComponent.args = {
  name: 'variable',
  color: '#F10F',
};
