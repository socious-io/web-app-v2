import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Card } from 'src/components/atoms/card/card';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { JobCardList } from 'src/components/organisms/job-card-list/job-card-list';
import { ProfileCard } from 'src/components/templates/profile-card';
import { TwoColumns } from 'src/components/templates/refactored/twoColumns/twoColumns';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { IdentityReq } from 'src/core/types';
import { printWhen } from 'src/core/utils';
import { useAuth } from 'src/hooks/use-auth';
import { RootState } from 'src/store';

import css from './desktop.module.scss';
import { useMyJobShared } from '../my-jobs.shared';
import { MyJobs } from '../my-jobs.types';

export const Desktop: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
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
    navigateToJobDetail,
  } = useMyJobShared();
  const [myJobsMode, setMyJobsMode] = useState<MyJobs>(defaultTab);

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate('/network/connections') },
    { label: 'Following', icon: '/icons/followers.svg', link: () => navigate('/network/followings') },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate(`/team/${identity.id}`) },
  ];

  const JobsMenuList = [
    {
      label: 'Applied',
      icon: '/icons/my-applications.svg',
      link: () => {
        setMyJobsMode('Applied');
        navigate({
          pathname: '.',
          search: `?tab=Applied`,
        });
      },
    },
    {
      label: 'Hired',
      icon: '/icons/hired-jobs.svg',
      link: () => {
        setMyJobsMode('Hired');
        navigate({
          pathname: '.',
          search: `?tab=Hired`,
        });
      },
    },
  ];

  const myJobsAppliedJSX = (
    <Card className={css.webCard}>
      <Accordion id="Pending" title={`Pending (${pendingList.total_count})`}>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={pendingList.items}
              onClick={navigateToJobDetail}
              totalCount={pendingList.total_count}
              onSeeMoreClick={updatePendingList}
            />
          </div>,
          !!pendingList.items.length,
        )}
      </Accordion>
      <Accordion id="awaiting-review" title={`Awaiting review (${awaitingList.total_count})`}>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={awaitingList.items}
              onItemClick={(id) => navigate(`/jobs/received-offer/${id}`)}
              totalCount={awaitingList.total_count}
              onSeeMoreClick={updateAwaitingList}
            />
          </div>,
          !!awaitingList.items.length,
        )}
      </Accordion>
      <Accordion id="declined" title={`Declined (${declinedList.total_count})`} no_border>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={declinedList.items}
              onClick={navigateToJobDetail}
              totalCount={declinedList.total_count}
              onSeeMoreClick={updateDeclinedList}
            />
          </div>,
          !!declinedList.items.length,
        )}
      </Accordion>
    </Card>
  );

  const myJobsHiredJSX = (
    <Card className={css.webCard}>
      <Accordion id="on-going" title={`On-Going (${onGoingList.total_count})`}>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={onGoingList.items}
              onItemClick={(id) => navigate(`/jobs/applied/complete-mission/${id}`)}
              totalCount={onGoingList.total_count}
              onSeeMoreClick={updateOnGoingList}
            />
          </div>,
          !!onGoingList.items.length,
        )}
      </Accordion>
      <Accordion id="ended" title={`Ended (${endedList.total_count})`} no_border>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={endedList.items}
              onClick={navigateToJobDetail}
              totalCount={endedList.total_count}
              onSeeMoreClick={updateEndedList}
            />
          </div>,
          !!endedList.items.length,
        )}
      </Accordion>
    </Card>
  );

  return (
    <TwoColumns>
      <div className={css.leftContainer}>
        <ProfileCard />
        <CardMenu title="Network" list={identity?.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
        <CardMenu title="My Jobs" list={JobsMenuList} />
      </div>
      <div className={css.rightContainer}>
        <Card className={css.created}>{myJobsMode}</Card>
        {printWhen(myJobsAppliedJSX, myJobsMode === 'Applied')}
        {printWhen(myJobsHiredJSX, myJobsMode === 'Hired')}
      </div>
    </TwoColumns>
  );
};
