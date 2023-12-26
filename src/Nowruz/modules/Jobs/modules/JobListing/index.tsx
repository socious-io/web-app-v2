import React from 'react';

import css from './job-listing.module.scss';
import { JobListingCard } from '../../components/JobListingCard';
export const JobsListing = () => {
  return (
    <div>
      <div className={css.header}>
        <div className={css.title}></div>
        <div className={css.subTitle}></div>
      </div>
      <JobListingCard />
    </div>
  );
};
