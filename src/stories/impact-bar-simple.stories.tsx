import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ImpactBarSimple} from '@atoms/impact-bar-simple/impact-bar-simple';

export default {
  title: 'ATOM/ImpactBarSimple',
  component: ImpactBarSimple,
} as ComponentMeta<typeof ImpactBarSimple>;

const Template: ComponentStory<typeof ImpactBarSimple> = (args) => (
  <ImpactBarSimple {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  start: 1,
  end: 10,
  current: 5,
};
