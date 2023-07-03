import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Divider } from 'src/components/templates/divider/divider';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Button } from 'src/components/atoms/button/button';
import { BackLink } from 'src/components/molecules/back-link';
import { EditOrganization } from './edit/edit';
import { ConnectModal } from '../connect-modal';
import { printWhen } from 'src/core/utils';
import { useProfileOrganizationShared } from '../profile-organization.shared';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    organization,
    address,
    skills,
    profileBelongToCurrentUser,
    socialCauses,
    onConnect,
    connectStatus,
    showMessageIcon,
    onMessage,
    updateOrganization,
  } = useProfileOrganizationShared();
  const [editOpen, setEditOpen] = useState(false);
  const [openConnectModal, setOpenConnectModal] = useState(false);

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

  const skillsJSX = (
    <Divider title="Skills">
      <CategoriesClickable list={skills} />
    </Divider>
  );

  const editButtonJSX = (
    <Button onClick={() => setEditOpen(true)} color="white" width="6.5rem">
      Edit
    </Button>
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
      <TwoColumnCursor>
        <div className={css.sidebar}>
          <BackLink title="Jobs" onBack={() => navigate({ to: '/jobs' })} />
        </div>
        <Card className={css.card} padding={0}>
          <div className={css.container}>
            <div className={css.header}>
              <div style={{ backgroundImage: `url(${organization.cover_image?.url})` }} className={css.cover}>
                <div className={css.avatarContainer}>
                  <Avatar img={organization.image?.url} size="8rem" type="organizations" />
                </div>
              </div>
              <div className={css.menu}>
                <div className={css.btnContainer}>
                  {printWhen(messageJSX, !profileBelongToCurrentUser && showMessageIcon())}
                  {printWhen(connectJSX, !profileBelongToCurrentUser && connectStatus !== 'CONNECTED')}
                  {printWhen(editButtonJSX, profileBelongToCurrentUser)}
                  {/* {printWhen(<ThreeDotsButton onClick={() => showActions(user.id)} />, !profileBelongToCurrentUser)} */}
                </div>
              </div>
            </div>
            <div>
              <Divider>
                {printWhen(orgNameJSX, !!organization?.name)}
                {printWhen(userFullNameJSX, !!organization?.first_name || !!organization?.last_name)}
                {printWhen(usernameJSX, !!organization?.username)}
              </Divider>
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
              {printWhen(skillsJSX, organization.skills && organization.skills.length > 0)}
            </div>
          </div>
          <EditOrganization
            updateOrganization={updateOrganization}
            width="31rem"
            height="75vh"
            open={editOpen}
            onClose={() => setEditOpen(false)}
          />
        </Card>
      </TwoColumnCursor>
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
