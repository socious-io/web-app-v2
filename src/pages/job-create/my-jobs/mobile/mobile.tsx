import css from './mobile.module.scss';
import { Accordion } from '../../../../components/atoms/accordion/accordion';
import { Header } from '../../../../components/atoms/header/header';
import { Tabs } from '../../../../components/atoms/tabs/tabs';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { getActiveJobs, getDraftJobs, jobListToJobCardListAdaptor } from '../my-jobs.services';
import { MyJobsResolver } from '../my-jobs.types';
import { JobCardList } from '../../../../components/organisms/job-card-list/job-card-list';
import { Fab } from '../../../../components/atoms/fab/fab';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const resolver = useMatch();
  const { activeJobs, draftJobs } = resolver.ownData as MyJobsResolver;
  const onGoingTitle = `On-Going (${activeJobs.total_count})`;
  const draftTitle = `Drafts (${draftJobs.total_count})`;
  const adoptedJobList = jobListToJobCardListAdaptor(activeJobs.items);
  const adoptedDraftList = jobListToJobCardListAdaptor(draftJobs.items);
  const [activeJobList, setActiveJobList] = useState({ ...activeJobs, items: adoptedJobList });
  const [draftJobList, setDraftJobList] = useState({ ...draftJobs, items: adoptedDraftList });

  async function updateActiveJobList() {
    const identityId = resolver.params.id;
    const payload = { identityId, page: activeJobList.page + 1 };
    getActiveJobs(payload)
      .then(({ items }) => ({
        items: [...activeJobList.items, ...jobListToJobCardListAdaptor(items)],
        page: payload.page,
        limit: activeJobs.limit,
        total_count: activeJobs.total_count,
      }))
      .then(setActiveJobList);
  }

  async function updateDraftJobList() {
    const identityId = resolver.params.id;
    const payload = { identityId, page: draftJobList.page + 1 };
    getDraftJobs(payload)
      .then(({ items }) => ({
        items: [...draftJobList.items, ...jobListToJobCardListAdaptor(items)],
        page: payload.page,
        limit: draftJobs.limit,
        total_count: draftJobs.total_count,
      }))
      .then(setDraftJobList);
  }

  function navigateToOverview(id?: string) {
    navigate({ to: `../${id}/overview` });
  }

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
      name: 'archived',
      content: <></>,
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
