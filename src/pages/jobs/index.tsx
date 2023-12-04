import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Search } from 'src/components/atoms/search/search';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { ProfileCard } from 'src/components/templates/profile-card';
import { TwoColumns } from 'src/components/templates/refactored/twoColumns/twoColumns';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { printWhen } from 'src/core/utils';
import { SearchModal } from 'src/Nowruz/modules/Search/containers/SearchModal';
import { visibility } from 'src/store/reducers/menu.reducer';

import css from './jobs.module.scss';
import { useJobsShared } from './jobs.shared';

export const Jobs = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onMorePage, jobList, identity, goToJobDetail, showMorePageBtn } = useJobsShared();
  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate('/network/connections') },
    { label: 'Following', icon: '/icons/followers.svg', link: () => navigate('/network/followings') },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate(`/team/${identity.id}`) },
  ];

  const jobsMenuListUser = [
    {
      label: 'My applications',
      icon: '/icons/my-applications.svg',
      link: () => navigate(`/jobs/applied/${identity.id}`),
    },
  ];

  const jobsMenuListOrg = [
    {
      label: 'Created',
      icon: '/icons/folder-black.svg',
      link: () => navigate(`/jobs/created/${identity.id}`),
    },
  ];
  function openSidebar() {
    console.log('open side');
    hapticsImpactLight();
    dispatch(visibility(true));
  }
  function onEnter(value: string) {
    navigate(`/search?q=${value}&type=projects&page=1`);
  }

  return (
    <TwoColumns>
      <div className={css.sidebar}>
        <ProfileCard />
        <CardMenu title="Network" list={identity?.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
        {printWhen(<CardMenu title="Jobs" list={jobsMenuListUser} />, identity?.type === 'users')}
        {printWhen(<CardMenu title="Jobs" list={jobsMenuListOrg} />, identity?.type === 'organizations')}
      </div>
      <>
        <SearchModal open={true} onClose={() => console.log('closeModal')} />
        <div className={css.banner}>
          <div className={`block md:hidden ${css.menu}`}>
            <Avatar onClick={openSidebar} img={avatarImg} size="2.25rem" type={identity?.type || 'users'} />
            <Search placeholder="Search Jobs" onValueChange={console.log} onEnter={onEnter} />
            <img className={css.logo} src="icons/logo-white.svg" />
          </div>
          <div className={css.title}>Jobs</div>
          <div className={css.tagline}>Find jobs that make a social impact</div>
        </div>
        <div className={css.list}>
          <JobList showMorePage={showMorePageBtn} onClick={goToJobDetail} onMorePageClick={onMorePage} data={jobList} />
        </div>
      </>
    </TwoColumns>
  );
};
