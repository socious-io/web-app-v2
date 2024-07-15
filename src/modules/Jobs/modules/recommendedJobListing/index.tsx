import { Skeleton } from '@mui/material';

import css from './recommendedJobListing.module.scss';
import { useRecommendedJobListing } from './useRecommendedJobListing';
import { JobListingCard } from '../../components/JobListingCard';

export const RecommendedJobListing = () => {
  const { loading, list } = useRecommendedJobListing();

  return (
    <div className={css.container}>
      {loading ? (
        <div className="flex flex-col gap-4 w-full py-4 mt-6">
          {[...Array(3)].map((e, i) => (
            <Skeleton key={i} variant="rounded" className="w-6/6" height={150} />
          ))}
        </div>
      ) : (
        <div id="job-listing-div">
          {list?.map(job => (
            <div key={job.id} className="mt-6">
              <JobListingCard job={job} displayNotInterested displaySave />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
