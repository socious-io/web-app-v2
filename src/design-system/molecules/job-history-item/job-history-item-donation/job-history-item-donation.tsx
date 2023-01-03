import css from './job-history-item-donation.module.scss';
import {JobHistoryItemDonationProps as Props} from './job-history-item-donation.types';
// import OrganizationIcon from '/asset/icons/Base.svg';

export const JobHistoryItemDonation = (props: Props): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.left}>
        <div className={css.typeName}>Donation</div>
        <div className={css.organizationContainer}>
          {/* <img
            className={css.organizationImage}
            width={48}
            height={48}
            src={OrganizationIcon}
            alt="organization image"
          /> */}
          <div className={css.organizationName}>Organization</div>
          <div className={css.amount}>$ 500</div>
        </div>
      </div>
      <div className={css.right}>
        <div className={css.date}>02/20/2022</div>
        <div className={css.percent}>+35</div>
        <div className={css.total}>Total IS: 555</div>
      </div>
    </div>
  );
};
