import {Tab} from '../../../../../src/design-system/atoms/tabs/tabs.types';
import {Tabs} from '../../../../../src/design-system/atoms/tabs/tabs';
import {BodyProps} from './body.types';
import {JobHistoryList} from '../../../../../src/design-system/organisms/job-history-list/job-history-list';
import {LevelList} from '../../../../../src/design-system/organisms/level-list/level-list';

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
const tabs: Tab[] = [
  {
    name: 'Levels',
    content: <LevelList paddingTop="2rem" data={[]} />,
    default: true,
  },
  {
    name: 'History',
    content: <JobHistoryList paddingTop="2rem" data={list} />,
  },
];

export const Body = (props: BodyProps): JSX.Element => {
  return <Tabs tabs={tabs} />;
};
