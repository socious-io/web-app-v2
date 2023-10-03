import { useState } from 'react';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { ThreeDotsButton } from 'src/components/atoms/three-dots-button/three-dots-button';
import { Toggle } from 'src/components/atoms/toggle';
import { BackLink } from 'src/components/molecules/back-link';
import { Divider } from 'src/components/templates/divider/divider';
import { TwoColumns } from 'src/components/templates/refactored/twoColumns/twoColumns';
import { printWhen } from 'src/core/utils';
import { useAuth } from 'src/hooks/use-auth';

import css from './profileOrg.module.scss';
import { showActions } from './profileOrg.services';
import { useProfileOrg } from './useProfileOrg';
import { ConnectModal } from '../connect-modal';
import { EditOrganization } from '../desktop/edit/edit';

const profileOrg = () => {
  const { isLoggedIn } = useAuth();
  const navigate = {};
  const [editOpen, setEditOpen] = useState(false);
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const {
    organization,
    skills,
    hiring,
    onHiring,
    address,
    connectStatus,
    navigateJobs,
    onClose,
    profileBelongToCurrentUser,
    showMessageIcon,
    socialCauses,
    updateOrganization,
    onConnect,
    onMessage,
    navigateToEdit,
    userIsLoggedIn,
  } = useProfileOrg();

  const bioJSX = (
    <Divider>
      <div className={css.bio}>{organization.bio}</div>
    </Divider>
  );

  const userFullNameJSX = (
    <div className={css.name}>
      {organization?.first_name} {organization?.last_name}
    </div>
  );

  const missionJSX = (
    <Divider title="Mission">
      <div className={css.mission}>{organization.mission}</div>
    </Divider>
  );

  const cultureJSX = (
    <Divider title="Culture">
      <div className={css.culture}>{organization.culture}</div>
    </Divider>
  );

  const jobsJSX = (
    <Divider title="Opportunities">
      <div onClick={navigateJobs} className={css.mission}>
        See Jobs
      </div>
    </Divider>
  );
  const skillsJSX = (
    <Divider title="Skills">
      <CategoriesClickable list={skills} />
    </Divider>
  );

  const editButtonJSX = (
    <>
      <Button onClick={() => setEditOpen(true)} color="white" width="6.5rem" className="hidden md:block">
        Edit
      </Button>
      <Button onClick={navigateToEdit} color="white" width="6.5rem" className="md:hidden">
        Edit
      </Button>
    </>
  );

  const hiringJSX = (
    <Divider>
      <div className={css.hireStatus}>
        <label>Hiring status</label>
        <Toggle name="hiring" checked={hiring} onChange={onHiring} />
      </div>
    </Divider>
  );

  const websiteLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/world-green.svg" />
      <a href={organization.website} className={css.contactData}>
        {organization.website}
      </a>
    </div>
  );

  const orgNameJSX = <div className={css.name}>{organization?.name}</div>;
  const usernameJSX = <div className={css.username}>@{organization?.username}</div>;

  const contactLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/phone-green.svg" />
      <a href={`tel:${organization.mobile_country_code}${organization.phone}`} className={css.contactData}>
        {organization.mobile_country_code} {organization.phone}
      </a>
    </div>
  );

  const emailLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/email-green.svg" />
      <a href={`mailto:${organization.email}`} className={css.contactData}>
        {organization.email}
      </a>
    </div>
  );

  const cityLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/pin-green.svg" />
      <div className={css.contactData}>{address}</div>
    </div>
  );

  const connectJSX = (
    <Button
      width="8.5rem"
      onClick={() => setOpenConnectModal(true)}
      disabled={connectStatus === 'PENDING'}
      color={connectStatus === 'PENDING' ? 'white' : 'blue'}
    >
      {connectStatus === 'PENDING' ? 'Request sent' : 'Connect'}
    </Button>
  );

  const messageJSX = (
    <div
      className={css.message}
      onClick={() =>
        navigate({
          to: `/chats/new/${organization?.id}`,
        })
      }
    >
      <img src="/icons/message-blue.svg" />
    </div>
  );
  return (
    <>
      <TwoColumns>
        <div className={css.sidebar}>
          <BackLink title="Jobs" onBack={() => navigate({ to: '/jobs' })} />
          <Card>
            <div onClick={navigateJobs}>Job opportunities </div>
          </Card>
        </div>
        <div className={`${css.container} md:rounded-2xl md:bg-white`}>
          <div className={css.header}>
            <div onClick={onClose} className={`${css.close} flex md:hidden`}>
              <img src="/icons/close-black.svg" />
            </div>
            <div style={{ backgroundImage: `url(${organization.cover_image?.url})` }} className={css.cover}>
              <div className={css.avatarContainer}>
                <Avatar
                  img={organization.image?.url}
                  size="8rem"
                  type="organizations"
                  {...(hiring ? { badge: { color: '#DC31AC', image: '/icons/hire.svg' } } : {})}
                />
              </div>
            </div>
            <div className={css.menu}>
              <div className={css.btnContainer}>
                {printWhen(messageJSX, !profileBelongToCurrentUser && showMessageIcon())}
                {printWhen(connectJSX, !profileBelongToCurrentUser && userIsLoggedIn && connectStatus !== 'CONNECTED')}
                {printWhen(editButtonJSX, profileBelongToCurrentUser)}
                <div className="md:hidden">
                  {printWhen(
                    <ThreeDotsButton onClick={() => showActions(organization.id)} />,
                    !profileBelongToCurrentUser,
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Divider>
              {printWhen(orgNameJSX, !!organization?.name)}
              {printWhen(userFullNameJSX, !!organization?.first_name || !!organization?.last_name)}
              {printWhen(usernameJSX, !!organization?.username)}
            </Divider>

            {printWhen(hiringJSX, profileBelongToCurrentUser)}
            {printWhen(bioJSX, !!organization.bio)}

            <Divider>
              <div className={css.userConnections}>
                <div>{organization.followings} Connections</div>
                <div>{organization.followers} Followers</div>
              </div>
            </Divider>
            <Divider title="Social Causes">
              <CategoriesClickable list={socialCauses} />
            </Divider>
            <Divider title="Contact">
              {printWhen(contactLinkJSX, !!organization.mobile_country_code)}
              {printWhen(emailLinkJSX, !!organization.email)}
              {printWhen(websiteLinkJSX, !!organization.website)}
              {printWhen(cityLinkJSX, !!organization.city)}
            </Divider>
            {printWhen(missionJSX, !!organization.mission)}
            {printWhen(cultureJSX, !!organization.culture)}
            {printWhen(skillsJSX, organization.skills && organization.skills?.length > 0)}
            <div className="md:hidden">{jobsJSX}</div>
          </div>
          <EditOrganization
            updateOrganization={updateOrganization}
            width="31rem"
            height="75vh"
            open={editOpen}
            onClose={() => setEditOpen(false)}
          />
        </div>
      </TwoColumns>
      <ConnectModal
        open={openConnectModal}
        onClose={() => setOpenConnectModal(false)}
        onSend={() => {
          onConnect(organization.id);
          setOpenConnectModal(false);
        }}
        onMessage={onMessage}
      />
    </>
  );
};

export default profileOrg;
