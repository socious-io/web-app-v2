import { useState } from 'react';
import { TierBadge } from 'src/components/atoms/tier-badge/tier-badge';
import { CardSlideUp } from 'src/components/templates/card-slide-up/card-slide-up';
import { Modal } from 'src/components/templates/modal/modal';
import { isTouchDevice } from 'src/core/device-type-detector';

import css from './tier.module.scss';
import { TierProps } from './tier.types';
import { TierSlide } from '../tier-slide/tier-slide';


export const Tier = (props: TierProps): JSX.Element => {
  const [slideVisibility, setSlideVisibility] = useState(false);

  const modalView = (
    <Modal width="30rem" maxHeight="70vh" open={slideVisibility} onClose={() => setSlideVisibility(false)}>
      <TierSlide tier={props.tier} />
    </Modal>
  );

  const slideView = (
    <CardSlideUp open={slideVisibility} onClose={() => setSlideVisibility(false)}>
      <TierSlide tier={props.tier} />
    </CardSlideUp>
  );

  return (
    <div className={css.container}>
      <div className={css.tierContainer} onClick={() => setSlideVisibility(true)}>
        <div className={css.overlay}>
          <TierBadge withLabel={false} value={props.tier.current} />
          <div className={css.tierLabel}>Tier {props.tier.current}</div>
        </div>
      </div>
      {isTouchDevice() ? slideView : modalView}
    </div>
  );
};
