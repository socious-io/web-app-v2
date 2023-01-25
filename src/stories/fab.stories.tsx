import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Fab } from '../design-system/atoms/fab/fab';

export default {
  title: 'ATOM/Fab',
  component: Fab,
} as ComponentMeta<typeof Fab>;

const Template: ComponentStory<typeof Fab> = (args) => <Fab {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  onClick: console.log,
};
