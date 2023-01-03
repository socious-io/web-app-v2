import css from './job-history-item.module.scss';
import {JobHistoryItemProps as Props} from './job-history-item.types';
// import OrganizationIcon from '/asset/icons/Base.svg';

export const JobHistoryItem = (props: Props): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.left}>
        <div className={css.typeName}>Donation</div>
        <div className={css.organizationContainer}>
          {/* <img
            className={css.organizationImage}
            width={32}
            height={32}
            src={OrganizationIcon}
            alt="organization image"
          /> */}
          <div className={css.organizationName}>Organization</div>
        </div>
        <div className={css.duration}>Mar 1 - Mar 10</div>
      </div>
      <div className={css.right}>
        <div className={css.date}>02/20/2022</div>
        <div className={css.percent}>+35</div>
        <div className={css.total}>Total IS: 555</div>
      </div>
    </div>
  );
};
