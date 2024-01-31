import { Divider } from 'src/components/templates/divider/divider';

import css from './reward.module.scss';
import { RewardProps } from './reward.types';

export const Reward = ({ tier }: RewardProps): JSX.Element => {
  if (!tier) {
    return <>Could not find Tier</>;
  }

  return (
    <div className={css.container}>
      <div className={css.header}>Your rewards</div>
      <Divider title="Tier">
        <>
          Tier {tier.tier}{' '}
          <span className={css.tierMinMax}>
            ({tier.min}, {tier.max})
          </span>
        </>
      </Divider>
      <Divider title="Access">{tier.access}</Divider>
      <Divider title="Community">{tier.community}</Divider>
      <Divider title="Tokens">
        <div className={css.tokenContainer}>
          <div>
            <div className={css.tokenLabels}>Discount</div>
            {tier.discount}
          </div>
          <div>
            <div className={css.tokenLabels}>Staking</div>
            {tier.stakingReward}
          </div>
        </div>
      </Divider>
    </div>
  );
};
