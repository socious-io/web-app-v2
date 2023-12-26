import React from 'react';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './job-listing.module.scss';
import { useJobListing } from './useJobListing';
import { JobListingCard } from '../../components/JobListingCard';
export const JobsListing = () => {
  const { setPage, ref, total, PER_PAGE, jobsList, isMobile } = useJobListing();
  const handleLoadMore = () => {
    if (isMobile) return <div ref={ref} />;
    else
      return (
        <div className="mt-11">
          <Pagination count={Math.floor(total / PER_PAGE) + (total % PER_PAGE && 1)} onChange={(e, p) => setPage(p)} />
        </div>
      );
  };
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.title}>All jobs</div>
        <div className={css.subTitle}>Discover our most recent jobs</div>
      </div>
      {jobsList.map((job) => (
        <div className="mt-6">
          <JobListingCard job={job} />
        </div>
      ))}

      {handleLoadMore()}
    </div>
  );
};
