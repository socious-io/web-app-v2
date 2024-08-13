import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
  const { t } = useTranslation('jobs');
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
                <div className={css.title}>{t('RecommendedJobsLabel')}</div>
                <div className="flex flex-col md:flex-row items-start gap-4 md:justify-between">
                  <div className={css.subTitle}>Based on your profile and search history</div>
                  <Button
                    variant="text"
                    color="primary"
                    customStyle="p-0 !text-sm !font-semibold !leading-5 !h-5"
                    onClick={() => navigate('./recommended')}
                  >
                    {t('SeeAllRecommendationsButton')}
                  </Button>
                </div>
              </div>
              <div className="my-6">
                <JobListingCard job={recommended} displayNotInterested displaySave />
              </div>
            </>
          )}

          <div className={css.header}>
            <div className={css.title}>All jobs</div>
            <div className={css.subTitle}>Discover our most recent jobs</div>
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
            {t('SeeMoreButton')}
          </Button>
        </div>
      )}
    </div>
  );
};
