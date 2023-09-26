import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Avatar } from '../components/atoms/avatar/avatar';

export default {
  title: 'ATOM/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  type: 'users',
  size: '3rem',
};
