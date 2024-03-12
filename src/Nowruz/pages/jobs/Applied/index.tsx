import { AppliedJobsListing } from 'src/Nowruz/modules/Jobs/modules/AppliedJobsListing';

import css from './list.module.scss';

export const AppliedList = () => {
  return (
    <div className={css.container}>
      <div className={`flex flex-col justify-start md:flex-row md:justify-between`}>
        <div className={css.header}>
          <h1 className={css.title}>Applied jobs</h1>
          <h2 className={css.subtitle}>{`My applied jobs`}</h2>
        </div>
      </div>
      <div className={css.list}>{<AppliedJobsListing />}</div>
    </div>
  );
};
