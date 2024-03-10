import { Applicant } from 'src/core/api';

import css from './job-listing.module.scss';
import { useAppliedJobListing } from './useAppliedJobListing';
import { JobListingCard } from '../../components/JobListingCard';

export const AppliedJobsListing = () => {
  const { applicants } = useAppliedJobListing();

  return (
    <div className={css.container}>
      {applicants.map((item: Applicant) => (
        <div key={item?.id} className="mt-6">
          <JobListingCard job={{ ...item.project, identity_meta: item.organization?.meta }} />
        </div>
      ))}
    </div>
  );
};
