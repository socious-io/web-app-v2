import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CardMenu } from '../components/molecules/card-menu/card-menu';

export default {
  title: 'MOLECULES/CardMenu',
  component: CardMenu,
} as ComponentMeta<typeof CardMenu>;

const Template: ComponentStory<typeof CardMenu> = (args) => (
  <CardMenu {...args}>Button</CardMenu>
);

export const Primary = Template.bind({});

Primary.args = {
  title: 'Network',
  list: [
    { label: 'Connections', icon: '/icons/network.svg' },
    { label: 'Followers', icon: '/icons/followers.svg' },
  ],
};
