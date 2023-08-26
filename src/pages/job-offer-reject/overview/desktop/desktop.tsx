import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { ProfileCard } from 'src/components/templates/profile-card';
import { Card } from 'src/components/atoms/card/card';
import { Applicants } from '../components/applicants/applicants';
import { OfferModal } from '../../offer/offer-modal';
import { Hired } from '../components/hired/hired';
import { Offered } from '../components/offered/offered';
import { Overview } from '../components/overview/overview';
import { printWhen } from 'src/core/utils';
import { Loader } from '../../job-offer-reject.types';
import { ApplicantResp } from 'src/core/types';
import { getApplicantDetail, jobOfferRejectLoader, rejectApplicant } from '../../job-offer-reject.services';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';
import { toRelativeTime } from 'src/core/relative-time';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const resolver = useMatch().ownData as Loader;
  const { id } = useMatch().params || {};
  const tab = useMatch()?.search?.tab as string;
  const defaultTab = tab || 'Overview';
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [applicantDetail, setApplicantDetail] = useState<ApplicantResp>();
  const [updatedApplicantList, setUpdatedApplicantList] = useState<Loader>(resolver);
  const { isLoggedIn } = useAuth();
  async function onOfferClick(id: string) {
    const result = await getApplicantDetail(id);
    if (Object.keys(result)?.length) {
      setApplicantDetail(result);
      setOpenOfferModal(true);
    }
  }

  async function updateApplicantList() {
    const result = await jobOfferRejectLoader({ params: { id } });
    setUpdatedApplicantList(result);
    console.log('result', result);
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
          <ProfileCard />
          <Card className={css.tabs}>
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => {
                  setSelectedTab(tab.name);
                  navigate({ to: '.', search: { tab: tab.name }, replace: true });
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
              {` ${toRelativeTime(updatedApplicantList.jobOverview.expires_at)}`}
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
        applicantDetail !== undefined
      )}
    </>
  );
};
