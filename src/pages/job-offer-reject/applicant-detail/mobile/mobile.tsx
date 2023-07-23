import { Header } from 'src/components/atoms/header/header';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Button } from 'src/components/atoms/button/button';
import { printWhen } from 'src/core/utils';
import { useApplicantDetailShared } from '../applicant-detail.shared';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const { navigate, screeningQuestions, applicantDetail, onReject } = useApplicantDetailShared();

  function onOffer() {
    navigate({ to: `./offer` });
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
    <div className={css.container}>
      <Header paddingTop="var(--safe-area)" title={applicantDetail.user.name} onBack={() => history.back()} />
      <div className={css.main}>
        <Accordion id="cover-letter" title="Cover letter">
          <div className={css.accordionContainer}>{applicantDetail.cover_letter}</div>
        </Accordion>
        {printWhen(uploadedResumeAccordion, !!applicantDetail?.attachment?.url)}
        {printWhen(screeningQuestionAccordion, screeningQuestions.questions.length > 0)}
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
