import css from './body.module.scss';
import { Tab } from '../../../../components/atoms/tabs/tabs.types';
import { Tabs } from '../../../../components/atoms/tabs/tabs';
import { BodyProps } from './body.types';
import { ImpactCategoryList } from '../../../../components/organisms/impact-category-list/impact-category-list';
import { JobHistoryList } from '../../../../components/organisms/job-history-list/job-history-list';
import { Tier } from '../tier/tier';
import { useMatch } from '@tanstack/react-location';
import { Loader } from '../../achievements.types';
import { evaluateTier } from '../../mobile/achievements.service';
import { JobHistoryListProps } from 'src/components/organisms/job-history-list/job-history-list.types';

const data = [
  {
    jobTitle: 'title',
    date: '2332',
    total: '20',
    percent: '20%',
    amount: '20',
    organizationName: 'org nme',
    dataStart: 'date start',
    dataEnd: 'date end',
  },
];

// function adaptor(impactPoint: unknown[]): JobHistoryListProps['data'] {
//   return impactPoint.map((item) => {
//     return {
//       jobTitle: item.job_category.name,
//       date: 'date',
//       total: item.total_points,
//       percent: 'percent',
//       organizationName: item.organization.name,
//       dataStart: 'start',
//       dataEnd: 'end',
//     };
//   });
// }

export const Body = (props: BodyProps): JSX.Element => {
  const loader = useMatch().ownData as Loader;

  const points = loader.badges.badges.reduce((prev, curr) => prev + curr.total_points, 0);
  const tier = evaluateTier(points);

  const achievements = (
    <>
      <Tier currentTier={tier.current} tier={props.tier} />
      <ImpactCategoryList paddingTop="2rem" activeList={props.activeList} />
    </>
  );

  const tabs: Tab[] = [
    {
      name: 'Achievements',
      content: achievements,
      default: true,
    },
    // {
    //   name: 'History',
    //   content: <JobHistoryList paddingTop="2rem" data={adaptor(loader.impactPoints.items)} />,
    //   //   content: <>lorem ipsum</>,
    //   default: false,
    // },
  ];

  return <Tabs tabs={tabs} />;
};
