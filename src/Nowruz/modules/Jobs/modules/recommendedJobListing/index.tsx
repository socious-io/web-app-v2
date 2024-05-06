import { useLoaderData } from 'react-router-dom';
import { JobsRes } from 'src/core/api';

import css from './recommendedJobListing.module.scss';
import { JobListingCard } from '../../components/JobListingCard';

export const RecommendedJobListing = () => {
  const loaderData = useLoaderData() as JobsRes;
  return (
    <div className={css.container}>
      <div id="job-listing-div">
        {loaderData.items.map(job => (
          <div key={job.id} className="mt-6">
            <JobListingCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};
