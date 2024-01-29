import { CircularProgress } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
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
        <div className={css.loader}>
          <CircularProgress size="32px" sx={{ color: variables.color_primary_700 }} />
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
