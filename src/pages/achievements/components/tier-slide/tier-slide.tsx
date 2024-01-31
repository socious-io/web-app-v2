import { ImpactBarSimple } from 'src/components/atoms/impact-bar-simple/impact-bar-simple';
import { TierBadge } from 'src/components/atoms/tier-badge/tier-badge';
import { TIERS } from 'src/constants/TIERS_TABLE';

import css from './tier-slide.module.scss';
import { TierSlideProps } from './tier-slide.types';

export const TierSlide = (props: TierSlideProps): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        {/* <div className={css.featureOnProfile}>
          <Checkbox label="feature on profile" id="bookmark" />
        </div> */}
        <div className={css.tierBadgeContainer}>
          <TierBadge size="6rem" value={props.tier.current} />
        </div>
        <ImpactBarSimple
          marginBottom="1rem"
          start={props.tier.prevPoint}
          end={props.tier.nextPoint}
          current={props.tier.currentPoint}
        />
      </div>
      <div className={css.body}>
        <div className={css.badgeList}>
          {TIERS.map(({ tier }) => {
            return <TierBadge disabled={tier > props.tier.current} key={tier} value={tier} />;
          })}
        </div>
      </div>
    </div>
  );
};
