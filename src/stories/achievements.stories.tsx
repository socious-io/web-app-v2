import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import { Achievements } from '../design-system/pages/achievements/achievements';

export default {
  title: 'PAGE/Achievements',
  component: Achievements,
} as ComponentMeta<typeof Achievements>;

const Template: ComponentStory<typeof Achievements> = (args) => (
  <Achievements {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
