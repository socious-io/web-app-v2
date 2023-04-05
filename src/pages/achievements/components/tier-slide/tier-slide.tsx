import { TIERS } from 'src/constants/TIERS_TABLE';
import css from './tier-slide.module.scss';
import { TierSlideProps } from './tier-slide.types';
import { TierBadge } from 'src/components/atoms/tier-badge/tier-badge';

export const TierSlide = (props: TierSlideProps): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.featureOnProfile}>feature on profile</div>
        <div className={css.tierBadgeContainer}>

        <TierBadge size="6rem" value={3} />
        </div>
        <div>baaaaaaaar</div>
      </div>
      <div className={css.body}>
        {/* {TIERS.map((tier) => {
          return <div key={tier.tier}>Tier{tier.tier}</div>;
        })} */}
      </div>
    </div>
  );
};
