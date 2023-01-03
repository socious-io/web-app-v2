import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Header } from '../design-system/atoms/header/header';

export default {
  title: 'ATOM/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: 'Fullstack Developer',
  onBack: console.log,
};
