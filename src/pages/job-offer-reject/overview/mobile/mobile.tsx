import css from './mobile.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Tabs } from '../../../../components/atoms/tabs/tabs';
import { Loader } from '../../job-offer-reject.types';
import { Overview } from '../components/overview/overview';
import { Applicants } from '../components/applicants/applicants';
import { Hired } from '../components/hired/hired';
import { Offered } from '../components/offered/offered';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Header } from 'src/components/atoms/header-v2/header';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const resolver = useMatch().ownData as Loader;

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
      content: (
        <Offered sent={resolver.sent} approved={resolver.approved} hired={resolver.hired} closed={resolver.closed} />
      ),
    },
    {
      name: 'Hired',
      content: <Hired hiredList={resolver.hiredList} endHiredList={resolver.endHiredList} />,
    },
  ];

  return (
    <TopFixedMobile>
      <Header
        removeBorder
        onBack={() => navigate({ to: `/jobs/created/${resolver.jobOverview.identity_id}` })}
        title={resolver.jobOverview.title}
      />
      <div className={css.tabContainer}>
        <Tabs tabs={tabs} />
      </div>
    </TopFixedMobile>
  );
};
