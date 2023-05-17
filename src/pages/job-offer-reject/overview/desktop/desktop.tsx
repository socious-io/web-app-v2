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
import { getApplicantDetail } from '../../job-offer-reject.services';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const resolver = useMatch().ownData as Loader;
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [applicantDetail, setApplicantDetail] = useState<ApplicantResp>();

  async function onOfferClick(id: string) {
    const result = await getApplicantDetail(id);
    if (Object.keys(result)?.length) {
      setApplicantDetail(result);
      setOpenOfferModal(true);
    }
  }

  const tabs = [
    {
      name: 'Overview',
      content: <Overview questions={resolver.screeningQuestions.questions} data={resolver.jobOverview} />,
      default: true,
    },
    {
      name: 'Applicants',
      content: (
        <Applicants
          toReviewList={resolver.reviewList}
          declinedList={resolver.declinedList}
          onOfferClick={(id) => onOfferClick(id)}
        />
      ),
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
      />
    </>
  );
};
