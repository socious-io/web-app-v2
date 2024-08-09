import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { CurrentIdentity, JobsRes } from 'src/core/api';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { JobsListing } from 'src/modules/Jobs/modules/JobListing';
import { SavedJobListing } from 'src/modules/Jobs/modules/savedJobListing';
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
  const { t } = useTranslation('jobs');
  const saveButton = (
    <Button
      variant="outlined"
      color="primary"
      customStyle="flex gap-2 !text-sm !py-0"
      onClick={() => navigate('/jobs/saved')}
    >
      <Icon name="bookmark" fontSize={20} />
      {t('SavedJobsLabel')}
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
              <h1 className={css.title}>
                {savedPage ? t('SavedJobsLabel') : `${userJobs?.total_count} ${t('JobsListingCount')}`}
              </h1>
              {!savedPage && <div className="hidden md:block">{saveButton}</div>}
            </div>
            <h2 className={css.subtitle}>{savedPage ? t('YourSavedJobsLabel') : t('JobsListingHint')}</h2>
            {!savedPage && <div className="block md:hidden mt-3">{saveButton}</div>}
          </div>

          <div className={css.list}>{savedPage ? <SavedJobListing /> : <JobsListing />}</div>
        </>
      )}
    </div>
  );
};
