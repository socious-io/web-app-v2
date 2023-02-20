import css from './jobs-touch.module.scss';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { JobList } from '../../../components/organisms/job-list/job-list';
import { JobsTouchProps } from './jobs-touch.types';
import { useState } from 'react';
import { getJobList } from '../jobs-cursor/jobs-cursor.services';
import { useDispatch, useSelector } from 'react-redux';
import { IdentityReq } from '../../../core/types';
import { RootState } from '../../../store/store';
import { visibility } from '../../../store/reducers/menu.reducer';
import { Search } from '../../../components/atoms/search/search';

export const JobsTouch = (props: JobsTouchProps): JSX.Element => {
  const dispatch = useDispatch();
  const { list } = props;
  const [jobList, setJobList] = useState(list);
  const [page, setPage] = useState(1);

  function openSidebar() {
    dispatch(visibility(true));
  }

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const avatarImg = identity.meta.avatar || identity.meta.image;

  function onMorePage() {
    getJobList({ page: page + 1 }).then((resp) => {
      setPage((v) => v + 1);
      setJobList((list) => [...list, ...resp.items]);
    });
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.menu}>
          <Avatar onClick={openSidebar} img={avatarImg} size="2.25rem" type={identity.type} />
          <Search placeholder="Search Jobs" onValueChange={console.log} />
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
