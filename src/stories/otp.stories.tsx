import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Otp } from '../design-system/atoms/otp/otp';

export default {
  title: 'ATOM/Otp',
  component: Otp,
} as ComponentMeta<typeof Otp>;

const Template: ComponentStory<typeof Otp> = (args) => <Otp {...args} />;

export const Primary = Template.bind({});

Primary.args = { 
    length: 6,
 };
