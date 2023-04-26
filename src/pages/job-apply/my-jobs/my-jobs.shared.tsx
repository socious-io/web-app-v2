import { useMatch } from '@tanstack/react-location';
import { AwaitingResp, DeclinedResp, EndedResp, Loader, OnGoingResp, PendingResp } from './my-jobs.types';
import { useState } from 'react';
import {
  getAwaitingReviewList,
  getDeclinedApplicants,
  getEndedList,
  getOnGoingList,
  getPendingApplicants,
} from './my-jobs.services';

export const useMyJobShared = () => {
  const resolver = useMatch();
  const { pendingApplicants, awaitingApplicants, declinedApplicants, onGoingApplicants, endedApplicants } =
    resolver.data as Loader;
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
  };
};
