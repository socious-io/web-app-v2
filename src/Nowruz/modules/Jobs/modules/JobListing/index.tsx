import { Skeleton } from '@mui/material';
import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './job-listing.module.scss';
import { useJobListing } from './useJobListing';
import { JobListingCard } from '../../components/JobListingCard';

export const JobsListing = () => {
  const { page, setPage, total, PER_PAGE, jobsList, isMobile, loading } = useJobListing();

  return (
    <div className={css.container}>
      {loading ? (
        <div className="flex flex-col gap-4 w-full py-4 mt-6">
          {[...Array(PER_PAGE)].map((e, i) => (
            <Skeleton key={i} variant="rounded" className="w-6/6" height={150} />
          ))}
        </div>
      ) : (
        <>
          <div className={css.header}>
            <div className={css.title}>All jobs</div>
            <div className={css.subTitle}>Discover our most recent jobs</div>
          </div>
          {jobsList.map((job) => (
            <div key={job.id} className="mt-6">
              <JobListingCard job={job} />
            </div>
          ))}
        </>
      )}
      {!isMobile && (
        <div className="mt-11">
          <Pagination
            page={page}
            count={Math.floor(total / PER_PAGE) + (total % PER_PAGE && 1)}
            onChange={(e, p) => setPage(p)}
          />
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
