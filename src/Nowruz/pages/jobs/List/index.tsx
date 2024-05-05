import { useLoaderData, useLocation } from 'react-router-dom';
import { JobsRes } from 'src/core/api';
import { JobsListing } from 'src/Nowruz/modules/Jobs/modules/JobListing';

import css from './list.module.scss';

export const JobsList = () => {
  const userJobs = useLoaderData() as JobsRes;

  const path = useLocation().pathname;
  const savedPage = path.includes('saved');

  const headerClass = `${css.header}`;

  return (
    <div className={css.container}>
      <div>
        <div className={headerClass}>
          <h1 className={css.title}>{savedPage ? 'Saved jobs' : `${userJobs?.total_count} impact jobs`}</h1>
          <h2 className={css.subtitle}>
            {savedPage ? 'Your saved jobs' : `Find work that matters to you and the world`}
          </h2>
        </div>
      </div>

      <div className={css.list}>{<JobsListing />}</div>
    </div>
  );
};
