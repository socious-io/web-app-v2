import css from './badge-detail-slide.module.scss';
import { TierBadge } from '@atoms/tier-badge/tier-badge';
import { ImpactBarSimple } from '@atoms/impact-bar-simple/impact-bar-simple';
import { BadgeDetailSlideProps } from './badge-detail-slide.types';
import { ImpactCategoryItem } from '@molecules/impact-category-item/impact-category-item';
import { BADGES } from 'src/constants/constants';
import { ImpactBadge } from '@atoms/impact-badge/impact-badge';

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
