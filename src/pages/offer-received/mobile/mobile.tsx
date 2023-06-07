import Dapp from 'src/dapp';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Button } from 'src/components/atoms/button/button';
import { Header } from 'src/components/atoms/header-v2/header';
import { Typography } from 'src/components/atoms/typography/typography';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Divider } from 'src/components/templates/divider/divider';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { PaymentMethods } from 'src/components/templates/payment-methods';
import { translatePaymentTerms } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { translateRemotePreferences } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { printWhen } from 'src/core/utils';
import { useOfferReceivedShared } from '../offer-received.shared';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const { offer, status, account, isPaidCrypto, onAccept, onDeclined, equivalentUSD } = useOfferReceivedShared();

  const offeredMessageBoxJSX = (
    <div className={css.congratulations}>
      <img src="/icons/mail-inbox-envelope-favorite-white.svg" />
      <div>
        <div className={css.congratulationsText}>Congratulations, you received an offer.</div>
        <div className={css.congratulationsText}>Accept the offer to start working on this job.</div>
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
          <span className={css.companyName}>{offer.offerer.meta.name}</span> to start the job.
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
      <Button onClick={onAccept(offer.id)} disabled={!account && isPaidCrypto}>
        Accept offer
      </Button>
      <Button onClick={onDeclined(offer.id)} color="white">
        Decline
      </Button>
    </div>
  );

  return (
    <TopFixedMobile>
      <Header title={`${offer.job_category.name}`} onBack={() => history.back()} />
      <div className={css.body}>
        {printWhen(offeredMessageBoxJSX, status === 'PENDING')}
        {printWhen(acceptedMessageBoxJSX, status === 'APPROVED')}
        {printWhen(withdrawnMessageBoxJSX, status === 'WITHRAWN')}
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
                <div className={css.detailItemValue}>{translateRemotePreferences(offer.project.remote_preference)}</div>
              </div>
              <div className={css.detailItem}>
                <div className={css.detailItemLabel}>Job total</div>
                <div className={css.detailItemValue}>
                  {offer.assignment_total}
                  {printWhen(<span className={css.detailItemValue_small}> = {equivalentUSD()} USD</span>, isPaidCrypto)}
                </div>
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
              username={offer.offerer.meta.shortname}
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
        <Accordion title={`About ${offer.organization.name}`} id="about-company">
          <div className={css.aboutCompany}>
            <Typography>{offer.organization.bio}</Typography>
          </div>
        </Accordion>
        {printWhen(
          <div className={css.wallet}>
            <PaymentMethods crypto_method={<Dapp.Connect />} />
          </div>,
          isPaidCrypto
        )}
        {printWhen(buttonsJSX, status === 'PENDING')}
      </div>
    </TopFixedMobile>
  );
};
