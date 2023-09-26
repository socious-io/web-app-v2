import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { LevelItem } from '../components/molecules/level-item/level-item';

export default {
  title: 'ATOM/LevelItem',
  component: LevelItem,
} as ComponentMeta<typeof LevelItem>;

const Template: ComponentStory<typeof LevelItem> = (args) => <LevelItem {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  level: 7,
};
