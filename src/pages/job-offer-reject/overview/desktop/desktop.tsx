import { useState } from 'react';
import { useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Card } from 'src/components/atoms/card/card';
import { BackLink } from 'src/components/molecules/back-link';
import { ProfileCard } from 'src/components/templates/profile-card';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { applicant, rejectApplicant } from 'src/core/api';
import { convertTimeToMonth, toRelativeTime } from 'src/core/relative-time';
import { ApplicantResp } from 'src/core/types';
import { printWhen } from 'src/core/utils';
import { useAuth } from 'src/hooks/use-auth';

import css from './desktop.module.scss';
import { jobOfferRejectLoader } from '../../job-offer-reject.services';
import { Loader } from '../../job-offer-reject.types';
import { OfferModal } from '../../offer/offer-modal';
import { Applicants } from '../components/applicants/applicants';
import { Hired } from '../components/hired/hired';
import { Offered } from '../components/offered/offered';
import { Overview } from '../components/overview/overview';

export const Desktop = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resolver = useLoaderData() as Loader;
  const { id } = useParams() || {};
  const tab = searchParams.get('tab');
  const defaultTab = tab || 'Overview';
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [applicantDetail, setApplicantDetail] = useState<ApplicantResp>();
  const [updatedApplicantList, setUpdatedApplicantList] = useState<Loader>(resolver);
  const { isLoggedIn } = useAuth();

  async function onOfferClick(id: string) {
    const result = await applicant(id);
    if (Object.keys(result)?.length) {
      setApplicantDetail(result);
      setOpenOfferModal(true);
    }
  }

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
      label: 'Overview',
      content: (
        <Overview
          questions={updatedApplicantList.screeningQuestions.questions}
          data={updatedApplicantList.jobOverview}
          updateApplicantList={updateApplicantList}
        />
      ),
      default: true,
    },
    {
      name: 'Applicants',
      label: `Applicants (${resolver.jobOverview.applicants})`,
      content: (
        <Applicants
          toReviewList={updatedApplicantList.reviewList}
          declinedList={updatedApplicantList.declinedList}
          onOfferClick={onOfferClick}
          onRejectClick={onRejectClick}
        />
      ),
    },
    {
      name: 'Offered',
      label: 'Offered',
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
      label: `Hired (${resolver.jobOverview.missions})`,
      content: (
        <Hired
          hiredList={updatedApplicantList.hiredList}
          endHiredList={updatedApplicantList.endHiredList}
          onDone={() => {
            updateApplicantList();
            setSelectedTab('Overview');
          }}
        />
      ),
    },
  ];
  const renderedTab = tabs.find((tab) => tab.name === selectedTab)?.content;
  const selectedTabName = tabs.find((tab) => tab.name === selectedTab)?.label;

  return (
    <>
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <div className={css.leftContainer}>
          <BackLink title="Jobs" onBack={() => navigate('/jobs')} />
          <ProfileCard />
          <Card className={css.tabs}>
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => {
                  setSelectedTab(tab.name);
                  navigate({
                    pathname: '.',
                    search: `?tab=${tab.name}`,
                  });
                }}
                className={selectedTab === tab.name ? css.selected : css.item}
              >
                {tab.label}
              </div>
            ))}
          </Card>
        </div>
        <div className={css.rightContainer}>
          {updatedApplicantList.jobOverview.status === 'EXPIRE' ? (
            <Card className={css.archivedBox}>
              <img className={css.archivedBoxImage} src="/icons/archived.svg" /> job was archived on
              {` ${convertTimeToMonth(updatedApplicantList.jobOverview.expires_at)}`}
            </Card>
          ) : (
            <Card className={css.selectedTab}>{selectedTabName}</Card>
          )}
          <Card>{renderedTab}</Card>
        </div>
      </TwoColumnCursor>
      {printWhen(
        <OfferModal
          open={openOfferModal}
          onClose={() => setOpenOfferModal(false)}
          applicantDetail={applicantDetail as ApplicantResp}
          onDone={updateApplicantList}
        />,
        applicantDetail !== undefined,
      )}
    </>
  );
};
