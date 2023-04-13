import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ImpactCategoryList} from '../components/organisms/impact-category-list/impact-category-list';

export default {
  title: 'ORGANISM/ImpactCategoryList',
  component: ImpactCategoryList,
} as ComponentMeta<typeof ImpactCategoryList>;

const Template: ComponentStory<typeof ImpactCategoryList> = (args) => (
  <ImpactCategoryList {...args} />
);

export const Primary = Template.bind({});

const DATA = [
  {name: 'Decent Work & Economic Growth'},
  {name: 'Affordable & Clean Energy'},
  {name: 'Clean Water & Sanitation'},
  {name: 'Responsible Consumption & Production'},
  {name: 'Climate Action'},
  {name: 'Life Below Water'},
  {name: 'Partnerships for the Goals'},
];

Primary.args = {
  data: DATA,
};
