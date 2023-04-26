import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { Button } from 'src/components/atoms/button/button';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { JobCardList } from 'src/components/organisms/job-card-list/job-card-list';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { ProfileCard } from 'src/components/templates/profile-card';
import { printWhen } from 'src/core/utils';
import { NetworkMenuList, JobsMenuList } from '../my-jobs.services';
import { useMyJobShared } from '../my-job.shared';
import { MyJobs } from '../my-jobs.types';
import css from './desktop.module.scss';

export const Desktop: React.FC = () => {
  const navigate = useNavigate();
  const {
    onGoingTitle,
    activeJobList,
    navigateToOverview,
    activeJobs,
    updateActiveJobList,
    draftTitle,
    draftJobList,
    draftJobs,
    updateDraftJobList,
  } = useMyJobShared();
  const [myJobsMode, setMyJobsMode] = useState<MyJobs>('Created');

  const myJobsCreatedJSX = (
    <>
      <Button color="blue" className={css.createJobBtn} onClick={() => navigate({ to: '/jobs/create/social-causes' })}>
        <img src="/icons/plus.svg" height={16} width={16} />
        Create job
      </Button>
      <Card className={css.webCard}>
        <Accordion id="on-going" title={onGoingTitle}>
          {printWhen(
            <div className={css.listContainer}>
              <JobCardList
                list={activeJobList.items}
                onItemClick={navigateToOverview}
                showMore={activeJobList.items.length < activeJobs.total_count}
                onSeeMoreClick={updateActiveJobList}
              />
            </div>,
            !!activeJobList.items.length
          )}
        </Accordion>
        <Accordion id="drafts" title={draftTitle} no_border>
          {printWhen(
            <div className={css.listContainer}>
              <JobCardList
                list={draftJobList.items}
                onItemClick={navigateToOverview}
                showMore={draftJobList.items.length < draftJobs.total_count}
                onSeeMoreClick={updateDraftJobList}
              />
            </div>,
            !!draftJobList.items.length
          )}
        </Accordion>
      </Card>
    </>
  );

  const myJobsArchivedJSX = <></>;

  return (
    <TwoColumnCursor>
      <div className={css.leftContainer}>
       <ProfileCard />
        <CardMenu title="My organization" list={NetworkMenuList} />
        <CardMenu title="My Jobs" list={JobsMenuList} onClick={(label) => setMyJobsMode(label as MyJobs)} />
      </div>
      <div className={css.rightContainer}>
        <Card className={css.created}>{myJobsMode}</Card>
        {printWhen(myJobsCreatedJSX, myJobsMode === 'Created')}
        {printWhen(myJobsArchivedJSX, myJobsMode === 'Archived')}
      </div>
    </TwoColumnCursor>
  );
};
