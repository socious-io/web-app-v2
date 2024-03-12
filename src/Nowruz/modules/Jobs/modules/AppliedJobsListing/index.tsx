import { Applicant } from 'src/core/api';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import { PaginationMobile } from 'src/Nowruz/modules/general/components/paginationMobile';

import css from './job-listing.module.scss';
import { useAppliedJobListing } from './useAppliedJobListing';
import { JobListingCard } from '../../components/JobListingCard';

export const AppliedJobsListing = () => {
  const { applicants, page, totalCount, setPage, PER_PAGE } = useAppliedJobListing();

  return (
    <div className={css.container}>
      {applicants.map((item: Applicant) => (
        <div key={item?.id} className="mt-6">
          <JobListingCard job={{ ...item.project, identity_meta: item.organization?.meta }} />
        </div>
      ))}
      {applicants.length > 0 && totalCount > PER_PAGE && (
        <div className="mt-11 hidden md:block">
          <Pagination page={page} count={Math.ceil(totalCount / PER_PAGE)} onChange={(e, p) => setPage(p)} />
        </div>
      )}
      {applicants.length > 0 && totalCount > PER_PAGE && (
        <div className="mt-11 block md:hidden">
          <PaginationMobile page={page} count={Math.ceil(totalCount / PER_PAGE)} handleChange={setPage} />
        </div>
      )}
    </div>
  );
};
