import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Divider } from 'src/components/templates/divider/divider';
import { Typography } from 'src/components/atoms/typography/typography';
import { ProfileCard } from 'src/components/templates/profile-card';
import { Button } from 'src/components/atoms/button/button';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { translatePaymentTerms } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { translatePaymentMode } from 'src/constants/PROJECT_PAYMENT_MODE';
import { IdentityReq } from 'src/core/types';
import { printWhen } from 'src/core/utils';
import { formatDate } from 'src/core/time';
import { useCompleteMissionShared } from '../complete-mission.shared';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';
import { useState } from 'react';
import { SubmittedHoursModal } from '../../submit-hours/submitted-hours-modal';
import { useOfferReceivedShared } from 'src/pages/offer-received/offer-received.shared';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const [openSubmitHoursModal, setOpenSubmitHoursModal] = useState(false);
  const [displayedSubmissions, setDisplayedSubmissions] = useState(2);
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const { offer, media, status, mission, onCompleteMission, onStopMission } = useCompleteMissionShared();
  const { isPaidCrypto, unit, equivalentUSD } = useOfferReceivedShared();

  const { isLoggedIn } = useAuth();

  const offeredMessageBoxJSX = (
    <div className={css.congratulations}>
      <img src="/icons/tick-white-simple.svg" />
      <div>
        <div className={css.congratulationsText}>Your job has been confirmed.</div>
        <div className={css.congratulationsText}>
          Once you have finished your work please click on “complete job” button.
        </div>
      </div>
    </div>
  );

  const acceptedMessageBoxJSX = (
    <div className={css.acceptedMessageBox}>
      <img src="/icons/mail-inbox-envelope-check-black.svg" />
      <div>
        <div className={css.congratulationsText}>You marked this job as completed.</div>
        <div className={css.congratulationsText}>
          You will get your payment once <span className={css.companyName}>{offer.offerer.meta.name}</span> confirms
          your assignment.
        </div>
      </div>
    </div>
  );

  const stoppedMessageBoxJSX = (
    <div className={css.acceptedMessageBox}>
      <img src="/icons/mail-inbox-envelope-check-black.svg" />
      <div>
        <div className={css.congratulationsText}>You marked this job as stopped.</div>
        {/* <div className={css.congratulationsText}>
            You have already withdrawn the offer from <span className={css.companyName}>{offer.offerer.meta.name}</span>.
          </div> */}
      </div>
    </div>
  );

  const buttonsJSX = (
    <div className={css.btnContainer}>
      <Button onClick={onCompleteMission} className={css.btn}>
        Complete job
      </Button>
      <Button onClick={onStopMission} color="white" className={css.btn}>
        Stop job
      </Button>
    </div>
  );
  const onSubmitHours = () => {
    setOpenSubmitHoursModal(true);
  };

  const displayMore = () => {
    const toDisplay = displayedSubmissions + 10;
    setDisplayedSubmissions(toDisplay);
  };

  const hourlyButtonsJSX = (
    <div className={css.btnContainer}>
      <Button onClick={onSubmitHours} className={css.btn}>
        Submit Hours
      </Button>
      <Button onClick={onStopMission} color="white" className={css.btn}>
        Stop job
      </Button>
    </div>
  );

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Following', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate({ to: `/team/${identity.id}` }) },
  ];

  const SubmitHoursJSX = () => (
    <div className={css.missionDetailContainer}>
      {mission.submitted_works?.slice(0, displayedSubmissions).map((item) => (
        <div className={css.hours} key={item.time}>
          <div>
            {formatDate(item.start_at)} - {formatDate(item.end_at)}
          </div>
          <div className={css.hours_status}>
            <div className={css.text}>{item.total_hours} hours</div>
            <div>
              {item.status === 'CONFIRMED' && (
                <img className={css.icon} src="/icons/confirmed-submit.svg" alt="submitted" />
              )}
              {item.status === 'PENDING' && <img className={css.icon} src="/icons/waiting-submit.svg" alt="waiting" />}
            </div>
          </div>
        </div>
      ))}
      {printWhen(
        <div className={css.view_more} onClick={displayMore}>
          view more
        </div>,
        mission.submitted_works?.length > displayedSubmissions
      )}
      {printWhen(<div className={css.noSubmissions}>No submissions yet</div>, mission.submitted_works === null)}
      <div className={css.hours_btn}>
        <Button className={css.btn_full} onClick={onSubmitHours}>
          Submit Hours
        </Button>
      </div>
    </div>
  );
  const hoursSubmission = () => (
    <Accordion title="Hours submission" id="hours-submission">
      <div className={css.missionDetailContainer}>
        {printWhen(SubmitHoursJSX(), mission.submitted_works?.length > 0)}
      </div>
    </Accordion>
  );
  return (
    <>
      <div className={css.status}>
        {printWhen(offeredMessageBoxJSX, status === 'HIRED')}
        {printWhen(acceptedMessageBoxJSX, status === 'CLOSED')}
        {printWhen(stoppedMessageBoxJSX, status === 'KICK_OUT')}
      </div>
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <div className={css.leftContainer}>
          <ProfileCard />
          <CardMenu title="Network" list={identity.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
        </div>
        <Card className={css.rightContainer}>
          <div>
            {printWhen(hoursSubmission(), offer.project.payment_scheme === 'HOURLY')}
            <Accordion title="Job details" id="mission-details">
              <div className={css.missionDetailContainer}>
                <div className={css.missionDetailMessage}>{offer.offer_message}</div>
                <div className={css.detailItemContainer}>
                  <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Payment type</div>
                    <div className={css.detailItemValue}>{translatePaymentType(offer.project.payment_type)}</div>
                  </div>
                  <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Payment terms</div>
                    <div className={css.detailItemValue}>{translatePaymentTerms(offer.project.payment_scheme)}</div>
                  </div>
                  <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Payment mode</div>
                    <div className={css.detailItemValue}>{translatePaymentMode(offer.payment_mode)}</div>
                  </div>
                  {printWhen(
                    <div className={css.detailItem}>
                      <div className={css.detailItemLabel}>Job total</div>
                      <div className={css.detailItemValue}>
                        {offer.assignment_total} <span>{unit}</span>
                        {printWhen(
                          <span className={css.detailItemValue_small}> = {equivalentUSD()} USD</span>,
                          isPaidCrypto
                        )}
                      </div>
                    </div>,
                    offer.project.payment_scheme === 'FIXED'
                  )}
                  {/* <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Due date</div>
                    <div className={css.detailItemValue}>{offer.due_date || 'Unspecified'}</div>
                  </div> */}
                  {printWhen(
                    <div className={css.detailItem}>
                      <div className={css.detailItemLabel}>Estimate total hours</div>
                      <div className={css.detailItemValue}>{offer.total_hours} hrs</div>
                    </div>,
                    offer.project.payment_scheme === 'FIXED'
                  )}
                  {printWhen(
                    <div className={css.detailItem}>
                      <div className={css.detailItemLabel}>Paid - Hourly rate</div>
                      <div className={css.detailItemValue}>
                        {offer.assignment_total} {unit} / hour
                      </div>
                    </div>,
                    offer.project.payment_scheme === 'HOURLY'
                  )}
                  {printWhen(
                    <div className={css.detailItem}>
                      <div className={css.detailItemLabel}>Weekly limit</div>
                      <div className={css.detailItemValue}>{offer.weekly_limit} hrs / week</div>
                    </div>,
                    offer.project.payment_scheme === 'HOURLY'
                  )}
                </div>
              </div>
            </Accordion>
            <Accordion title="Job Info" id="job-info">
              <div className={css.jobInfoContainer}>
                <ProfileView
                  img={offer.offerer.meta.image}
                  type={offer.offerer.type}
                  name={offer.offerer.meta.name}
                  username={offer.offerer.meta.shortname}
                  location={`${offer.offerer.meta.city}, ${offer.offerer.meta.country}`}
                />
                <div className={css.jobTitle}>{offer.project.title}</div>
                {/* <Typography lineLimit={7}>{offer.project.description}</Typography> */}
              </div>
            </Accordion>
            <Accordion title="My application" id="my-application">
              <div className={css.myApplicationContainer}>
                <Divider title="Cover Letter">
                  <Typography>{offer.applicant.cover_letter}</Typography>
                </Divider>
                {printWhen(
                  <Divider title="Resume">
                    <div className={css.uploadedResume}>
                      <img src="/icons/attachment-black.svg" />
                      <a href={media.url} target="_blank">
                        {media.filename}
                      </a>
                    </div>
                  </Divider>,
                  !!media.url
                )}
                {/* <Divider title="Contact Info">
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam inventore quod ipsa veniam enim vitae
            provident, beatae dolore ipsam dicta vel maxime vero harum exercitationem at maiores odit sunt alias?
          </Typography>
        </Divider> */}
              </div>
            </Accordion>
            <Accordion title={`About ${offer.organization.name}`} id="about-company" no_border={status === 'CLOSED'}>
              <div className={css.aboutCompany}>
                <Typography>{offer.organization.bio}</Typography>
              </div>
            </Accordion>
          </div>
          {printWhen(buttonsJSX, status === 'HIRED' && offer.project.payment_scheme !== 'HOURLY')}
          {printWhen(hourlyButtonsJSX, status === 'HIRED' && offer.project.payment_scheme === 'HOURLY')}
        </Card>
      </TwoColumnCursor>
      <SubmittedHoursModal
        onClose={() => setOpenSubmitHoursModal(false)}
        open={openSubmitHoursModal}
        onSend={console.log}
      />
    </>
  );
};
