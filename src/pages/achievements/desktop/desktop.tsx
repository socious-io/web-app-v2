import { Card } from 'src/components/atoms/card/card';
import { DesktopBackBox } from 'src/components/molecules/desktop-back-box/desktop-back-box';
import { Modal } from 'src/components/templates/modal/modal';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { useAuth } from 'src/hooks/use-auth';

import css from './desktop.module.scss';
import { getTierRowBasedOnCurrentTier } from '../achievements.services';
import { useAchievementsShared } from '../achievements.shared';
import { ClaimPoints } from '../components/claim-points/claim-points';
import { Reward } from '../components/reward/reward';

export const Desktop = (): JSX.Element => {
  const {
    tier,
    showClaimPointsSlide,
    setShowClaimPointsSlide,
    showCheckRewardsSlide,
    setShowCheckRewardsSlide,
    header,
    bottom,
  } = useAchievementsShared();
  const { isLoggedIn } = useAuth();

  return (
    <TwoColumnCursor visibleSidebar={isLoggedIn}>
      <div className={css.sidebar}>
        <DesktopBackBox label="Return to my profile" />
      </div>
      <Card className={css.card} padding={0}>
        <div className={css.header}>{header}</div>
        <div className={css.body}>{bottom}</div>
        <Modal
          width="30rem"
          maxHeight="90vh"
          onClose={() => setShowClaimPointsSlide(false)}
          open={showClaimPointsSlide}
        >
          <ClaimPoints />
        </Modal>
        <Modal onClose={() => setShowCheckRewardsSlide(false)} open={showCheckRewardsSlide}>
          <Reward tier={getTierRowBasedOnCurrentTier(tier.current)} />
        </Modal>
      </Card>
    </TwoColumnCursor>
  );
};
