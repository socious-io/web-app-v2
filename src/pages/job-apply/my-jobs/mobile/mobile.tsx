import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Header } from 'src/components/atoms/header/header';
import { Tabs } from 'src/components/atoms/tabs/tabs';
import { useNavigate } from '@tanstack/react-location';
import { JobCardList } from 'src/components/organisms/job-card-list/job-card-list';
import { useMyJobShared } from '../my-jobs.shared';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const {
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
  } = useMyJobShared();

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
                onItemClick={(id) => navigate({ to: `/jobs/received-offer/${id}/m` })}
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
      default: defaultTab === 'Applied',
    },
    {
      name: 'Hired',
      content: (
        <>
          <Accordion id="on-going" title={`On-Going (${onGoingList.total_count})`}>
            <div className={css.listContainer}>
              <JobCardList
                list={onGoingList.items}
                onItemClick={(id) => navigate({ to: `/jobs/applied/complete-mission/${id}` })}
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
      default: defaultTab === 'Hired',
    },
  ];

  return (
    <div className={css.container}>
      <Header onBack={() => navigate({ to: '/jobs' })} border="0" paddingTop={'var(--safe-area)'} title="My Jobs" />
      <div className={css.tabContainer}>
        <Tabs tabs={tabs} onClick={(name) => navigate({ to: '.', search: { tab: name } })} />
      </div>
    </div>
  );
};
