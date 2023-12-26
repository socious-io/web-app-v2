import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import { OTP } from 'src/Nowruz/modules/general/components/otp/otp';

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
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=16-16047&mode=design&t=Z83ef6k4TdQ1SFF8-0',
  },
};
