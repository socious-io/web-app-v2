import { CircularProgress } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './organization-job-listing.module.css';
import { useOrganizationJobListing } from './useOrganizationJobListing';
import { OrganizationJobCard } from '../../components/OrganizationJobCard';

export const OrganizationJobListing = () => {
  const { page, setPage, total, PER_PAGE, jobsList, isMobile, loading } = useOrganizationJobListing();

  return (
    <div className={css.container}>
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
      {!isMobile && (
        <div className="mt-11 bt-">
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
