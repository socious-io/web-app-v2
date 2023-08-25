import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { useAuth } from 'src/hooks/use-auth';
import { BackLink } from '@molecules/back-link';
import { TwoColumnCursor } from '@templates/two-column-cursor/two-column-cursor';
import { Accordion } from '@atoms/accordion/accordion';
import Card from '@atoms/card';
import { Button } from '@atoms/button/button';
import { OfferModal } from '../../offer/offer-modal';
import { printWhen } from 'src/core/utils';
import { ApplicantResp } from 'src/core/types';
import { jobOfferRejectLoader } from '../../job-offer-reject.services';
import { useApplicantDetailShared } from '../applicant-detail.shared';
import css from './desktop.module.scss';

export const Desktop: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { id } = useMatch().params || {};
  const { navigate, screeningQuestions, applicantDetail, onReject } = useApplicantDetailShared();
  const [openOfferModal, setOpenOfferModal] = useState(false);

  async function updateApplicantList() {
    await jobOfferRejectLoader({ params: { id } });
    setOpenOfferModal(false);
    navigate({ to: '..' });
  }

  const screeningQuestionAccordion = (
    <Accordion id="screening-questions" title="Screening questions">
      <div className={css.accordionContainer}>
        {screeningQuestions.questions.map((item, i) => {
          return (
            <div key={item.id}>
              <div className={css.question}>{item.question}</div>
              <div className={css.answer}>{applicantDetail.answers[i]?.answer || 'Not answered'} </div>
            </div>
          );
        })}
      </div>
    </Accordion>
  );

  const uploadedResumeAccordion = (
    <Accordion id="resume" title="Resume">
      <div className={css.uploadedResume}>
        <img src="/icons/attachment-black.svg" />
        <a href={applicantDetail?.attachment?.url} target="_blank">
          {applicantDetail?.attachment?.filename}
        </a>
      </div>
    </Accordion>
  );

  return (
    <>
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <div className={css.leftContainer}>
          <BackLink title="Overview" onBack={() => history.back()} />
        </div>
        <Card className={css.rightContainer}>
          <Accordion id="cover-letter" title="Cover letter">
            <div className={css.accordionContainer}>{applicantDetail.cover_letter}</div>
          </Accordion>
          {printWhen(uploadedResumeAccordion, !!applicantDetail?.attachment?.url)}
          {printWhen(screeningQuestionAccordion, screeningQuestions.questions.length > 0)}
          <div className={css.btnContainer}>
            <Button onClick={() => setOpenOfferModal(true)}>Offer</Button>
            <Button onClick={onReject(applicantDetail.id)} color="white">
              Reject
            </Button>
          </div>
        </Card>
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
