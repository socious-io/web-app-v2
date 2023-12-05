import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';

export default {
  title: 'General/Chip',
  component: Chip,
} as Meta;

const Template: Story = (args) => <Chip {...args} />;

export const IconComponent = Template.bind({});
IconComponent.args = {
  label: 'chip example',
  theme: 'secondary',
};
