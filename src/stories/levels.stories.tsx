import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Levels } from '../pages/levels/levels';

export default {
  title: 'PAGE/Levels',
  component: Levels,
} as ComponentMeta<typeof Levels>;

const Template: ComponentStory<typeof Levels> = (args) => <Levels {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
