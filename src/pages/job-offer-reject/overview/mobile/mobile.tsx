import css from './mobile.module.scss';
import { useMatch, useNavigate, useRouter } from '@tanstack/react-location';
import { Header } from '../../../../components/atoms/header/header';
import { Tabs } from '../../../../components/atoms/tabs/tabs';
import { Loader } from '../../job-offer-reject.types';
import { Overview } from '../components/overview/overview';
import { Applicants } from '../components/applicants/applicants';
import { Hired } from '../components/hired/hired';
import { Offered } from '../components/offered/offered';

export const Mobile = (): JSX.Element => {
  const resolver = useMatch().ownData as Loader;
  const navigate = useNavigate();

  const tabs = [
    {
      name: 'Overview',
      content: <Overview questions={resolver.screeningQuestions.questions} data={resolver.jobOverview} />,
      default: true,
    },
    {
      name: 'Applicants',
      content: <Applicants toReviewList={resolver.reviewList} declinedList={resolver.declinedList} />,
    },
    {
      name: 'Offered',
      content: <Offered sent={resolver.sent} approved={resolver.approved} hired={resolver.hired} closed={resolver.closed} />,
    },
    {
      name: 'Hired',
      content: <Hired hiredList={resolver.hiredList} endHiredList={resolver.endHiredList} />,
    },
  ];

  return (
    <div className={css.container}>
      <Header
        onBack={() => navigate({ to: `/jobs/created/${resolver.jobOverview.identity_id}` })}
        border="0"
        paddingTop="var(--safe-area)"
        title={resolver.jobOverview.title}
      />
      <div className={css.tabContainer}>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};
