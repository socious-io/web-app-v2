import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Button } from 'src/modules/general/components/Button';
import { ButtonProps } from 'src/modules/general/components/Button/index.types';
import { Icon as GeneralIcon } from 'src/modules/general/components/Icon';
export default {
  title: 'General/Button',
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = args => <Button {...args}>Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};
Primary.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=1-525&mode=design&t=mtH2nhnFP8TKzTWZ-0',
  },
};
export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  color: 'primary',
  disabled: true,
};
PrimaryDisabled.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=1-525&mode=design&t=mtH2nhnFP8TKzTWZ-0',
  },
};

export const Icon = Template.bind({});
Icon.args = {
  color: 'primary',
  variant: 'outlined',
  startIcon: <GeneralIcon name="chevron-left" fontSize={15} />,
  endIcon: <GeneralIcon name="eye" fontSize={15} />,
};
Icon.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=1-525&mode=design&t=mtH2nhnFP8TKzTWZ-0',
  },
};
