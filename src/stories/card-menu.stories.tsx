import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CardMenu } from '../design-system/molecules/card-menu/card-menu';

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
    { label: 'Connections', icon: '/src/assets/icons/network.svg' },
    { label: 'Followers', icon: '/src/assets/icons/followers.svg' },
  ],
};
