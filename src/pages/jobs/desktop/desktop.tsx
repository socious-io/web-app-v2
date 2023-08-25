import { useNavigate } from '@tanstack/react-location';
import { TwoColumnCursor } from '@templates/two-column-cursor/two-column-cursor';
import { ProfileCard } from '@templates/profile-card';
import { CardMenu } from '@molecules/card-menu/card-menu';
import { JobList } from '@organisms/job-list/job-list';
import { printWhen } from 'src/core/utils';
import { useJobsShared } from '../jobs.shared';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const { onMorePage, jobList, identity, goToJobDetail, showMorePageBtn } = useJobsShared();

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Following', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate({ to: `/team/${identity.id}` }) },
  ];

  const jobsMenuListUser = [
    {
      label: 'My applications',
      icon: '/icons/my-applications.svg',
      link: () => navigate({ to: `/d/jobs/applied/${identity.id}` }),
    },
  ];

  const jobsMenuListOrg = [
    {
      label: 'Created',
      icon: '/icons/folder-black.svg',
      link: () => navigate({ to: `/d/jobs/created/${identity.id}` }),
    },
  ];

  return (
    <TwoColumnCursor visibleSidebar={!!identity}>
      <div className={css.sidebar}>
        <ProfileCard />
        <CardMenu title="Network" list={identity?.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
        {printWhen(<CardMenu title="Jobs" list={jobsMenuListUser} />, identity?.type === 'users')}
        {printWhen(<CardMenu title="Jobs" list={jobsMenuListOrg} />, identity?.type === 'organizations')}
      </div>
      <>
        <div className={css.banner}>
          <div className={css.title}>Jobs</div>
          <div className={css.tagline}>Find jobs that make a social impact</div>
        </div>
        <div className={css.list}>
          <JobList
            showMorePage={showMorePageBtn}
            onClick={goToJobDetail}
            onMorePageClick={onMorePage}
            data={jobList}
          />
        </div>
      </>
    </TwoColumnCursor>
  );
};
