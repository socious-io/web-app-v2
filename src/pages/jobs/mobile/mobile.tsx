import css from './mobile.module.scss';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { useJobsShared } from '../jobs.shared';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { useDispatch } from 'react-redux';
import { visibility } from 'src/store/reducers/menu.reducer';
import { useNavigate } from '@tanstack/react-location';
import { Search } from '../../../components/atoms/search/search';

export const Mobile = (): JSX.Element => {
  const { onMorePage, jobList, avatarImg, identity } = useJobsShared();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function openSidebar() {
    hapticsImpactLight();
    dispatch(visibility(true));
  }

  function onEnter(value: string) {
    navigate({ to: `/search?q=${value}` });
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
      <JobList onMorePageClick={onMorePage} padding="1rem" data={jobList} />
    </div>
  );
};
