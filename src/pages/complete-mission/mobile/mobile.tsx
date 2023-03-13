import { useMatch } from '@tanstack/react-location';
import { useState } from 'react';
import { Accordion } from '../../../components/atoms/accordion/accordion';
import { Button } from '../../../components/atoms/button/button';
import { Header } from '../../../components/atoms/header-v2/header';
import { Typography } from '../../../components/atoms/typography/typography';
import { ProfileView } from '../../../components/molecules/profile-view/profile-view';
import { Divider } from '../../../components/templates/divider/divider';
import { TopFixedMobile } from '../../../components/templates/top-fixed-mobile/top-fixed-mobile';
import { translatePaymentTerms } from '../../../constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from '../../../constants/PROJECT_PAYMENT_TYPE';
import { translateRemotePreferences } from '../../../constants/PROJECT_REMOTE_PREFERENCE';
import { endpoint } from '../../../core/endpoints';
import { printWhen } from '../../../core/utils';
import { Loader } from '../complete-mission.types';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const resolver = useMatch().ownData;
  const { offer, mission } = resolver as Loader;
  const [status, setStatus] = useState(offer.status);

  const offeredMessageBoxJSX = (
    <div className={css.congratulations}>
      <img src="/icons/tick-white-simple.svg" />
      <div>
        <div className={css.congratulationsText}>Your mission has been confirmed.</div>
        <div className={css.congratulationsText}>
          Once you have finished your work please click on “complete mission” button.
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
          You will get your payment once <span className={css.companyName}>{offer.offerer.meta.name}</span> confirms your
          job.
        </div>
      </div>
    </div>
  );

  const stoppedMessageBoxJSX = (
    <div className={css.acceptedMessageBox}>
      <img src="/icons/mail-inbox-envelope-check-black.svg" />
      <div>
        <div className={css.congratulationsText}>You marked this assignment as stopped.</div>
        {/* <div className={css.congratulationsText}>
            You have already withdrawn the offer from <span className={css.companyName}>{offer.offerer.meta.name}</span>.
          </div> */}
      </div>
    </div>
  );

  function onCompleteMission() {
    endpoint.post.missions['{mission_id}/complete'](mission.id).then(() => setStatus('CLOSED'));
  }

  function onStopMission() {
    // TODO: ask @jeyem the current status string
    endpoint.post.missions['{mission_id}/cancel'](mission.id).then(() => setStatus('KICK_OUT'));
  }

  const buttonsJSX = (
    <div className={css.btnContainer}>
      <Button onClick={onCompleteMission}>Complete mission</Button>
      <Button onClick={onStopMission} color="white">
        Stop mission
      </Button>
    </div>
  );

  return (
    <TopFixedMobile>
      <Header title={`${offer.job_category.name}`} onBack={() => history.back()} />
      <div className={css.body}>
        {printWhen(offeredMessageBoxJSX, status === 'HIRED')}
        {printWhen(acceptedMessageBoxJSX, status === 'CLOSED')}
        {printWhen(stoppedMessageBoxJSX, status === 'KICK_OUT')}
        <Accordion title="Mission details" id="mission-details">
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
                <div className={css.detailItemValue}>{translateRemotePreferences(offer.project.remote_preference)}</div>
              </div>
              <div className={css.detailItem}>
                <div className={css.detailItemLabel}>Mission total</div>
                <div className={css.detailItemValue}>{offer.assignment_total}</div>
              </div>
              <div className={css.detailItem}>
                <div className={css.detailItemLabel}>Due date</div>
                <div className={css.detailItemValue}>{offer.due_date || 'Unspecified'}</div>
              </div>
              <div className={css.detailItem}>
                <div className={css.detailItemLabel}>Estimate total hours</div>
                <div className={css.detailItemValue}>{offer.total_hours} hrs</div>
              </div>
            </div>
          </div>
        </Accordion>
        <Accordion title="Job Info" id="job-info">
          <div className={css.jobInfoContainer}>
            <ProfileView
              img={offer.offerer.meta.image}
              type={offer.offerer.type}
              name={offer.offerer.meta.name}
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
            {/* <Divider title="Contact Info">
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam inventore quod ipsa veniam enim vitae
            provident, beatae dolore ipsam dicta vel maxime vero harum exercitationem at maiores odit sunt alias?
          </Typography>
        </Divider> */}
          </div>
        </Accordion>
        <Accordion title={`About ${offer.organization.name}`} id="about-company">
          <div className={css.aboutCompany}>
            <Typography>{offer.organization.bio}</Typography>
          </div>
        </Accordion>
        {printWhen(buttonsJSX, status === 'HIRED')}
      </div>
    </TopFixedMobile>
  );
};
