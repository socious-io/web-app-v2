import { translate } from 'src/core/utils';
import { AppliedJobsListing } from 'src/modules/Jobs/modules/AppliedJobsListing';

import css from './list.module.scss';

export const AppliedList = () => {
  return (
    <div className={css.container}>
      <div className={`flex flex-col justify-start md:flex-row md:justify-between`}>
        <div className={css.header}>
          <h1 className={css.title}>{translate('job-applied')}</h1>
          <h2 className={css.subtitle}>{translate('job-my-applied')}</h2>
        </div>
      </div>
      <div className={css.list}>{<AppliedJobsListing />}</div>
    </div>
  );
};
