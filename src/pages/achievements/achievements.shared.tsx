import { useState } from 'react';
import { evaluateTier } from './mobile/achievements.service';
import { useMatch } from '@tanstack/react-location';
import { Loader } from './achievements.types';
import { Header } from './components/header/header';
import { ImpactCategoryList } from 'src/components/organisms/impact-category-list/impact-category-list';
import { Tabs } from 'src/components/atoms/tabs/tabs';
import { Tab } from 'src/components/atoms/tabs/tabs.types';
import { JobHistoryList } from 'src/components/organisms/job-history-list/job-history-list';
import { Tier } from './components/tier/tier';

export const useAchievementsShared = () => {
  const { badges } = useMatch().ownData as Loader;
  const activeList = badges.badges.map((badge) => badge.social_cause_category);
  const points = badges.badges.reduce((prev, curr) => prev + curr.total_points, 0);
  const tier = evaluateTier(points);
  console.log({ tier });
  const [showClaimPointsSlide, setShowClaimPointsSlide] = useState(false);
  const [showCheckRewardsSlide, setShowCheckRewardsSlide] = useState(false);

  const header = (
    <Header
      onCheckRewards={() => setShowCheckRewardsSlide(true)}
      onClaimNow={() => setShowClaimPointsSlide(true)}
      tier={tier}
      point={points}
    />
  );
  const jobHistoryListJSX = <JobHistoryList data={[]} />;

  const tabs: Tab[] = [
    {
      name: 'Achievements',
      content: (
        <div style={{ padding: '1rem 0', display: 'grid', gap: '1rem' }}>
          <Tier currentTier={tier.current} tier={tier} />
          <ImpactCategoryList activeList={activeList} />
        </div>
      ),
      default: true,
    },
    {
      name: 'History',
      content: jobHistoryListJSX,
      default: true,
    },
  ];

  const bottom = (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );

  return {
    tier,
    showClaimPointsSlide,
    setShowClaimPointsSlide,
    showCheckRewardsSlide,
    setShowCheckRewardsSlide,
    header,
    bottom,
  };
};
