import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {JobHistoryItem} from '../components/molecules/job-history-item/job-history-item';

export default {
  title: 'MOLECULES/JobHistoryItem',
  component: JobHistoryItem,
} as ComponentMeta<typeof JobHistoryItem>;

const Template: ComponentStory<typeof JobHistoryItem> = (args) => (
  <JobHistoryItem {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  jobTitle: 'job title',
  date: '02/20/2022',
  total: '555',
  percent: '+35',
  amount: '500',
  organizationName: 'Organization',
  dataStart: 'Mar 1',
  dataEnd: 'Mar 10',
};
