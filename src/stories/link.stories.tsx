import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Link } from '../components/atoms/link/link';
export default {
  title: 'ATOM/Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args}>this is a link</Link>;

export const Primary = Template.bind({});

Primary.args = {};
