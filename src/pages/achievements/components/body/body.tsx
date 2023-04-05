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

export const Body = (props: BodyProps): JSX.Element => {
  const { badges } = useMatch().ownData as Loader;
  const points = badges.badges.reduce((prev, curr) => prev + curr.total_points, 0);
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
    //   content: <JobHistoryList paddingTop="2rem" data={list} />,
    //   default: false,
    // },
  ];

  return <Tabs tabs={tabs} />;
};
