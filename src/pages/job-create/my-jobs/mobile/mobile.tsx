import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Header } from 'src/components/atoms/header/header';
import { Tabs } from 'src/components/atoms/tabs/tabs';
import { JobCardList } from 'src/components/organisms/job-card-list/job-card-list';
import { Fab } from 'src/components/atoms/fab/fab';
import { useMyJobShared } from '../my-job.shared';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = {};
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
    archivedTitle,
    archivedJobs,
    archivedJobList,
    updateArchivedJobList,
  } = useMyJobShared();

  const tabs = [
    {
      name: 'Created',
      content: (
        <>
          <Accordion id="on-going" title={onGoingTitle}>
            <div className={css.listContainer}>
              <JobCardList
                list={activeJobList.items}
                onItemClick={navigateToOverview}
                showMore={activeJobList.items.length < activeJobs.total_count}
                onSeeMoreClick={updateActiveJobList}
              />
            </div>
          </Accordion>
          <Accordion id="drafts" title={draftTitle}>
            <div className={css.listContainer}>
              <JobCardList
                list={draftJobList.items}
                onItemClick={navigateToOverview}
                showMore={draftJobList.items.length < draftJobs.total_count}
                onSeeMoreClick={updateDraftJobList}
              />
            </div>
          </Accordion>
        </>
      ),
      default: true,
    },
    {
      name: 'Archived',
      content: (
        <Accordion id="archived" title={archivedTitle}>
          <div className={css.listContainer}>
            <JobCardList
              list={archivedJobList.items}
              onItemClick={navigateToOverview}
              showMore={archivedJobList.items.length < archivedJobs.total_count}
              onSeeMoreClick={updateArchivedJobList}
            />
          </div>
        </Accordion>
      ),
    },
  ];

  return (
    <div className={css.container}>
      <Header onBack={() => navigate({ to: '/jobs' })} border="0" paddingTop={'var(--safe-area)'} title="My Jobs" />
      <div className={css.tabContainer}>
        <Tabs tabs={tabs} />
      </div>
      <Fab onClick={() => navigate({ to: '/jobs/create/social-causes' })} />
    </div>
  );
};
