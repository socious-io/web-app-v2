import css from './body.module.scss';
import {Tab} from '../../../../../src/design-system/atoms/tabs/tabs.types';
import {Tabs} from '../../../../../src/design-system/atoms/tabs/tabs';
import {BodyProps} from './body.types';
import {ImpactCategoryList} from '../../../../../src/design-system/organisms/impact-category-list/impact-category-list';
import {JobHistoryList} from '../../../../../src/design-system/organisms/job-history-list/job-history-list';

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
    name: 'Achievements',
    content: <ImpactCategoryList paddingTop="2rem" data={[]} />,
    default: true,
  },
  {
    name: 'History',
    content: <JobHistoryList paddingTop="2rem" data={list} />,
    default: true,
  },
];

export const Body = (props: BodyProps): JSX.Element => {
  return <Tabs tabs={tabs} />;
};
