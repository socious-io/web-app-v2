import { CardSlideUp } from 'src/components/templates/card-slide-up/card-slide-up';
import { TwoThird } from '../../../components/templates/two-third/two-third';
import { ClaimPoints } from '../components/claim-points/claim-points';
import { Reward } from '../components/reward/reward';
import { getTierRowBasedOnCurrentTier } from '../achievements.services';
import { useAchievementsShared } from '../achievements.shared';

export const Mobile = (): JSX.Element => {
  const {
    tier,
    showClaimPointsSlide,
    setShowClaimPointsSlide,
    showCheckRewardsSlide,
    setShowCheckRewardsSlide,
    header,
    bottom,
  } = useAchievementsShared();

  return (
    <>
      <TwoThird top={header} bottom={bottom} />
      <CardSlideUp onClose={() => setShowClaimPointsSlide(false)} open={showClaimPointsSlide}>
        <ClaimPoints />
      </CardSlideUp>
      <CardSlideUp onClose={() => setShowCheckRewardsSlide(false)} open={showCheckRewardsSlide}>
        <Reward tier={getTierRowBasedOnCurrentTier(tier.current)} />
      </CardSlideUp>
    </>
  );
};
