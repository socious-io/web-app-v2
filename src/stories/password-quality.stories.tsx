import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PasswordQuality } from '../components/atoms/password-quality/password-quality';

export default {
  title: 'ATOM/PasswordQuality',
  component: PasswordQuality,
} as ComponentMeta<typeof PasswordQuality>;

const Template: ComponentStory<typeof PasswordQuality> = (args) => (
  <PasswordQuality {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  value: '212s34s',
  validators: [
    { name: 'characters', amount: 7 },
    { name: 'number', amount: 1 },
  ],
};
