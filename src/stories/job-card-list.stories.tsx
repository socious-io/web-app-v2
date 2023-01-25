import { ComponentMeta, ComponentStory } from '@storybook/react';
import { JobCardProps } from '../design-system/molecules/job-card/job-card.types';
import { JobCardList } from '../design-system/organisms/job-card-list/job-card-list';

export default {
  title: 'MOLECULES/JobCardList',
  component: JobCardList,
} as ComponentMeta<typeof JobCardList>;

const Template: ComponentStory<typeof JobCardList> = (args) => <JobCardList {...args} />;

export const Primary = Template.bind({});

const list: JobCardProps[] = [
  {
    id: '1',
    title: 'title',
    body: 'body',
    date: '1991/20/1',
  },
  {
    id: '2',
    title: 'title 3',
    body: 'body',
    date: '1991/20/1',
  },
  {
    id: '3',
    title: 'title 2',
    body: 'body',
    date: '1991/20/1',
  },
];

Primary.args = {
  list,
  onClick: console.log,
};
