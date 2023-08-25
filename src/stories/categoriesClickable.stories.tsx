import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CategoriesClickable } from '@atoms/categories-clickable/categories-clickable';

export default {
  title: 'ATOM/CategoriesClickable',
  component: CategoriesClickable,
} as ComponentMeta<typeof CategoriesClickable>;

const Template: ComponentStory<typeof CategoriesClickable> = (args) => (
  <CategoriesClickable {...args} />
);

export const Primary = Template.bind({});

const ORGANIZATION_TYPE = [
  { value: '1', label: 'Social Business' },
  { value: '2', label: 'Non-profit / Charity' },
  { value: '3', label: 'Social Co-operative' },
  { value: '4', label: 'Impact Investing Funds/Foundations' },
  { value: '5', label: 'Public Institution' },
  { value: '6', label: 'Intergovernmental Organization (e.g. UN)' },
  { value: '7', label: 'Impact department of a for profit company (e.g. CSR)' },
  { value: '8', label: 'Other' },
];

Primary.args = {
  list: ORGANIZATION_TYPE,
  clickable: false
};
