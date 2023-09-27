import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Tabs } from '../components/atoms/tabs/tabs';

export default {
  title: 'ATOM/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  tabs: [
    { name: 'Achievements', content: <div>content of tab 1</div>, default: true },
    { name: 'History', content: <div>content of tab 2</div> },
  ],
};
