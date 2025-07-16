import { Meta, StoryFn } from '@storybook/react';
import { Logo } from 'public/icons/dynamic/logo';
import React from 'react';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { IntroHeaderProps } from 'src/modules/Auth/components/IntroHeader/IntroHeader.types';

export default {
  title: 'Auth/IntroHeader',
  component: IntroHeader,
} as Meta;

const Template: StoryFn<IntroHeaderProps> = args => <IntroHeader {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  title: 'Log in to your account',
  description: ' Welcome back! Please enter your details.',
  logo: <Logo width={48} height={48} />,
};
Preview.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/sToYihTwJSFg3pLowAgKDv/DS-3.1-Web-App-Components?type=design&node-id=9-16539&mode=design&t=4jZgE3vOBFytxgYX-4',
  },
};
