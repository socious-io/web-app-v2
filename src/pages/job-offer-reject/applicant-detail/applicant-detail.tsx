import css from './applicant-detail.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Accordion } from '../../../components/atoms/accordion/accordion';
import { Button } from '../../../components/atoms/button/button';
import { Header } from '../../../components/atoms/header/header';
import { rejectApplicant } from '../job-offer-reject.services';
import { Resolver } from './applicant-detail.types';
import { printWhen } from '../../../core/utils';

export const ApplicantDetail = (): JSX.Element => {
  const { screeningQuestions, applicantDetail } = useMatch().ownData as Resolver;
  const navigate = useNavigate();

  function navigateToOverview() {
    navigate({ to: `/jobs/created/${applicantDetail.project_id}/overview` });
  }

  function onOffer() {
    navigate({ to: `./offer` });
  }

  function onReject(id: string) {
    return () => rejectApplicant(id).then(navigateToOverview);
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
        <a href={applicantDetail.attachment.url} target="_blank">
          {applicantDetail.attachment.filename}
        </a>
      </div>
    </Accordion>
  );

  return (
    <div className={css.container}>
      <Header onBack={navigateToOverview} paddingTop={'var(--safe-area)'} title={applicantDetail.user.name} />
      <div className={css.main}>
        <Accordion id="cover-letter" title="Cover letter">
          <div className={css.accordionContainer}>{applicantDetail.cover_letter}</div>
        </Accordion>
        {printWhen(uploadedResumeAccordion, !!applicantDetail?.attachment?.url)}
        {printWhen(screeningQuestionAccordion, screeningQuestions.questions.length > 0)}
        {/* <Accordion id="screening-questions" title="Screening questions">
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
        </Accordion> */}
      </div>
      <div className={css.btnContainer}>
        <Button onClick={onOffer}>Offer</Button>
        <Button onClick={onReject(applicantDetail.id)} color="white">
          Reject
        </Button>
      </div>
    </div>
  );
};
