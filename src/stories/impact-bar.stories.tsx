import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ImpactBar} from '../../src/design-system/atoms/impact-bar/impact-bar';

export default {
  title: 'ATOM/ImpactBar',
  component: ImpactBar,
} as ComponentMeta<typeof ImpactBar>;

const Template: ComponentStory<typeof ImpactBar> = (args) => (
  <ImpactBar {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  start: 0,
  end: 900,
  current: 450,
};
