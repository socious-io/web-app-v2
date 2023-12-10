import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';

export default {
  title: 'General/Chip',
  component: Chip,
} as Meta;

const Template: Story = (args) => <Chip {...args} />;

export const PrimaryChip = Template.bind({});
PrimaryChip.args = {
  label: 'Primary',
  theme: 'primary',
  shape: 'round',
  endIcon: <div style={{ width: '6px', height: '6px', backgroundColor: 'green', borderRadius: '50%' }} />,
};

export const SecondaryComponent = Template.bind({});
SecondaryComponent.args = {
  label: 'chip example',
  theme: 'secondary',
  shape: 'sharp',
  startIcon: <div style={{ width: '6px', height: '6px', backgroundColor: 'green', borderRadius: '50%' }} />,
};
