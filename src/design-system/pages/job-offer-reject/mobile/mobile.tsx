import css from './mobile.module.scss';
import { useMatch } from '@tanstack/react-location';
import { Header } from '../../../atoms/header/header';
import { Tabs } from '../../../atoms/tabs/tabs';
import { Loader } from '../job-offer-reject.types';
import { Overview } from '../overview/overview';
import { Applicants } from '../applicants/applicants';
import { Hired } from '../hired/hired';

export const Mobile = (): JSX.Element => {
  const resolver = useMatch().ownData as Loader;
  const tabs = [
    {
      name: 'Overview',
      content: (
        <Overview questions={resolver.screeningQuestions.questions} data={resolver.jobOverview} />
      ),
      default: true,
    },
    {
      name: 'Applicants',
      content: (
        <Applicants toReviewList={resolver.reviewList} declinedList={resolver.declinedList} />
      ),
    },
    {
      name: 'Hired',
      content: <Hired hiredList={resolver.hiredList} endHiredList={resolver.endHiredList} />,
    },
  ];

  return (
    <div className={css.container}>
      <Header border="0" paddingTop="var(--safe-area)" title={resolver.jobOverview.title} />
      <div className={css.tabContainer}>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};
