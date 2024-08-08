import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { CurrentIdentity, JobsRes } from 'src/core/api';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { JobsListing } from 'src/modules/Jobs/modules/JobListing';
import { SavedJobListing } from 'src/modules/Jobs/modules/savedJobListing';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';

import css from './list.module.scss';

export const JobsList = () => {
  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const userJobs = useLoaderData() as JobsRes;
  const path = useLocation().pathname;
  const savedPage = path.includes('saved');

  const saveButton = (
    <Button
      variant="outlined"
      color="primary"
      customStyle="flex gap-2 !text-sm !py-0"
      onClick={() => navigate('/jobs/saved')}
    >
      <Icon name="bookmark" fontSize={20} />
      Saved jobs
    </Button>
  );

  return (
    <div className={css.container}>
      {currentIdentity?.type === 'organizations' ? (
        <></>
      ) : (
        <>
          <div className={css.header}>
            <div className="flex justify-between items-start">
              <h1 className={css.title}>{savedPage ? 'Saved jobs' : `${userJobs?.total_count} impact jobs`}</h1>
              {!savedPage && <div className="hidden md:block">{saveButton}</div>}
            </div>
            <h2 className={css.subtitle}>
              {savedPage ? 'Your saved jobs' : `Find work that matters to you and the world`}
            </h2>
            {!savedPage && <div className="block md:hidden mt-3">{saveButton}</div>}
          </div>

          <div className={css.list}>{savedPage ? <SavedJobListing /> : <JobsListing />}</div>
        </>
      )}
    </div>
  );
};
