import { useLoaderData } from 'react-router-dom';
import { JobsRes } from 'src/core/api';
import { JobsListing } from 'src/Nowruz/modules/Jobs/modules/JobListing';

import css from './list.module.scss';

export const JobsList = () => {
  const userJobs = useLoaderData() as JobsRes;

  const headerClass = `${css.header}`;

  return (
    <div className={css.container}>
      <div>
        <div className={headerClass}>
          <h1 className={css.title}>{`${userJobs?.total_count} impact jobs`}</h1>
          <h2 className={css.subtitle}>{`Find jobs that makes an impact`}</h2>
        </div>
      </div>
      <div className={css.list}>{<JobsListing />}</div>
    </div>
  );
};
