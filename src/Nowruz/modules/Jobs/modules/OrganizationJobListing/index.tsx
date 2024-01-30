import { Skeleton } from '@mui/material';
import { ButtonGroups } from 'src/Nowruz/modules/general/components/ButtonGroups';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import { PaginationMobile } from 'src/Nowruz/modules/general/components/paginationMobile';

import css from './organization-job-listing.module.css';
import { useOrganizationJobListing } from './useOrganizationJobListing';
import { OrganizationJobCard } from '../../components/OrganizationJobCard';

export const OrganizationJobListing = () => {
  const { filterButtons, page, setPage, total, PER_PAGE, jobsList, loading } = useOrganizationJobListing();

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
      {jobsList.map((job) => (
        <div className="mt-6">
          <OrganizationJobCard job={job} />
        </div>
      ))}

      <div className="mt-11 hidden md:block">
        <Pagination count={Math.floor(total / PER_PAGE) + (total % PER_PAGE && 1)} onChange={(e, p) => setPage(p)} />
      </div>

      <div className="mt-11 block md:hidden">
        <PaginationMobile
          page={page}
          count={Math.floor(total / PER_PAGE) + (total % PER_PAGE && 1)}
          handleChange={setPage}
        />
      </div>
    </div>
  );
};
