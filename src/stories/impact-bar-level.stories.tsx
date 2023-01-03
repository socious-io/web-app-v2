import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ImpactBarLevel} from '../../src/design-system/atoms/impact-bar-level/impact-bar-level';

export default {
  title: 'ATOM/ImpactBarLevel',
  component: ImpactBarLevel,
} as ComponentMeta<typeof ImpactBarLevel>;

const Template: ComponentStory<typeof ImpactBarLevel> = (args) => (
  <ImpactBarLevel {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  start: 400,
  end: 450,
  current: 420,
  currentLevel: 'Level 3',
  prevLevel: 'Level 2',
  nextLevel: 'Level 4',
};
