import { StoryFn } from '@storybook/react';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

export default {
  title: 'General/Pagination',
  component: Pagination,
} as const;

const Template: StoryFn = (args) => {
  return <Pagination />;
};

export const Default = Template.bind({});
Default.args = {};
