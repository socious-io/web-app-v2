import css from './jobs-cursor.module.scss';
import { useState } from 'react';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { Card } from '../../../components/atoms/card/card';
import { CardMenu } from '../../../components/molecules/card-menu/card-menu';
import { JobList } from '../../../components/organisms/job-list/job-list';
import { TwoColumnCursor } from '../../../components/templates/two-column-cursor/two-column-cursor';
import {
  getJobList,
  JobsMenuList,
  NetworkMenuList,
} from './jobs-cursor.services';
import { JobsCursorProps } from './jobs-cursor.types';

export const JobsCursor = (props: JobsCursorProps): JSX.Element => {
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
    <TwoColumnCursor>
      <div className={css.sidebar}>
        <Card>
          <div className={css.profileHeader}>
            <Avatar type="user" />
            <div>
              <div className={css.username}>Sajad Abbasi</div>
              <div className={css.profileLink}>View my profile</div>
            </div>
          </div>
          <div className={css.profileFooter}>
            <div className={css.connections}>Connections</div>
            <div className={css.followers}>Followers</div>
          </div>
        </Card>
        <CardMenu title="Network" list={NetworkMenuList} />
        <CardMenu title="Jobs" list={JobsMenuList} />
      </div>
      <>
        <div className={css.banner}>
          <div className={css.title}>Jobs</div>
          <div className={css.tagline}>Find jobs that make a social impact</div>
        </div>
        <div className={css.list}>
          <JobList onMorePageClick={onMorePage} data={jobList} />
        </div>
      </>
    </TwoColumnCursor>
  );
};
