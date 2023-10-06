import { useState } from 'react';
import { useLoaderData, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { JobCardProps } from 'src/components/molecules/job-card/job-card.types';

import {
  getAwaitingReviewList,
  getDeclinedApplicants,
  getEndedList,
  getOnGoingList,
  getPendingApplicants,
} from './my-jobs.services';
import { AwaitingResp, DeclinedResp, EndedResp, Loader, MyJobs, OnGoingResp, PendingResp } from './my-jobs.types';

export const useMyJobShared = () => {
  const resolver = useLoaderData();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const navigate = useNavigate();
  const defaultTab = tab || 'Applied';
  const { pendingApplicants, awaitingApplicants, declinedApplicants, onGoingApplicants, endedApplicants } =
    resolver as Loader;
  const [pendingList, setPendingList] = useState<PendingResp>(pendingApplicants);
  const [awaitingList, setAwaitingList] = useState<AwaitingResp>(awaitingApplicants);
  const [declinedList, setDeclinedList] = useState<AwaitingResp>(declinedApplicants);
  const [onGoingList, setOnGoingList] = useState<OnGoingResp>(onGoingApplicants);
  const [endedList, setEndedList] = useState<OnGoingResp>(endedApplicants);

  async function updatePendingList(page: number) {
    const update = (resp: PendingResp) =>
      setPendingList((prev) => ({ ...prev, items: [...prev.items, ...resp.items] }));
    getPendingApplicants({ page }).then(update);
  }

  async function updateAwaitingList(page: number) {
    const update = (resp: AwaitingResp) =>
      setAwaitingList((prev) => ({ ...prev, items: [...prev.items, ...resp.items] }));
    getAwaitingReviewList({ page }).then(update);
  }

  async function updateDeclinedList(page: number) {
    const update = (resp: DeclinedResp) =>
      setDeclinedList((prev) => ({ ...prev, items: [...prev.items, ...resp.items] }));
    getDeclinedApplicants({ page }).then(update);
  }

  async function updateOnGoingList(page: number) {
    const update = (resp: OnGoingResp) =>
      setOnGoingList((prev) => ({ ...prev, items: [...prev.items, ...resp.items] }));
    getOnGoingList({ page }).then(update);
  }

  async function updateEndedList(page: number) {
    const update = (resp: EndedResp) => setEndedList((prev) => ({ ...prev, items: [...prev.items, ...resp.items] }));
    getEndedList({ page }).then(update);
  }

  function navigateToJobDetail(job: JobCardProps) {
    navigate(`/jobs/${job.id}`);
  }

  return {
    pendingList,
    updatePendingList,
    awaitingList,
    updateAwaitingList,
    declinedList,
    updateDeclinedList,
    onGoingList,
    updateOnGoingList,
    endedList,
    updateEndedList,
    defaultTab,
    navigateToJobDetail,
  };
};
