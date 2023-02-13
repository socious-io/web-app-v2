import css from './mobile.module.scss';
import { useMatch } from '@tanstack/react-location';
import { Header } from '../../../atoms/header/header';
import { Tabs } from '../../../atoms/tabs/tabs';
import { Loader } from '../job-offer-reject.types';
import { Overview } from '../overview/overview';

export const Mobile = (): JSX.Element => {
  const { jobOverview, screeningQuestions } = useMatch().ownData as Loader;

  const tabs = [
    {
      name: 'Overview',
      content: <Overview questions={screeningQuestions.questions} data={jobOverview} />,
      default: true,
    },
    {
      name: 'Applicants',
      content: <></>,
    },
  ];

  return (
    <div className={css.container}>
      <Header border="0" paddingTop="var(--safe-area)" title={jobOverview.title} />
      <div className={css.tabContainer}>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};
