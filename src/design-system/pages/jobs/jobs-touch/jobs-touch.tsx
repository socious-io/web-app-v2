import css from './jobs-touch.module.scss';
import { Avatar } from '../../../atoms/avatar/avatar';
import { JobList } from '../../../organisms/job-list/job-list';
import { JobsTouchProps } from './jobs-touch.types';
import { useState } from 'react';
import { getJobList } from '../jobs-cursor/jobs-cursor.services';

export const JobsTouch = (props: JobsTouchProps): JSX.Element => {
  const { list } = props;
  const [jobList, setJobList] = useState(list);
  const [page, setPage] = useState(1);

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
          <Avatar size="2.25rem" type="user" />
          <div className={css.search}>Search Jobs</div>
          <img className={css.logo} src="/src/assets/icons/logo-white.svg" />
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
