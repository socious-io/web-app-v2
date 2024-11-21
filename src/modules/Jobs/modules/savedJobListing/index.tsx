import { Skeleton } from '@mui/material';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Pagination } from 'src/modules/general/components/Pagination';

import css from './savedJobListing.module.scss';
import { useSavedJobListing } from './useSavedJobListing';
import { JobListingCard } from '../../components/JobListingCard';

export const SavedJobListing = () => {
  const {
    page,
    setPage,
    total,
    PER_PAGE,
    jobsList,
    isMobile,
    loading,
    scrollRef,
    scrollIndex,
    handleChangeMobilePage,
  } = useSavedJobListing();

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
          {jobsList.map((job, index) => (
            <div key={job.id} className="mt-6" ref={index === scrollIndex ? scrollRef : null}>
              <JobListingCard job={job} displaySave saveAction={() => setPage(1)} page={page} scrollIndex={index} />
            </div>
          ))}
        </>
      )}
      {!isMobile && (
        <div className="mt-11">
          <Pagination page={page} count={Math.ceil(total / PER_PAGE)} onChange={(e, p) => setPage(p)} />
        </div>
      )}
      {isMobile && jobsList.length < total && (
        <div className="mt-5 flex items-center justify-center">
          <Button color="primary" variant="text" onClick={handleChangeMobilePage}>
            {translate('job-see-more')}
          </Button>
        </div>
      )}
    </div>
  );
};
