import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { CurrentIdentity, JobsRes } from 'src/core/api';
import { JobsListing } from 'src/Nowruz/modules/Jobs/modules/JobListing';
import { SavedJobListing } from 'src/Nowruz/modules/Jobs/modules/savedJobListing';
import { RootState } from 'src/store';

import css from './list.module.scss';

export const JobsList = () => {
  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const userJobs = useLoaderData() as JobsRes;
  const path = useLocation().pathname;
  const savedPage = path.includes('saved');
  const headerClass = `${css.header}`;

  useEffect(() => {
    if (currentIdentity?.type === 'organizations') navigate('/jobs/created');
  }, []);

  return (
    <div className={css.container}>
      {currentIdentity?.type === 'organizations' ? (
        <></>
      ) : (
        <>
          <div>
            <div className={headerClass}>
              <h1 className={css.title}>{savedPage ? 'Saved jobs' : `${userJobs?.total_count} impact jobs`}</h1>
              <h2 className={css.subtitle}>
                {savedPage ? 'Your saved jobs' : `Find work that matters to you and the world`}
              </h2>
            </div>
          </div>

          <div className={css.list}>{savedPage ? <SavedJobListing /> : <JobsListing />}</div>
        </>
      )}
    </div>
  );
};
