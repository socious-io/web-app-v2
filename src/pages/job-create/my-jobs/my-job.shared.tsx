import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { getActiveJobs, getDraftJobs, jobListToJobCardListAdaptor } from './my-jobs.services';
import { MyJobsResolver } from './my-jobs.types';

export const useMyJobShared = () => {
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

  return {
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
  };
};
