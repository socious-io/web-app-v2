import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import { OTP } from 'src/Nowruz/general/otp/otp';

export default {
  title: 'Auth/OTP',
  component: OTP,
} as const;

const Template: StoryFn = (args) => {
  const [value, setValue] = useState('');
  return <OTP value={value} setValue={setValue} {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
