import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { JobsRes } from 'src/core/api';
import { JobsListing } from 'src/Nowruz/modules/Jobs/modules/JobListing';

import css from './list.module.scss';

export const JobsList = () => {
  const data = useLoaderData() as JobsRes;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>{data?.total_count} impact jobs</h1>
        <h2 className={css.subtitle}> Find jobs that makes an impact</h2>
      </div>
      <div className={css.list}>
        <JobsListing />
      </div>
    </div>
  );
};
