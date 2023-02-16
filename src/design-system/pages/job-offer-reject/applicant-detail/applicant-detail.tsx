import css from './applicant-detail.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Accordion } from '../../../atoms/accordion/accordion';
import { Button } from '../../../atoms/button/button';
import { Header } from '../../../atoms/header/header';
import { rejectApplicant } from '../job-offer-reject.services';
import { Resolver } from './applicant-detail.types';

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

  return (
    <div className={css.container}>
      <Header
        onBack={navigateToOverview}
        paddingTop={'var(--safe-area)'}
        title={applicantDetail.user.name}
      />
      <div className={css.main}>
        <Accordion id="cover-letter" title="Cover letter">
          <div className={css.accordionContainer}>{applicantDetail.cover_letter}</div>
        </Accordion>
        <Accordion id="screening-questions" title="Screening questions">
          <div className={css.accordionContainer}>
            {screeningQuestions.questions.map((item, i) => {
              return (
                <div key={item.id}>
                  <div className={css.question}>{item.question}</div>
                  <div className={css.answer}>{applicantDetail.answers[i] || 'Not answered'} </div>
                </div>
              );
            })}
          </div>
        </Accordion>
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
