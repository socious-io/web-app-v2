import {ComponentMeta, ComponentStory} from '@storybook/react';
import {JobHistoryList} from '../../src/design-system/organisms/job-history-list/job-history-list';

export default {
  title: 'MOLECULES/JobHistoryItem',
  component: JobHistoryList,
} as ComponentMeta<typeof JobHistoryList>;

const Template: ComponentStory<typeof JobHistoryList> = (args) => (
  <JobHistoryList {...args} />
);

export const Primary = Template.bind({});

const list = [
  {
    jobTitle: 'job title',
    date: '02/20/2022',
    total: '555',
    percent: '+35',
    amount: '500',
    organizationName: 'Organization',
    dataStart: 'Mar 1',
    dataEnd: 'Mar 10',
  },
  {
    jobTitle: 'job title',
    date: '02/20/2022',
    total: '555',
    percent: '+35',
    amount: '500',
    organizationName: 'Organization',
    dataStart: 'Mar 1',
    dataEnd: 'Mar 10',
  },
  {
    jobTitle: 'job title',
    date: '02/20/2022',
    total: '555',
    percent: '+35',
    amount: '500',
    organizationName: 'Organization',
    dataStart: 'Mar 1',
    dataEnd: 'Mar 10',
  },
  {
    jobTitle: 'job title',
    date: '02/20/2022',
    total: '555',
    percent: '+35',
    amount: '500',
    organizationName: 'Organization',
    dataStart: 'Mar 1',
    dataEnd: 'Mar 10',
  },
  {
    jobTitle: 'job title',
    date: '02/20/2022',
    total: '555',
    percent: '+35',
    amount: '500',
    organizationName: 'Organization',
    dataStart: 'Mar 1',
    dataEnd: 'Mar 10',
  },
];

Primary.args = {
  data: list,
};
