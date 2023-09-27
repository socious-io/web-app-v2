import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Categories } from '../components/atoms/categories/categories';

export default {
  title: 'ATOM/Categories',
  component: Categories,
} as ComponentMeta<typeof Categories>;

const Template: ComponentStory<typeof Categories> = (args) => <Categories {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  list: ['Part-time', 'Volunteer', 'Intermediate'],
};
