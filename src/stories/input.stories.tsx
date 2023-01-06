import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from '../design-system/atoms/input/input';

export default {
  title: 'ATOM/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
export const outline = Template.bind({});

Primary.args = {
  label: 'Enter your email address',
  placeholder: 'Email',
  variant: undefined,
};

outline.args = {
  label: 'Enter your email address',
  placeholder: 'Email',
  variant: 'outline',
};
