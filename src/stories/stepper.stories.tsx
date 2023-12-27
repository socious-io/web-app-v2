import { StoryFn } from '@storybook/react';
import { Mail01 } from 'public/icons/nowruz/mail-01';
import { Passcode } from 'public/icons/nowruz/passcode';
import { Star02 } from 'public/icons/nowruz/star-02';
import { User01 } from 'public/icons/nowruz/user-01';
import { useState } from 'react';
import { Stepper } from 'src/Nowruz/modules/general/components/stepper/stepper';
import { StepInfo } from 'src/Nowruz/modules/general/components/stepper/stepper.types';

export default {
  title: 'General/stepper',
  component: Stepper,
} as const;

const steps: StepInfo[] = [
  { title: 'Email verification', desc: 'Please check your email', icon: Mail01 },
  { title: 'Choose a password', desc: 'Choose a secure password', icon: Passcode },
  { title: 'Your details', desc: 'Enter your name', icon: User01 },
  { title: 'Congartulations', desc: 'Start making an impact', icon: Star02 },
];

const Template: StoryFn = (args) => {
  const [activeStep, setActiveStep] = useState(2);
  return <Stepper activeStep={activeStep} steps={steps} {...args} />;
};

export const Desktop = Template.bind({});
Desktop.args = { orientation: 'horizontal', steps: steps };
Desktop.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/sToYihTwJSFg3pLowAgKDv/DS-3.1-Web-App-Components?type=design&node-id=255-84142&mode=design&t=zFxXEtC2u98hFoPX-0',
  },
};

export const Mobile = Template.bind({});
Mobile.args = { orientation: 'vertical', steps: steps };
Mobile.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/sToYihTwJSFg3pLowAgKDv/DS-3.1-Web-App-Components?type=design&node-id=255-84142&mode=design&t=zFxXEtC2u98hFoPX-0',
  },
};
