import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Steps } from '../design-system/atoms/steps/steps';

export default {
  title: 'ATOM/Steps',
  component: Steps,
} as ComponentMeta<typeof Steps>;

const Template: ComponentStory<typeof Steps> = (args) => <Steps {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  length: 5,
  current: 3,
};
