import css from './mobile.module.scss';
import { Accordion } from '../../../../components/atoms/accordion/accordion';
import { Header } from '../../../../components/atoms/header/header';
import { Tabs } from '../../../../components/atoms/tabs/tabs';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { AwaitingResp, DeclinedResp, EndedResp, Loader, OnGoingResp, PendingResp } from '../my-jobs.types';
import { JobCardList } from '../../../../components/organisms/job-card-list/job-card-list';
import {
  getAwaitingReviewList,
  getDeclinedApplicants,
  getEndedList,
  getOnGoingList,
  getPendingApplicants,
} from '../my-jobs.services';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const resolver = useMatch();
  const { pendingApplicants, awaitingApplicants, declinedApplicants, onGoingApplicants, endedApplicants } =
    resolver.data as Loader;
  const [pendingList, setPendingList] = useState<PendingResp>(pendingApplicants);
  const [awaitingList, setAwaitingList] = useState<AwaitingResp>(awaitingApplicants);
  const [declinedList, setDeclinedList] = useState<AwaitingResp>(declinedApplicants);
  const [onGoingList, setOnGoingList] = useState<OnGoingResp>(onGoingApplicants);
  const [endedList, setEndedList] = useState<OnGoingResp>(endedApplicants);

  async function updatePendingList(page: number) {
    const update = (resp: PendingResp) => setPendingList((prev) => ({ ...prev, items: [...prev.items, ...resp.items] }));
    getPendingApplicants({ page }).then(update);
  }

  async function updateAwaitingList(page: number) {
    const update = (resp: AwaitingResp) => setAwaitingList((prev) => ({ ...prev, items: [...prev.items, ...resp.items] }));
    getAwaitingReviewList({ page }).then(update);
  }

  async function updateDeclinedList(page: number) {
    const update = (resp: DeclinedResp) => setDeclinedList((prev) => ({ ...prev, items: [...prev.items, ...resp.items] }));
    getDeclinedApplicants({ page }).then(update);
  }

  async function updateOnGoingList(page: number) {
    const update = (resp: OnGoingResp) => setOnGoingList((prev) => ({ ...prev, items: [...prev.items, ...resp.items] }));
    getOnGoingList({ page }).then(update);
  }

  async function updateEndedList(page: number) {
    const update = (resp: EndedResp) => setEndedList((prev) => ({ ...prev, items: [...prev.items, ...resp.items] }));
    getEndedList({ page }).then(update);
  }

  const tabs = [
    {
      name: 'Applied',
      content: (
        <>
          <Accordion id="Pending" title={`Pending (${pendingList.total_count})`}>
            <div className={css.listContainer}>
              <JobCardList
                list={pendingList.items}
                onItemClick={console.log}
                totalCount={pendingList.total_count}
                onSeeMoreClick={updatePendingList}
              />
            </div>
          </Accordion>
          <Accordion id="awaiting-review" title={`Awaiting review (${awaitingList.total_count})`}>
            <div className={css.listContainer}>
              <JobCardList
                list={awaitingList.items}
                onItemClick={(id) => navigate({ to: `/jobs/received-offer/${id}` })}
                totalCount={awaitingList.total_count}
                onSeeMoreClick={updateAwaitingList}
              />
            </div>
          </Accordion>
          <Accordion id="declined" title={`Declined (${declinedList.total_count})`}>
            <div className={css.listContainer}>
              <JobCardList
                list={declinedList.items}
                onItemClick={console.log}
                totalCount={declinedList.total_count}
                onSeeMoreClick={updateDeclinedList}
              />
            </div>
          </Accordion>
        </>
      ),
      default: true,
    },
    {
      name: 'Hired',
      content: (
        <>
          <Accordion id="on-going" title={`On-Going (${onGoingList.total_count})`}>
            <div className={css.listContainer}>
              <JobCardList
                list={onGoingList.items}
                onItemClick={(id) => navigate({ to: `../complete-mission/${id}` })}
                totalCount={onGoingList.total_count}
                onSeeMoreClick={updateOnGoingList}
              />
            </div>
          </Accordion>
          <Accordion id="ended" title={`Ended (${endedList.total_count})`}>
            <div className={css.listContainer}>
              <JobCardList
                list={endedList.items}
                onItemClick={console.log}
                totalCount={endedList.total_count}
                onSeeMoreClick={updateEndedList}
              />
            </div>
          </Accordion>
        </>
      ),
    },
  ];

  return (
    <div className={css.container}>
      <Header onBack={() => navigate({ to: '/jobs' })} border="0" paddingTop={'var(--safe-area)'} title="My Jobs" />
      <div className={css.tabContainer}>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};
