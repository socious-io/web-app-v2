import { CardSlideUp } from 'src/components/templates/card-slide-up/card-slide-up';
import css from './tier.module.scss';
import { TierProps } from './tier.types';
import { useState } from 'react';
import { TierSlide } from '../tier-slide/tier-slide';

export const Tier = (props: TierProps): JSX.Element => {
  const [slideVisibility, setSlideVisibility] = useState(true);

  return (
    <div className={css.container}>
      <div className={css.tier} onClick={() => setSlideVisibility(true)}>
        Tier {props.tier.current}
      </div>
      <CardSlideUp open={slideVisibility} onClose={() => setSlideVisibility(false)}>
        <TierSlide tier={props.tier} />
      </CardSlideUp>
    </div>
  );
};
