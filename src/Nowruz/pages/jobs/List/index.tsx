import React from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, JobsRes } from 'src/core/api';
import { JobsListing } from 'src/Nowruz/modules/Jobs/modules/JobListing';
import { OrganizationJobListing } from 'src/Nowruz/modules/Jobs/modules/OrganizationJobListing';
import { RootState } from 'src/store';

import css from './list.module.scss';

export const JobsList = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity: CurrentIdentity) => identity.current);
  });
  const isUser = currentIdentity?.type === 'users';
  const { userJobs } = useLoaderData() as {
    activeJobs: JobsRes;
    archivedJobs: JobsRes;
    userJobs: JobsRes;
  };

  const headerClass = `${css.header} ${!isUser && css.headerOverwrite}`;

  return (
    <div className={css.container}>
      <div className={headerClass}>
        <h1 className={css.title}>{isUser ? `${userJobs?.total_count} impact jobs` : `Jobs listing`}</h1>
        <h2 className={css.subtitle}>
          {isUser ? `Find jobs that makes an impact` : `Manage your published and draft job listings here.`}
        </h2>
      </div>
      <div className={css.list}>{isUser ? <JobsListing /> : <OrganizationJobListing />}</div>
    </div>
  );
};
