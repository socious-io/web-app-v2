import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { ProfileCard } from 'src/components/templates/profile-card';
import { Card } from 'src/components/atoms/card/card';
import { Applicants } from '../components/applicants/applicants';
import { OfferModal } from '../../offer/offer-modal';
import { Hired } from '../components/hired/hired';
import { Offered } from '../components/offered/offered';
import { Overview } from '../components/overview/overview';
import { Loader } from '../../job-offer-reject.types';
import { ApplicantResp } from 'src/core/types';
import { getApplicantDetail, jobOfferRejectLoader } from '../../job-offer-reject.services';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const resolver = useMatch().ownData as Loader;
  const { id } = useMatch().params || {};
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [applicantDetail, setApplicantDetail] = useState<ApplicantResp>();
  const [updatedApplicantList, setUpdatedApplicantList] = useState<Loader>(resolver);

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
    setSelectedTab('Overview');
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
          onOfferClick={(id) => onOfferClick(id)}
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
  const renderedTab = tabs.find((tab) => tab.name === selectedTab)?.content;

  return (
    <>
      <TwoColumnCursor>
        <div className={css.leftContainer}>
          <ProfileCard />
          <Card className={css.tabs}>
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => setSelectedTab(tab.name)}
                className={selectedTab === tab.name ? css.selected : css.item}
              >
                {tab.name}
              </div>
            ))}
          </Card>
        </div>
        <div className={css.rightContainer}>
          <Card className={css.selectedTab}>{selectedTab}</Card>
          <Card>{renderedTab}</Card>
        </div>
      </TwoColumnCursor>
      <OfferModal
        open={openOfferModal}
        onClose={() => setOpenOfferModal(false)}
        applicantDetail={applicantDetail as ApplicantResp}
        onDone={updateApplicantList}
      />
    </>
  );
};
