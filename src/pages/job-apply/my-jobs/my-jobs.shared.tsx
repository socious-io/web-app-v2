import { useMatch } from '@tanstack/react-location';
import { AwaitingResp, DeclinedResp, EndedResp, Loader, MyJobs, OnGoingResp, PendingResp } from './my-jobs.types';
import { useState } from 'react';
import {
  getAwaitingReviewList,
  getDeclinedApplicants,
  getEndedList,
  getOnGoingList,
  getPendingApplicants,
} from './my-jobs.services';
import { Menu } from 'src/components/molecules/card-menu/card-menu.types';

export const useMyJobShared = () => {
  const resolver = useMatch();
  const { pendingApplicants, awaitingApplicants, declinedApplicants, onGoingApplicants, endedApplicants } =
    resolver.data as Loader;
  const [pendingList, setPendingList] = useState<PendingResp>(pendingApplicants);
  const [awaitingList, setAwaitingList] = useState<AwaitingResp>(awaitingApplicants);
  const [declinedList, setDeclinedList] = useState<AwaitingResp>(declinedApplicants);
  const [onGoingList, setOnGoingList] = useState<OnGoingResp>(onGoingApplicants);
  const [endedList, setEndedList] = useState<OnGoingResp>(endedApplicants);
  const [myJobsMode, setMyJobsMode] = useState<MyJobs>('Applied');

  const NetworkMenuList: Menu[] = [
    { label: 'Connections', icon: '/icons/network.svg' },
    { label: 'Followers', icon: '/icons/followers.svg' },
  ];

  const JobsMenuList: Menu[] = [
    { label: 'Applied', icon: '/icons/my-applications.svg', link: () => setMyJobsMode('Applied') },
    { label: 'Hired', icon: '/icons/hired-jobs.svg', link: () => setMyJobsMode('Hired') },
  ];

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
    JobsMenuList,
    NetworkMenuList,
    myJobsMode,
  };
};
