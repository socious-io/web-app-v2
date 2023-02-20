import css from './body.module.scss';
import { Tab } from '../../../../components/atoms/tabs/tabs.types';
import { Tabs } from '../../../../components/atoms/tabs/tabs';
import { BodyProps } from './body.types';
import { ImpactCategoryList } from '../../../../components/organisms/impact-category-list/impact-category-list';
import { JobHistoryList } from '../../../../components/organisms/job-history-list/job-history-list';

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

export const Body = (props: BodyProps): JSX.Element => {
  const tabs: Tab[] = [
    {
      name: 'Achievements',
      content: <ImpactCategoryList paddingTop="2rem" activeList={props.activeList} />,
      default: true,
    },
    // {
    //   name: 'History',
    //   content: <JobHistoryList paddingTop="2rem" data={list} />,
    //   default: false,
    // },
  ];

  return <Tabs tabs={tabs} />;
};
