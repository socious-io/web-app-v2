import { Meta, Story } from '@storybook/react';
import { Logo } from 'public/icons/nowruz/logo';
import React from 'react';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { IntroHeaderProps } from 'src/Nowruz/modules/Auth/components/IntroHeader/IntroHeader.types';

export default {
  title: 'Auth/IntroHeader',
  component: IntroHeader,
} as Meta;

const Template: Story<IntroHeaderProps> = (args) => <IntroHeader {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  title: 'Log in to your account',
  description: ' Welcome back! Please enter your details.',
  logo: <Logo width={48} height={48} />,
};
Preview.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sToYihTwJSFg3pLowAgKDv/DS-3.1-Web-App-Components?type=design&node-id=9-16411&mode=design&t=oH1dBWvVMCHM4czv-0',
  },
};
