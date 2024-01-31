import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { ButtonProps } from 'src/Nowruz/modules/general/components/Button/button.types';
export default {
  title: 'General/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;

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
  startIcon: <img src="/icons/chevron-left.svg" width="15px" height="15px" alt="icon-left" />,
  endIcon: <img src="/icons/eye-black.svg" width="15px" height="15px" alt="icon-right" />,
};
Icon.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=1-525&mode=design&t=mtH2nhnFP8TKzTWZ-0',
  },
};
