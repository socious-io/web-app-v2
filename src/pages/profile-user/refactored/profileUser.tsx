import { useState } from 'react';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { ImpactBadge } from 'src/components/atoms/impact-badge/impact-badge';
import { Toggle } from 'src/components/atoms/toggle';
import { BackLink } from 'src/components/molecules/back-link';
import { Divider } from 'src/components/templates/divider/divider';
import { TwoColumns } from 'src/components/templates/refactored/twoColumns/twoColumns';
import { printWhen } from 'src/core/utils';
import { ConnectModal } from 'src/pages/profile-organization/connect-modal';

import css from './profileUser.module.scss';
import { badgesList } from './profileUser.services';
import { useProfileUser } from './useProfileUser';
import { Edit } from '../desktop/edit/edit';

const ProfileUser = () => {
  const [openConnectModal, setOpenConnectModal] = useState(false);

  const navigate = {};
  const {
    user,
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
    onClose,
    editOpen,
    setEditOpen,
    onEdit,
    userIsLoggedIn,
  } = useProfileUser();

  const orgNameJSX = <div className={css.name}>{user?.name}</div>;
  const usernameJSX = <div className={css.username}>@{user?.username}</div>;
  const userFullNameJSX = (
    <div className={css.name}>
      {user?.first_name} {user?.last_name}
    </div>
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

  const bioJSX = (
    <Divider>
      <div className={css.bio}>{user.bio}</div>
    </Divider>
  );

  const expriencesJSX = (
    <Divider title="Experiences">
      {missions.map((mission) => (
        <div className="flex flex-row">
          <div className={css.organizationImageContainer}>
            <img
              className="w-[30px]"
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

  const cityLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/pin-green.svg" />
      <div className={css.contactData}>{address}</div>
    </div>
  );

  const missionJSX = (
    <Divider title="Mission">
      <div className={css.mission}>{user.mission}</div>
    </Divider>
  );

  return (
    <div className="w-full h-full">
      <TwoColumns>
        <div className="grid gap-4 sticky top-10">
          <BackLink title="jobs" onBack={() => navigate({ to: '/jobs' })} />
        </div>
        <div className={`${css.container} md:rounded-2xl`}>
          <div className={css.header}>
            <div onClick={onClose} className={`${css.close} flex md:hidden`}>
              <img src="/icons/close-black.svg" />
            </div>

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
                {!profileBelongToCurrentUser && showMessageIcon() && (
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
                )}
                {!profileBelongToCurrentUser && userIsLoggedIn && connectStatus !== 'CONNECTED' && (
                  <Button
                    width="8.5rem"
                    onClick={() => setOpenConnectModal(true)}
                    disabled={connectStatus === 'PENDING'}
                    color={connectStatus === 'PENDING' ? 'white' : 'blue'}
                  >
                    {connectStatus === 'PENDING' ? 'Request sent' : 'Connect'}
                  </Button>
                )}
                {profileBelongToCurrentUser && (
                  <Button onClick={onEdit} color="white" width="6.5rem">
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div>
            <Divider>
              {printWhen(orgNameJSX, !!user?.name)}
              {printWhen(userFullNameJSX, !!user?.first_name || !!user?.last_name)}
              {printWhen(usernameJSX, !!user?.username)}
              <div className="hidden md:block">
                {printWhen(openToWorkToggleJSX, profileBelongToCurrentUser)}
                {printWhen(openToVolunteerToggleJSX, profileBelongToCurrentUser)}
              </div>
            </Divider>
            <div className="md:hidden">
              {printWhen(openToWorkToggleJSX, profileBelongToCurrentUser)}
              {printWhen(openToVolunteerToggleJSX, profileBelongToCurrentUser)}
            </div>
            <Divider>
              <div className={css.achievements} onClick={gotToDesktopAchievement}>
                <div className="flex gap-1">
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
        </div>
      </TwoColumns>
      <ConnectModal
        open={openConnectModal}
        onClose={() => setOpenConnectModal(false)}
        onSend={() => {
          onConnect(user.id);
          setOpenConnectModal(false);
        }}
        onMessage={onMessage}
      />
    </div>
  );
};

export default ProfileUser;
