import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { useAuth } from 'src/hooks/use-auth';
import { BackLink } from 'src/components/molecules/back-link';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Card } from 'src/components/atoms/card/card';
import { Button } from 'src/components/atoms/button/button';
import { OfferModal } from '../../offer/offer-modal';
import { printWhen } from 'src/core/utils';
import { ApplicantResp } from 'src/core/types';
import { jobOfferRejectLoader } from '../../job-offer-reject.services';
import { useApplicantDetailShared } from '../applicant-detail.shared';
import css from './desktop.module.scss';
import {ApproveModal} from "../approve-modal";
import {isoToStandard} from "../../../../core/time";

export const Desktop: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { id } = useMatch().params || {};
  const { navigate, screeningQuestions, applicantDetail, onReject,missions } = useApplicantDetailShared();
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [showApproveModal,setShowApproveModal] = useState(false)
  const [missionDetail,setMissionDetail] = useState({mission_id:'',work_id:''})
  async function updateApplicantList() {
    await jobOfferRejectLoader({ params: { id } });
    setOpenOfferModal(false);
    navigate({ to: '..' });
  }
  function onApprove(mission_id:string,work_id:string) {
      setMissionDetail({mission_id,work_id})
      setShowApproveModal(true);

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

          {missions.items.map((mission:any)=>(
              <>
                {mission.submitted_works.map((submit_work:any)=>(
                    <div>
                      {printWhen(
                          <>
                            <div className={css.current_submission}>
                              <div className={css.time}>{isoToStandard(submit_work.start_at)} - {isoToStandard(submit_work.end_at)}</div>
                              <div className={css.hours}>{submit_work.total_hours} hours</div>
                            </div>
                            <div className={css.btn_submission}>
                              <Button onClick={()=>onApprove(mission.id,submit_work.id)}>Approve</Button>
                              <Button onClick={onReject(applicantDetail.id)} color="white">
                                Contest
                              </Button>
                            </div>
                          </>,
                        submit_work.status === "PENDING"
                      )}
                    </div>
                ))}
              </>
          ))}

          <div className={css.previous_submission}>
            <div className={css.title}>Previous Submissions</div>
              {
                missions.items.map((mission:any)=>(
                    <>
                      {mission.submitted_works.map((submit_work:any)=>(
                          <div>
                            {printWhen(
                                <>
                                  <div className={css.submission}>
                                    <span className={css.time}>{isoToStandard(submit_work.start_at)} - {isoToStandard(submit_work.end_at)}</span>
                                    <span className={css.hours}>{submit_work.total_hours} hours</span>
                                  </div>
                                </>,
                                submit_work.status === "APPROVED"
                            )}
                          </div>
                      ))}
                    </>
                ))}
          </div>
        </div>
      </Accordion>
  )
  function onEndJob() {
    console.log('end job')
  }
  const buttonJSX = () => (
      <div className={css.btnContainer}>
        <Button onClick={()=>setOpenOfferModal(true)}>Offer</Button>
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
  return (
    <>
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <div className={css.leftContainer}>
          <BackLink title="Overview" onBack={() => history.back()} />
        </div>
        <Card className={css.rightContainer}>
          {printWhen(hoursSubmissions(),applicantDetail.project?.payment_scheme === "HOURLY" && applicantDetail.status === 'APPROVED')}
          <Accordion id="cover-letter" title="Cover letter">
            <div className={css.accordionContainer}>{applicantDetail.cover_letter}</div>
          </Accordion>
          {printWhen(uploadedResumeAccordion, !!applicantDetail?.attachment?.url)}
          {printWhen(screeningQuestionAccordion, screeningQuestions.questions.length > 0)}
          {printWhen(buttonJSX(),applicantDetail.status !== 'APPROVED')}
          {printWhen(buttonHourlyJSX(),applicantDetail.status === 'APPROVED')}
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
      <ApproveModal missionDetail={missionDetail} applicantDetail={applicantDetail} onDone={console.log} open={showApproveModal} onClose={()=>setShowApproveModal(false)}/>
    </>
  );
};
