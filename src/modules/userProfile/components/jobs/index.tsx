import { translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Icon } from 'src/modules/general/components/Icon';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import EmptyBox from 'src/modules/general/containers/EmptyBox';
import { JobListingCard } from 'src/modules/Jobs/components/JobListingCard';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './organization-jobs.module.scss';
import { useOrganizationJobs } from './useOrganizationJobs';

export const OrganizationJobs = () => {
  const {
    data: { jobs, total, PER_PAGE, page, myProfile },
    operations: { setPage, onCreateJob },
  } = useOrganizationJobs();

  const EmptyServices = myProfile ? (
    <EmptyBox
      icon={<FeaturedIcon iconName="search-lg" size="lg" type="modern" theme="gray" />}
      title={translate('jobs-empty.title')}
      subtitle={translate('jobs-empty.subtitle')}
      button={{
        children: translate('jobs-create-new'),
        color: 'primary',
        startIcon: <Icon name="plus" color={variables.color_white} />,
        onClick: onCreateJob,
      }}
    />
  ) : (
    <AlertMessage
      iconName="info-circle"
      theme="gray"
      title={translate('jobs-other-empty.title')}
      subtitle={translate('jobs-other-empty.subtitle')}
    />
  );

  return jobs.length ? (
    <div className={css.organizationJobs}>
      <div className={css.jobListing}>
        {jobs.map(job => (
          <div key={job.id} className={css.jobItem}>
            <JobListingCard job={job} hasDescription={false} />
          </div>
        ))}
      </div>
      <div className="mt-11 hidden md:block">
        <Pagination page={page} count={Math.ceil(total / PER_PAGE)} onChange={(e, p) => setPage(p)} />
      </div>
      <div className="mt-11 block md:hidden">
        <PaginationMobile page={page} count={Math.ceil(total / PER_PAGE)} handleChange={setPage} />
      </div>
    </div>
  ) : (
    EmptyServices
  );
};
