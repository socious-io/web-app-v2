import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import Dapp from 'src/dapp';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Divider } from 'src/components/templates/divider/divider';
import { Typography } from 'src/components/atoms/typography/typography';
import { ProfileCard } from 'src/components/templates/profile-card';
import { Button } from 'src/components/atoms/button/button';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { PaymentMethods } from 'src/components/templates/payment-methods';
import { translateRemotePreferences } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { translatePaymentTerms } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { printWhen } from 'src/core/utils';
import { IdentityReq } from 'src/core/types';
import { useOfferReceivedShared } from '../offer-received.shared';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const { offer, media, status, account, isPaidCrypto, unit, onAccept, onDeclined, equivalentUSD } = useOfferReceivedShared();

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
      <Button onClick={onAccept(offer.id)} disabled={!account && isPaidCrypto} className={css.btn}>
        Accept offer
      </Button>
      <Button onClick={onDeclined(offer.id)} color="white" className={css.btn}>
        Decline
      </Button>
    </div>
  );

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/network.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Followings', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate({ to: `/team/${identity.id}` }) },
  ];

  return (
    <>
      <div className={css.status}>
        {printWhen(offeredMessageBoxJSX, status === 'PENDING')}
        {printWhen(acceptedMessageBoxJSX, status === 'APPROVED')}
        {printWhen(withdrawnMessageBoxJSX, status === 'WITHRAWN')}
      </div>
      <TwoColumnCursor>
        <div className={css.leftContainer}>
          <ProfileCard />
          <CardMenu title="Network" list={identity.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
        </div>
        <Card className={css.rightContainer}>
          <div>
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
                    <div className={css.detailItemValue}>
                      {translateRemotePreferences(offer.project.remote_preference)}
                    </div>
                  </div>
                  <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Job total</div>
                    <div className={css.detailItemValue}>
                      {offer.assignment_total} <span>{unit}</span>
                      {printWhen(
                        <span className={css.detailItemValue_small}> = {equivalentUSD()} USD</span>,
                        isPaidCrypto
                      )}
                    </div>
                  </div>
                  {/* <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Due date</div>
                    <div className={css.detailItemValue}>{offer.due_date || 'Unspecified'}</div>
                  </div> */}
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
              </div>
            </Accordion>
            <Accordion title={`About ${offer.organization.name}`} id="about-company">
              <div className={css.aboutCompany}>
                <Typography>{offer.organization.bio}</Typography>
              </div>
            </Accordion>
          </div>
          {printWhen(
            <div className={css.wallet}>
              <PaymentMethods crypto_method={<Dapp.Connect />} />
            </div>,
            isPaidCrypto
          )}
          {printWhen(buttonsJSX, status === 'PENDING')}
        </Card>
      </TwoColumnCursor>
    </>
  );
};
