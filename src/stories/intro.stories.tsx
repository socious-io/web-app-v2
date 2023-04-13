// @ts-nocheck
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Intro } from '../pages/intro/intro';

export default {
  title: 'PAGE/Intro',
  component: Intro,
} as ComponentMeta<typeof Intro>;

const Template: ComponentStory<typeof Intro> = (args) => <Intro {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
