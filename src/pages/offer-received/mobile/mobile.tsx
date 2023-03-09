import { useMatch } from '@tanstack/react-location';
import { useState } from 'react';
import { Accordion } from '../../../components/atoms/accordion/accordion';
import { Button } from '../../../components/atoms/button/button';
import { Header } from '../../../components/atoms/header-v2/header';
import { Typography } from '../../../components/atoms/typography/typography';
import { ProfileView } from '../../../components/molecules/profile-view/profile-view';
import { Divider } from '../../../components/templates/divider/divider';
import { TopFixedMobile } from '../../../components/templates/top-fixed-mobile/top-fixed-mobile';
import { StatusKeys } from '../../../constants/APPLICANT_STATUS';
import { translatePaymentTerms } from '../../../constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from '../../../constants/PROJECT_PAYMENT_TYPE';
import { translateRemotePreferences } from '../../../constants/PROJECT_REMOTE_PREFERENCE';
import { dialog } from '../../../core/dialog/dialog';
import { endpoint } from '../../../core/endpoints';
import { printWhen } from '../../../core/utils';
import { Resolver } from '../offer-received.types';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const { offer } = useMatch().ownData as Resolver;
  const [status, setStatus] = useState<StatusKeys>(offer.status);

  function onAccept(id: string) {
    return () =>
      endpoint.post.offers['{offer_id}/approve'](id).then(() => {
        dialog.alert({ title: 'Offer accepted', message: 'You have successfully accepted the offer' }).then(() => {
          setStatus('APPROVED');
        });
      });
  }

  function onDeclined(id: string) {
    return () => {
      endpoint.post.offers['{offer_id}/withdrawn'](id).then(() => {
        dialog.alert({ title: 'Offer declined', message: 'You have successfully declined the offer' }).then(() => {
          setStatus('WITHRAWN');
        });
      });
    };
  }

  const offeredMessageBoxJSX = (
    <div className={css.congratulations}>
      <img src="/icons/mail-inbox-envelope-favorite-white.svg" />
      <div>
        <div className={css.congratulationsText}>Congratulations, you received an offer.</div>
        <div className={css.congratulationsText}>Accept the offer to start working on this mission.</div>
      </div>
    </div>
  );

  const acceptedMessageBoxJSX = (
    <div className={css.acceptedMessageBox}>
      <img src="/icons/mail-inbox-envelope-check-black.svg" />
      <div>
        <div className={css.congratulationsText}>You accepted this offer.</div>
        <div className={css.congratulationsText}>
          We are just waiting for the final confirmation from{' '}
          <span className={css.companyName}>{offer.offerer.meta.name}</span> to start the mission.
        </div>
      </div>
    </div>
  );

  const withdrawnMessageBoxJSX = (
    <div className={css.acceptedMessageBox}>
      <img src="/icons/mail-inbox-envelope-check-black.svg" />
      <div>
        <div className={css.congratulationsText}>You withdrew this offer.</div>
        <div className={css.congratulationsText}>
          You have already withdrawn the offer from <span className={css.companyName}>{offer.offerer.meta.name}</span>.
        </div>
      </div>
    </div>
  );

  const buttonsJSX = (
    <div className={css.btnContainer}>
      <Button onClick={onAccept(offer.id)}>Accept offer</Button>
      <Button onClick={onDeclined(offer.id)} color="white">
        Decline
      </Button>
    </div>
  );

  return (
    <TopFixedMobile>
      <Header title="title" onBack={() => history.back()} />
      <div className={css.body}>
        {printWhen(offeredMessageBoxJSX, status === 'PENDING')}
        {printWhen(acceptedMessageBoxJSX, status === 'APPROVED')}
        {printWhen(withdrawnMessageBoxJSX, status === 'WITHRAWN')}
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
            <Typography lineLimit={7}>{offer.project.description}</Typography>
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
        {/* <Accordion title="About Company" id="about-company">
          <div className={css.aboutCompany}>
            <Typography>
              // TODO: Ehsan will add the prop later Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            </Typography>
          </div>
        </Accordion> */}
        {printWhen(buttonsJSX, status === 'PENDING')}
      </div>
    </TopFixedMobile>
  );
};
