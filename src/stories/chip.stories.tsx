import { Meta, StoryFn } from '@storybook/react';
import { Chip } from 'src/modules/general/components/Chip';

export default {
  title: 'General/Chip',
  component: Chip,
} as Meta;

const Template: StoryFn = args => <Chip size="md" label="Primary" {...args} />;

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
