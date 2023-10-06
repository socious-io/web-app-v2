import { useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';

import { getActiveJobs, getArchivedJobs, getDraftJobs, jobListToJobCardListAdaptor } from './my-jobs.services';
import { MyJobsResolver } from './my-jobs.types';

export const useMyJobShared = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeJobs, draftJobs, archivedJobs } = useLoaderData() as MyJobsResolver;
  const onGoingTitle = `On-Going (${activeJobs.total_count})`;
  const draftTitle = `Drafts (${draftJobs.total_count})`;
  const archivedTitle = `Archived (${archivedJobs.total_count})`;
  const adoptedJobList = jobListToJobCardListAdaptor(activeJobs.items);
  const adoptedDraftList = jobListToJobCardListAdaptor(draftJobs.items);
  const adoptedArchivedList = jobListToJobCardListAdaptor(archivedJobs.items);
  const [activeJobList, setActiveJobList] = useState({ ...activeJobs, items: adoptedJobList });
  const [draftJobList, setDraftJobList] = useState({ ...draftJobs, items: adoptedDraftList });
  const [archivedJobList, setArchivedJobList] = useState({ ...archivedJobs, items: adoptedArchivedList });

  async function updateActiveJobList() {
    const identityId = id;
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
    const identityId = id;
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

  async function updateArchivedJobList() {
    const identityId = resolver.params.id;
    const payload = { identityId, page: archivedJobList.page + 1 };
    getArchivedJobs(payload)
      .then(({ items }) => ({
        items: [...archivedJobList.items, ...jobListToJobCardListAdaptor(items)],
        page: payload.page,
        limit: archivedJobs.limit,
        total_count: archivedJobs.total_count,
      }))
      .then(setArchivedJobList);
  }

  function navigateToOverview(id?: string) {
    console.log('fakeshma');
    navigate(`/jobs/created/${id}/overview`);
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
    archivedTitle,
    archivedJobs,
    archivedJobList,
    updateArchivedJobList,
  };
};
