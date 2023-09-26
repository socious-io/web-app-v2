import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ImpactCategoryItem } from '../components/molecules/impact-category-item/impact-category-item';

export default {
  title: 'MOLECULES/ImpactCategoryItem',
  component: ImpactCategoryItem,
} as ComponentMeta<typeof ImpactCategoryItem>;

const Template: ComponentStory<typeof ImpactCategoryItem> = (args) => <ImpactCategoryItem {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  category: 'HEALTH',
};
