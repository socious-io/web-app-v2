import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Badge } from '../components/atoms/badge/badge';

export default {
  title: 'ATOM/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  value: '1',
};
