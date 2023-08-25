import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ImpactBadge} from '@atoms/impact-badge/impact-badge';

export default {
  title: 'ATOM/ImpactBadge',
  component: ImpactBadge,
} as ComponentMeta<typeof ImpactBadge>;

const Template: ComponentStory<typeof ImpactBadge> = (args) => (
  <ImpactBadge {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  name: 'HEALTH',
};
