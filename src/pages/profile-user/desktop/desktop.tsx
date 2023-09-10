import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Divider } from 'src/components/templates/divider/divider';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Button } from 'src/components/atoms/button/button';
import { Toggle } from 'src/components/atoms/toggle';
import { ImpactBadge } from 'src/components/atoms/impact-badge/impact-badge';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { ConnectModal } from 'src/pages/profile-organization/connect-modal';
import { BackLink } from 'src/components/molecules/back-link';
import { Edit } from './edit/edit';
import { printWhen } from 'src/core/utils';
import { badgesList } from '../profile-user.services';
import { useProfileUserShared } from '../profile-user.shared';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    updateUser,
    address,
    badges,
    socialCauses,
    avatarImage,
    skills,
    profileBelongToCurrentUser,
    gotToDesktopAchievement,
    onConnect,
    connectStatus,
    showMessageIcon,
    onMessage,
    missions,
    openToWork,
    onOpenToWork,
    openToVolunteer,
    onOpenToVolunteer,
  } = useProfileUserShared();
  const { isLoggedIn } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const cityLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/pin-green.svg" />
      <div className={css.contactData}>{address}</div>
    </div>
  );

  const contactLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/phone-green.svg" />
      <a href={`tel:${user.mobile_country_code}${user.phone}`} className={css.contactData}>
        {user.mobile_country_code} {user.phone}
      </a>
    </div>
  );

  const emailLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/email-green.svg" />
      <a href={`mailto:${user.email}`} className={css.contactData}>
        {user.email}
      </a>
    </div>
  );

  const websiteLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/email-green.svg" />
      <a href={`mailto:${user.email}`} className={css.contactData}>
        {user.email}
      </a>
    </div>
  );

  const bioJSX = (
    <Divider>
      <div className={css.bio}>{user.bio}</div>
    </Divider>
  );

  const userFullNameJSX = (
    <div className={css.name}>
      {user?.first_name} {user?.last_name}
    </div>
  );

  const missionJSX = (
    <Divider title="Mission">
      <div className={css.mission}>{user.mission}</div>
    </Divider>
  );
  const expriencesJSX = (
    <Divider title="Experiences">
      {missions.map((mission) => (
        <div className={css.exprience}>
          <div className={css.organizationImageContainer}>
            <img
              className={css.exprinceOrgImage}
              alt="organization"
              src={mission.organizationImage ? mission.organizationImage : '/icons/organization.svg'}
            />
          </div>
          <div>
            <div className={css.exprienceDetails}>
              <div className={css.exprienceTitle}>{mission.organizationName}</div>
              <div className={css.exprienceDetail}>{mission.role}</div>
              <div className={css.exprienceDetail}>{`${mission.dateFrom} - ${mission.dateTo}`}</div>
              <div className={css.exprienceDetail}>{mission.location}</div>
            </div>
          </div>
        </div>
      ))}
    </Divider>
  );
  const cultureJSX = (
    <Divider title="Culture">
      <div className={css.culture}>{user.culture}</div>
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

  const openToWorkToggleJSX = (
    <Divider>
      <div className={css.profileStatus}>
        <label>Open to Work</label>
        <Toggle name="OpenToWork" checked={openToWork} onChange={onOpenToWork} />
      </div>
    </Divider>
  );

  const openToVolunteerToggleJSX = (
    <Divider>
      <div className={css.profileStatus}>
        <label>Open to volunteer</label>
        <Toggle name="OpenToVolunteer" checked={openToVolunteer} onChange={onOpenToVolunteer} />
      </div>
    </Divider>
  );

  const orgNameJSX = <div className={css.name}>{user?.name}</div>;
  const usernameJSX = <div className={css.username}>@{user?.username}</div>;

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
          to: `/chats/new/${user?.id}`,
        })
      }
    >
      <img src="/icons/message-blue.svg" />
    </div>
  );

  return (
    <>
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <div className={css.sidebar}>
          <BackLink title="jobs" onBack={() => navigate({ to: '/jobs' })} />
        </div>

        <Card className={css.card} padding={0}>
          <div className={css.header}>
            <div style={{ backgroundImage: `url(${user.cover_image?.url})` }} className={css.cover}>
              <div className={css.avatarContainer}>
                <Avatar
                  img={avatarImage}
                  size="8rem"
                  type="users"
                  {...(openToWork || openToVolunteer
                    ? { badge: { color: '#004a46', image: '/icons/available.svg' } }
                    : {})}
                />
              </div>
            </div>
            <div className={css.menu}>
              <div className={css.btnContainer}>
                {printWhen(messageJSX, !profileBelongToCurrentUser && showMessageIcon())}
                {printWhen(connectJSX, !profileBelongToCurrentUser && connectStatus !== 'CONNECTED')}
                {printWhen(editButtonJSX, profileBelongToCurrentUser)}
              </div>
            </div>
          </div>
          <div>
            <Divider>
              {printWhen(orgNameJSX, !!user?.name)}
              {printWhen(userFullNameJSX, !!user?.first_name || !!user?.last_name)}
              {printWhen(usernameJSX, !!user?.username)}
              <div>
                {printWhen(openToWorkToggleJSX, profileBelongToCurrentUser)}
                {printWhen(openToVolunteerToggleJSX, profileBelongToCurrentUser)}
              </div>
            </Divider>
            <Divider>
              <div className={css.achievements} onClick={gotToDesktopAchievement}>
                <div className={css.badges}>
                  {badgesList(badges.badges).map((item) => {
                    return <ImpactBadge key={item.color} size="2.75rem" {...item} />;
                  })}
                </div>
                <div className={css.achievementsLink}>Achievements</div>
              </div>
            </Divider>

            {printWhen(bioJSX, !!user.bio)}
            <Divider>
              <div className={css.userConnections}>
                <div>{user.followings} Connections</div>
                <div>{user.followers} Followers</div>
              </div>
            </Divider>
            {printWhen(expriencesJSX, missions.length > 0)}
            <Divider title="Social Causes">
              <CategoriesClickable list={socialCauses} />
            </Divider>
            <Divider title="Contact">
              {printWhen(contactLinkJSX, !!user.mobile_country_code)}
              {printWhen(emailLinkJSX, !!user.email)}
              {printWhen(websiteLinkJSX, !!user.website)}
              {printWhen(cityLinkJSX, !!user.city)}
            </Divider>
            {printWhen(missionJSX, !!user.mission)}
            {printWhen(cultureJSX, !!user.culture)}
            {printWhen(skillsJSX, user.skills && user.skills.length > 0)}
            {printWhen(
              <Divider title="Culture">
                <div className={css.culture}>{user.culture}</div>
              </Divider>,
              !!user.culture
            )}
          </div>
          <Edit
            updateUser={updateUser}
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
          onConnect(user.id);
          setOpenConnectModal(false);
        }}
        onMessage={onMessage}
      />
    </>
  );
};
