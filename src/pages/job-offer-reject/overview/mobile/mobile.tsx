import { useState } from 'react';
import { useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Header } from 'src/components/atoms/header-v2/header';
import { Tabs } from 'src/components/atoms/tabs/tabs';
import { SureModal } from 'src/components/templates/sure-modal';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { closeJob, rejectApplicant } from 'src/core/api';

import css from './mobile.module.scss';
import { jobOfferRejectLoader } from '../../job-offer-reject.services';
import { Loader } from '../../job-offer-reject.types';
import { Applicants } from '../components/applicants/applicants';
import { Hired } from '../components/hired/hired';
import { Offered } from '../components/offered/offered';
import { Overview } from '../components/overview/overview';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const resolver = useLoaderData() as Loader;
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const tab = searchParams.get('tab');
  const defaultTab = tab || 'Overview';
  const [updatedApplicantList, setUpdatedApplicantList] = useState<Loader>(resolver);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  async function updateApplicantList() {
    const result = await jobOfferRejectLoader({ params: { id } });
    setUpdatedApplicantList(result);
  }

  async function onRejectClick(id: string) {
    await rejectApplicant(id);
    updateApplicantList();
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
      default: defaultTab === 'Overview',
    },
    {
      name: 'Applicants',
      content: (
        <Applicants
          toReviewList={updatedApplicantList.reviewList}
          declinedList={updatedApplicantList.declinedList}
          onOfferClick={(id) => navigate(`./${id}/offer`)}
          onRejectClick={onRejectClick}
        />
      ),
      default: defaultTab === 'Applicants',
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
      default: defaultTab === 'Offered',
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
      default: defaultTab === 'Hired',
    },
  ];

  return (
    <>
      <TopFixedMobile>
        <Header
          removeBorder
          title={updatedApplicantList.jobOverview.title}
          right={
            resolver.jobOverview.status !== 'EXPIRE' ? (
              <img
                onClick={() => setShowArchiveConfirm(true)}
                className={css.archiveButton}
                src="/icons/three-dots-blue.svg"
                alt=""
              />
            ) : (
              <div />
            )
          }
        />
        <Tabs
          tabs={tabs}
          onClick={(name) =>
            navigate({
              pathname: '.',
              search: `?tab=${name}`,
            })
          }
        />
      </TopFixedMobile>
      <SureModal
        open={showArchiveConfirm}
        onClose={() => setShowArchiveConfirm(false)}
        onDone={() => {
          closeJob(id).then(() => {
            setShowArchiveConfirm(false);
            navigate(-1);
          });
        }}
        modalTexts={{
          title: 'Close job',
          body: 'Are you sure you want to close this job?It will be archived.',
          confirmButton: 'Close job',
          cancleButton: 'Cancel',
        }}
      />
    </>
  );
};
