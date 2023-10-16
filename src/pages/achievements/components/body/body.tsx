import { useLoaderData } from 'react-router-dom';
import { Tabs } from 'src/components/atoms/tabs/tabs';
import { Tab } from 'src/components/atoms/tabs/tabs.types';
import { ImpactCategoryList } from 'src/components/organisms/impact-category-list/impact-category-list';
import { Badges, ImpactPoints } from 'src/core/api';
import { Tier } from 'src/pages/achievements/components/tier/tier';
import { evaluateTier } from 'src/pages/achievements/mobile/achievements.service';

import { BodyProps } from './body.types';

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
  const loader = useLoaderData() as { badges: Badges; impactPointHistory: ImpactPoints };

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
