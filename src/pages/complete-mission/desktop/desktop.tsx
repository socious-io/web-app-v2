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
import { translateRemotePreferences } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { translatePaymentTerms } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { IdentityReq } from 'src/core/types';
import { printWhen } from 'src/core/utils';
import { useCompleteMissionShared } from '../complete-mission.shared';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const { offer, media, status, onCompleteMission, onStopMission } = useCompleteMissionShared();

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

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Following', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate({ to: `/team/${identity.id}` }) },
  ];

  return (
    <>
      <div className={css.status}>
        {printWhen(offeredMessageBoxJSX, status === 'HIRED')}
        {printWhen(acceptedMessageBoxJSX, status === 'CLOSED')}
        {printWhen(stoppedMessageBoxJSX, status === 'KICK_OUT')}
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
                    <div className={css.detailItemValue}>{offer.assignment_total}</div>
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
          {printWhen(buttonsJSX, status === 'HIRED')}
        </Card>
      </TwoColumnCursor>
    </>
  );
};
