import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { Button } from 'src/components/atoms/button/button';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { JobCardList } from 'src/components/organisms/job-card-list/job-card-list';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { ProfileCard } from 'src/components/templates/profile-card';
import { SocialCausesModal } from 'src/pages/job-create/social-causes/social-causes-modal';
import { printWhen } from 'src/core/utils';
import { getActiveJobs, jobListToJobCardListAdaptor } from '../my-jobs.services';
import { useMyJobShared } from '../my-job.shared';
import { MyJobs } from '../my-jobs.types';
import css from './desktop.module.scss';

export const Desktop: React.FC = () => {
  const resolver = useMatch();
  const navigate = useNavigate();
  const {
    onGoingTitle,
    activeJobList,
    setActiveJobList,
    navigateToOverview,
    activeJobs,
    updateActiveJobList,
    draftTitle,
    draftJobList,
    draftJobs,
    updateDraftJobList,
    archivedTitle,
    archivedJobs,
    archivedJobList,
    updateArchivedJobList,
  } = useMyJobShared();
  const [myJobsMode, setMyJobsMode] = useState<MyJobs>('Created');
  const [openSocialCausesModal, setOpenSocialCausesModal] = useState(false);
  const [onGoingTitleUpdate, setOnGoingTitleUpdate] = useState(onGoingTitle);

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/network.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Followings', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const JobsMenuList = [
    { label: 'Created', icon: '/icons/folder-black.svg', link: () => setMyJobsMode('Created') },
    { label: 'Archived', icon: '/icons/archived.svg', link: () => setMyJobsMode('Archived') },
  ];

  async function onCreateJob() {
    const identityId = resolver.params.id;
    const payload = { identityId, page: 1 };
    getActiveJobs(payload).then((data) => {
      setActiveJobList({ ...data, items: jobListToJobCardListAdaptor(data.items) });
      setOnGoingTitleUpdate(`On-Going (${data.total_count})`);
    });
  }

  const myJobsCreatedJSX = (
    <>
      <Button color="blue" className={css.createJobBtn} onClick={() => setOpenSocialCausesModal(true)}>
        <img src="/icons/plus.svg" height={16} width={16} />
        Create job
      </Button>
      <Card className={css.webCard}>
        <Accordion id="on-going" title={onGoingTitleUpdate}>
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

  const myJobsArchivedJSX = (
    <Card className={css.webCard}>
      <Accordion id="archived" title={archivedTitle}>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={archivedJobList.items}
              onItemClick={navigateToOverview}
              showMore={archivedJobList.items.length < archivedJobs.total_count}
              onSeeMoreClick={updateArchivedJobList}
            />
          </div>,
          !!archivedJobList.items.length
        )}
      </Accordion>
    </Card>
  );

  return (
    <>
      <TwoColumnCursor>
        <div className={css.leftContainer}>
          <ProfileCard />
          <CardMenu title="Network" list={NetworkMenuList} />
          <CardMenu title="My Jobs" list={JobsMenuList} />
        </div>
        <div className={css.rightContainer}>
          <Card className={css.created}>{myJobsMode}</Card>
          {printWhen(myJobsCreatedJSX, myJobsMode === 'Created')}
          {printWhen(myJobsArchivedJSX, myJobsMode === 'Archived')}
        </div>
      </TwoColumnCursor>
      <SocialCausesModal
        open={openSocialCausesModal}
        onClose={() => setOpenSocialCausesModal(false)}
        onDone={onCreateJob}
        onOpen={() => setOpenSocialCausesModal(true)}
      />
    </>
  );
};
