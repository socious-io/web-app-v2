import { useState } from 'react';
import { Tabs } from 'src/components/atoms/tabs/tabs';
import { Tab } from 'src/components/atoms/tabs/tabs.types';
import { JobHistoryItemProps } from 'src/components/molecules/job-history-item/job-history-item.types';
import { ImpactCategoryList } from 'src/components/organisms/impact-category-list/impact-category-list';
import { JobHistoryList } from 'src/components/organisms/job-history-list/job-history-list';
import { Endpoints } from 'src/core/endpoints/index.types';
import { isoToStandard } from 'src/core/time';

import { Loader } from './achievements.types';
import { Header } from './components/header/header';
import { Tier } from './components/tier/tier';
import { evaluateTier } from './mobile/achievements.service';

export const useAchievementsShared = () => {
  const { badges, impactPointHistory } = useMatch().ownData as Loader;
  const activeList = badges.badges.map((badge) => badge.social_cause_category);
  const points = badges.badges.reduce((prev, curr) => prev + curr.total_points, 0);
  const tier = evaluateTier(points);
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

  function adoptUserBadgeToJobHistoryComp(
    impactPointHistory: Awaited<ReturnType<Endpoints['get']['users']['user/impact-points']>>
  ): JobHistoryItemProps[] {
    return impactPointHistory.items.map((item) => {
      return {
        jobTitle: item?.project?.title,
        date: isoToStandard(item.created_at),
        total: item.total_points,
        organizationName: item.organization.meta.name,
        dataStart: isoToStandard(item.mission.created_at),
        dataEnd: isoToStandard(item.created_at),
        avatarUrl: item.organization.meta.image,
      };
    });
  }

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
      content: (
        <div style={{ padding: '2rem 0rem' }}>
          <JobHistoryList data={adoptUserBadgeToJobHistoryComp(impactPointHistory)} />
        </div>
      ),
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
