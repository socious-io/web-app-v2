import { useNavigate } from '@tanstack/react-location';
import { useDispatch } from 'react-redux';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { Search } from 'src/components/atoms/search/search';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { visibility } from 'src/store/reducers/menu.reducer';
import { useJobsShared } from '../jobs.shared';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const { onMorePage, jobList, identity, goToJobDetail } = useJobsShared();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  function openSidebar() {
    hapticsImpactLight();
    dispatch(visibility(true));
  }

  function onEnter(value: string) {
    navigate({ to: `/m/search?q=${value}&type=projects&page=1` });
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.menu}>
          <Avatar onClick={openSidebar} img={avatarImg} size="2.25rem" type={identity.type} />
          <Search placeholder="Search Jobs" onValueChange={console.log} onEnter={onEnter} />
          <img className={css.logo} src="icons/logo-white.svg" />
        </div>
        <div>
          <div className={css.title}>Jobs</div>
          <div className={css.tagline}>Find jobs that make a social impact</div>
        </div>
      </div>
      <JobList onClick={goToJobDetail} onMorePageClick={onMorePage} padding="1rem" data={jobList} />
    </div>
  );
};
