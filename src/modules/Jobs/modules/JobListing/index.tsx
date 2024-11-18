import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Pagination } from 'src/modules/general/components/Pagination';

import css from './job-listing.module.scss';
import { useJobListing } from './useJobListing';
import { JobListingCard } from '../../components/JobListingCard';

export const JobsListing = () => {
  const navigate = useNavigate();
  const {
    page,
    setPage,
    total,
    PER_PAGE,
    jobsList,
    isMobile,
    loading,
    recommended,
    isLoggedIn,
    scrollRef,
    scrollIndex,
    handleChangeMobilePage,
  } = useJobListing();

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
          {!!recommended && (
            <>
              <div className={css.header}>
                <div className={css.title}>{translate('job-recommended')}</div>
                <div className="flex flex-col md:flex-row items-start gap-4 md:justify-between">
                  <div className={css.subTitle}>{translate('job-profile-based-recommendation')}</div>
                  <Button
                    variant="text"
                    color="primary"
                    customStyle="p-0 !text-sm !font-semibold !leading-5 !h-5"
                    onClick={() => navigate('./recommended')}
                  >
                    {translate('job-see-recommendations')}
                  </Button>
                </div>
              </div>
              <div className="my-6">
                <JobListingCard job={recommended} page={page} displayNotInterested displaySave />
              </div>
            </>
          )}

          <div className={css.header}>
            <div className={css.title}>{translate('job-all')}</div>
            <div className={css.subTitle}>{translate('job-discover')}</div>
          </div>

          <div id="job-listing-div">
            {jobsList.map((job, index) => (
              <div key={job.id} ref={index === scrollIndex ? scrollRef : null} className="mt-6">
                <JobListingCard
                  job={job}
                  displayNotInterested={isLoggedIn}
                  displaySave={isLoggedIn}
                  page={page}
                  scrollIndex={index}
                />
              </div>
            ))}
          </div>
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
