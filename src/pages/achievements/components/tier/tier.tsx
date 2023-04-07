import { CardSlideUp } from 'src/components/templates/card-slide-up/card-slide-up';
import css from './tier.module.scss';
import { TierProps } from './tier.types';
import { useState } from 'react';
import { TierSlide } from '../tier-slide/tier-slide';
import { TierBadge } from 'src/components/atoms/tier-badge/tier-badge';

export const Tier = (props: TierProps): JSX.Element => {
  const [slideVisibility, setSlideVisibility] = useState(false);

  return (
    <div className={css.container}>
      <div className={css.tierContainer} onClick={() => setSlideVisibility(true)}>
        <div className={css.overlay}>
          <TierBadge withLabel={false} value={props.tier.current} />
          <div className={css.tierLabel}>Tier {props.tier.current}</div>
        </div>
        {/* <div className={css.badge}>Tier {props.tier.current}</div> */}
      </div>
      <CardSlideUp open={slideVisibility} onClose={() => setSlideVisibility(false)}>
        <TierSlide tier={props.tier} />
      </CardSlideUp>
    </div>
  );
};
