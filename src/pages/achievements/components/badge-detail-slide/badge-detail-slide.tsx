import { ImpactBadge } from 'src/components/atoms/impact-badge/impact-badge';
import { ImpactBarSimple } from 'src/components/atoms/impact-bar-simple/impact-bar-simple';
import { TierBadge } from 'src/components/atoms/tier-badge/tier-badge';
import { ImpactCategoryItem } from 'src/components/molecules/impact-category-item/impact-category-item';
import { BADGES } from 'src/constants/constants';

import css from './badge-detail-slide.module.scss';
import { BadgeDetailSlideProps } from './badge-detail-slide.types';


export const BadgeDetailSlide = ({ id = 'NO_POVERTY' }: BadgeDetailSlideProps): JSX.Element => {
  const b = BADGES[id];

  return (
    <div className={css.container}>
      <div className={css.header}>
        {/* <div className={css.featureOnProfile}>
          <Checkbox label="feature on profile" id="bookmark" />
        </div> */}
        <ImpactBadge size="6rem" color={b.color} iconUrl={`/sdg/${b.value}.svg`} />
        <div className={css.label}>{b.label}</div>
      </div>
      <div className={css.body}>
        <span>{b.description}</span>
      </div>
    </div>
  );
};
