import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { ThreeDotsButton } from 'src/components/atoms/three-dots-button/three-dots-button';
import { Divider } from 'src/components/templates/divider/divider';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Button } from 'src/components/atoms/button/button';
import { ImpactBadge } from 'src/components/atoms/impact-badge/impact-badge';
import { ConnectModal } from 'src/pages/profile-organization/connect-modal';
import { badgesList, showActions } from '../profile-user.services';
import { printWhen } from 'src/core/utils';
import { useProfileUserShared } from '../profile-user.shared';
import css from './mobile.module.scss';
import { AuthGuard } from 'src/core/auth-guard/auth-guard';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    user,
    address,
    badges,
    socialCauses,
    avatarImage,
    skills,
    navigateToEdit,
    profileBelongToCurrentUser,
    onClose,
    gotToMobileAchievement,
    onConnect,
    connectStatus,
    showMessageIcon,
    onMessage,
  } = useProfileUserShared();
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
    <Button onClick={navigateToEdit} color="white" className="w6-5">
      Edit
    </Button>
  );

  const orgNameJSX = <div className={css.name}>{user?.name}</div>;
  const usernameJSX = <div className={css.username}>@{user?.username}</div>;

  const connectJSX = (
    <Button
      className="w8-5"
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
    <div className={css.container}>
      <div className={css.header}>
        <div onClick={onClose} className={css.close}>
          <img src="/icons/close-black.svg" />
        </div>
        <div style={{ backgroundImage: `url(${user.cover_image?.url})` }} className={css.cover}>
          <div className={css.avatarContainer}>
            <Avatar img={avatarImage} size="8rem" type="users" />
          </div>
        </div>
        <div className={css.menu}>
          <div className={css.btnContainer}>
            {printWhen(messageJSX, !profileBelongToCurrentUser && showMessageIcon())}
            <AuthGuard>{printWhen(connectJSX, !profileBelongToCurrentUser && connectStatus !== 'CONNECTED')}</AuthGuard>
            {printWhen(editButtonJSX, profileBelongToCurrentUser)}
            <AuthGuard>
              {printWhen(<ThreeDotsButton onClick={() => showActions(user.id)} />, !profileBelongToCurrentUser)}
            </AuthGuard>
          </div>
        </div>
      </div>
      <div>
        <Divider>
          {printWhen(orgNameJSX, !!user?.name)}
          {printWhen(userFullNameJSX, !!user?.first_name || !!user?.last_name)}
          {printWhen(usernameJSX, !!user?.username)}
        </Divider>
        <Divider>
          <div className={css.achievements} onClick={gotToMobileAchievement}>
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
