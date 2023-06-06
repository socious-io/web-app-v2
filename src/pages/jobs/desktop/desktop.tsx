import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import css from './desktop.module.scss';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { NetworkMenuList } from '../jobs.services';
import { useJobsShared } from '../jobs.shared';
import { printWhen } from 'src/core/utils';

export const Desktop = (): JSX.Element => {
  const { onMorePage, jobList, avatarImg, name, navigateToProfile, jobsMenuListUser, jobsMenuListOrg, identity } =
    useJobsShared();

  return (
    <TwoColumnCursor>
      <div className={css.sidebar}>
        <Card>
          <div className={css.profileHeader}>
            <Avatar img={avatarImg} type="users" />
            <div>
              <div className={css.username}>{name}</div>
              <div onClick={navigateToProfile} className={css.profileLink}>
                View my profile
              </div>
            </div>
          </div>
          <div className={css.profileFooter}>
            <div className={css.connections}>Connections</div>
            <div className={css.followers}>Followers</div>
          </div>
        </Card>
        <CardMenu title="Network" list={NetworkMenuList} />
        {printWhen(<CardMenu title="Jobs" list={jobsMenuListUser} />, identity.type === 'users')}
        {printWhen(<CardMenu title="Jobs" list={jobsMenuListOrg} />, identity.type === 'organizations')}
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
