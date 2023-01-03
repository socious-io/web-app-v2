import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CategoriesClickable } from '../design-system/atoms/categories-clickable/categories-clickable';

export default {
  title: 'ATOM/CategoriesClickable',
  component: CategoriesClickable,
} as ComponentMeta<typeof CategoriesClickable>;

const Template: ComponentStory<typeof CategoriesClickable> = (args) => (
  <CategoriesClickable {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  list: ['Environment', 'Peacebuilding', 'Mental Health'],
};
