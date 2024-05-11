import { Skeleton } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { ButtonGroups } from 'src/Nowruz/modules/general/components/ButtonGroups';
import { EmptyState } from 'src/Nowruz/modules/general/components/EmptyState';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import { PaginationMobile } from 'src/Nowruz/modules/general/components/paginationMobile';

import css from './organization-job-listing.module.css';
import { useOrganizationJobListing } from './useOrganizationJobListing';
import { OrganizationJobCard } from '../../components/OrganizationJobCard';

export const OrganizationJobListing = () => {
  const { filterButtons, page, setPage, total, PER_PAGE, jobsList, loading, navigateToCreateJob } =
    useOrganizationJobListing();
  return (
    <div className={css.container}>
      <ButtonGroups buttons={filterButtons} />
      {loading && (
        <div className="flex flex-col gap-4 w-full py-4 mt-6">
          <Skeleton variant="rounded" className="w-6/6" height={150} />
          <Skeleton variant="rounded" className="w-6/6" height={150} />
          <Skeleton variant="rounded" className="w-6/6" height={150} />
        </div>
      )}

      {!loading &&
        jobsList.map(job => (
          <div key={job.id} className="mt-6">
            <OrganizationJobCard job={job} />
          </div>
        ))}
      {jobsList.length === 0 && !loading && (
        <div className="mt-6">
          <EmptyState
            icon={<Icon name="search-lg" fontSize={24} color={variables.color_grey_700} />}
            message="No jobs found"
            button={
              <Button
                id="create-first-job"
                startIcon={<Icon name="plus" color={variables.color_white} />}
                color="primary"
                variant="contained"
                onClick={navigateToCreateJob}
              >
                Create job
              </Button>
            }
          />
        </div>
      )}
      {jobsList.length > 0 && (
        <div className="mt-11 hidden md:block">
          <Pagination page={page} count={Math.ceil(total / PER_PAGE)} onChange={(e, p) => setPage(p)} />
        </div>
      )}
      {jobsList.length > 0 && (
        <div className="mt-11 block md:hidden">
          <PaginationMobile page={page} count={Math.ceil(total / PER_PAGE)} handleChange={setPage} />
        </div>
      )}
    </div>
  );
};
