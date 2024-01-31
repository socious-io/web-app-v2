import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './job-listing.module.scss';
import { useJobListing } from './useJobListing';
import { JobListingCard } from '../../components/JobListingCard';

export const JobsListing = () => {
  const { page, setPage, total, PER_PAGE, jobsList, isMobile } = useJobListing();

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
      {!isMobile && (
        <div className="mt-11">
          <Pagination count={Math.floor(total / PER_PAGE) + (total % PER_PAGE && 1)} onChange={(e, p) => setPage(p)} />
        </div>
      )}
      {isMobile && (
        <div className="mt-5 flex items-center justify-center">
          <Button color="primary" variant="text" onClick={() => setPage(page + 1)}>
            See more
          </Button>
        </div>
      )}
    </div>
  );
};
