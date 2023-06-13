import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Header } from 'src/components/atoms/header-v2/header';
import { Tabs } from 'src/components/atoms/tabs/tabs';
import { Applicants } from '../components/applicants/applicants';
import { Hired } from '../components/hired/hired';
import { Offered } from '../components/offered/offered';
import { Overview } from '../components/overview/overview';
import { Loader } from '../../job-offer-reject.types';
import { jobOfferRejectLoader } from '../../job-offer-reject.services';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const resolver = useMatch().ownData as Loader;
  const { id } = useMatch().params || {};
  const navigate = useNavigate();
  const [updatedApplicantList, setUpdatedApplicantList] = useState<Loader>(resolver);

  async function updateApplicantList() {
    const result = await jobOfferRejectLoader({ params: { id } });
    setUpdatedApplicantList(result);
  }

  const tabs = [
    {
      name: 'Overview',
      content: (
        <Overview
          questions={updatedApplicantList.screeningQuestions.questions}
          data={updatedApplicantList.jobOverview}
        />
      ),
      default: true,
    },
    {
      name: 'Applicants',
      content: (
        <Applicants
          toReviewList={updatedApplicantList.reviewList}
          declinedList={updatedApplicantList.declinedList}
          onOfferClick={(id) => navigate({ to: `./${id}/offer` })}
        />
      ),
    },
    {
      name: 'Offered',
      content: (
        <Offered
          sent={updatedApplicantList.sent}
          approved={updatedApplicantList.approved}
          hired={updatedApplicantList.hired}
          closed={updatedApplicantList.closed}
        />
      ),
    },
    {
      name: 'Hired',
      content: (
        <Hired
          hiredList={updatedApplicantList.hiredList}
          endHiredList={updatedApplicantList.endHiredList}
          onDone={updateApplicantList}
        />
      ),
    },
  ];

  return (
    <TopFixedMobile>
      <Header removeBorder title={updatedApplicantList.jobOverview.title} />
      <div className={css.tabContainer}>
        <Tabs tabs={tabs} />
      </div>
    </TopFixedMobile>
  );
};
