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
  disabled: true,
};

export const Icon = Template.bind({});
Icon.args = {
  color: 'primary',
  variant: 'outlined',
  startIcon: <img src="/icons/chevron-left.svg" width="15px" height="15px" />,
  endIcon: <img src="/icons/eye-black.svg" width="15px" height="15px" />,
};
