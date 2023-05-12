import { useState } from 'react';
import { evaluateTier } from './mobile/achievements.service';
import { useMatch } from '@tanstack/react-location';
import { Loader } from './achievements.types';
import { Header } from './components/header/header';
import { ImpactCategoryList } from 'src/components/organisms/impact-category-list/impact-category-list';

export const useAchievementsShared = () => {
  const { badges } = useMatch().ownData as Loader;
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

  const bottom = (
    <div style={{ padding: '1rem 0' }}>
      <ImpactCategoryList activeList={activeList} tier={tier} />
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
