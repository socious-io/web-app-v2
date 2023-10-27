import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import { Stepper } from 'src/Nowruz/general/stepper/stepper';

export default {
  title: 'stepper',
  component: Stepper,
} as const;

const Template: StoryFn = (args) => {
  const [activeStep, setActiveStep] = useState(1);
  return <Stepper activeStep={activeStep} {...args} />;
};

export const Desktop = Template.bind({});
Desktop.args = {};
