import { useMatch } from '@tanstack/react-location';
import { useState } from 'react';
import { CardSlideUp } from 'src/components/templates/card-slide-up/card-slide-up';
import { TwoThird } from '../../../components/templates/two-third/two-third';
import { Loader } from '../achievements.types';
import { ClaimPoints } from '../components/claim-points/claim-points';
import { evaluateTier } from './achievements.service';
import { Body as ImpactCategoryList } from '../components/body/body';
import { Header } from '../components/header/header';

export const Mobile = (): JSX.Element => {
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
  const bottom = <ImpactCategoryList activeList={activeList} tier={tier} />;

  return (
    <>
      <TwoThird top={header} bottom={bottom} />
      <CardSlideUp onClose={() => setShowClaimPointsSlide(false)} open={showClaimPointsSlide}>
        <ClaimPoints />
      </CardSlideUp>
      <CardSlideUp onClose={() => setShowCheckRewardsSlide(false)} open={showCheckRewardsSlide}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non, nisi veniam, enim illo culpa soluta
        recusandae eum illum consectetur nobis perspiciatis provident in, ipsam iusto? Vel dolores nesciunt praesentium?
      </CardSlideUp>
    </>
  );
};
