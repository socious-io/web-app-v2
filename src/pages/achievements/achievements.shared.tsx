import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Tabs } from 'src/components/atoms/tabs/tabs';
import { Tab } from 'src/components/atoms/tabs/tabs.types';
import { JobHistoryItemProps } from 'src/components/molecules/job-history-item/job-history-item.types';
import { ImpactCategoryList } from 'src/components/organisms/impact-category-list/impact-category-list';
import { JobHistoryList } from 'src/components/organisms/job-history-list/job-history-list';
import { Badge, Badges, ImpactPoints, OrgMeta } from 'src/core/api';
import { isoToStandard } from 'src/core/time';

import { Header } from './components/header/header';
import { Tier } from './components/tier/tier';
import { evaluateTier } from './mobile/achievements.service';

export const useAchievementsShared = () => {
  console.log('DDDDDDDDD', useLoaderData());
  const { badges, impactPointHistory } = useLoaderData() as { badges: Badges; impactPointHistory: ImpactPoints };

  const activeList = badges.badges.map((badge: Badge) => badge.social_cause_category);
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

  const adoptUserBadgeToJobHistoryComp: JobHistoryItemProps[] = impactPointHistory.items.map((item) => {
    const meta = item.organization?.meta as OrgMeta;
    return {
      jobTitle: item?.project?.title,
      date: isoToStandard(item.created_at.toString()),
      total: item.total_points.toString(),
      organizationName: meta?.name,
      dataStart: item?.mission ? isoToStandard(item?.mission.created_at?.toString()) : '',
      dataEnd: item.created_at ? isoToStandard(item.created_at?.toString()) : '',
      avatarUrl: meta?.image,
    };
  });

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
          <JobHistoryList data={adoptUserBadgeToJobHistoryComp} />
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
