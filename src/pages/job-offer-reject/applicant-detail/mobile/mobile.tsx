import css from './mobile.module.scss';
import { Header } from 'src/components/atoms/header/header';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Button } from 'src/components/atoms/button/button';
import { printWhen } from 'src/core/utils';
import { useApplicantDetailShared } from '../applicant-detail.shared';
import { ApplicantInfo } from '../components/applicant-info';
import {useState} from "react";
import {Card} from "../../../../components/atoms/card/card";

export const Mobile = (): JSX.Element => {
  const { navigate, screeningQuestions, applicantDetail, onReject,unit } = useApplicantDetailShared();
    const [showApprove,setShowApprove] = useState(false)

  function onOffer() {
    navigate({ to: `./offer` });
  }
  function onApprove() {
        setShowApprove(true);
  }
  function onEndJob() {
    console.log('end job')
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
  const currentSubmission = {
      time:"Jan 8 - Jan 15",
      hours:10
  }
  const previousSubmission = [{
      time:"Jan 1 - Jan 7",
      hours:15
  }]
    const hoursSubmissions = () => (
        <Accordion id="submissions" title="Hours submissions">
            <div className={css.accordionContainer}>
                <div className={css.title_submisson}>
                    {applicantDetail.user.first_name} has submitted new hours. Please approve or contest.
                </div>
                <div className={css.current_submission}>
                    <div className={css.time}>{currentSubmission.time}</div>
                    <div className={css.hours}>{currentSubmission.hours} hours</div>
                </div>
                <div className={css.btn_submission}>
                    <Button onClick={onApprove}>Approve</Button>
                    <Button onClick={onReject(applicantDetail.id)} color="white">
                        Contest
                    </Button>
                </div>
                <div className={css.previous_submission}>
                    <div className={css.title}>Previous Submissions</div>
                    {
                        previousSubmission.map(item=>(
                            <div className={css.submission}>
                                <span className={css.time}>{item.time}</span>
                                <span className={css.hours}>{item.hours} hours</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Accordion>
    )
    const buttonJSX = () => (
        <div className={css.btnContainer}>
            <Button onClick={onOffer}>Offer</Button>
            <Button onClick={onReject(applicantDetail.id)} color="white">
                Reject
            </Button>
        </div>
    )
    const buttonHourlyJSX = () => (
        <div className={css.btnContainer}>
            <Button color='white' onClick={onEndJob}>End Job</Button>
        </div>
    )
    async function onSubmit() {

    }
    function onCancel(){

    }
    const total = 300;
  return (
      <>
          {showApprove ?
              <div className={css.approveMain}>
                  <div className={css.title}>
                      Approve hours
                  </div>
                  <div className={css.description}>
                      By confirm the hours submission, {applicantDetail.user.first_name} will receive the below payment.
                  </div>
                  <div>
                      <Card className={css.card}>
                          <div className={css.title}>
                              Weekly payment summery
                          </div>
                          <div className={css.summery}>
                              <div className={css.summery_item}>
                                  <span className={css.total_week}>Total week</span>
                                  <span>{total} {unit}</span>
                              </div>
                              <div className={css.summery_item}>
                                  <span>Socious commission (2%)</span>
                                  <span>{Math.floor(total * (2/100))} {unit}</span>
                              </div>
                          </div>
                          <div className={css.total}>
                              <div className={css.total_item}>
                                  <span>Total</span>
                                  <span className={css.count}>{total + (Math.floor(total * (2/100)))} {unit}</span>
                              </div>
                          </div>
                      </Card>
                      <div className={css.btnContainer}>
                          <Button onClick={onSubmit}>Approve</Button>
                          <Button onClick={()=>setShowApprove(false)} color="white">
                              Cancel
                          </Button>
                      </div>
                  </div>
              </div>

              :
        <div className={css.container}>
          <Header paddingTop="var(--safe-area)" title={applicantDetail.user.first_name} onBack={() => history.back()} />
          <div className={css.main}>
              {printWhen(hoursSubmissions(),applicantDetail.project?.payment_scheme === "HOURLY" && applicantDetail.status === 'APPROVED')}
            <Accordion id="info" title="Applicant info">
              <ApplicantInfo
                name={`${applicantDetail.user.first_name} ${applicantDetail.user.last_name}`}
                jobTitle={'job title'}
                bio={applicantDetail.user?.bio}
                avatar={applicantDetail.user?.avatar?.url}
              />
            </Accordion>
            <Accordion id="cover-letter" title="Cover letter">
              <div className={css.accordionContainer}>{applicantDetail.cover_letter}</div>
            </Accordion>
            {printWhen(uploadedResumeAccordion, !!applicantDetail?.attachment?.url)}
            {printWhen(screeningQuestionAccordion, screeningQuestions.questions.length > 0)}
          </div>
            {printWhen(buttonJSX(),applicantDetail.status !== 'APPROVED')}
            {printWhen(buttonHourlyJSX(),applicantDetail.status === 'APPROVED')}
        </div>
          }
      </>
  );
};
