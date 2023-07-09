import { Card } from 'src/components/atoms/card/card';
import css from './user-profile-card.module.scss';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { printWhen } from 'src/core/utils';
import { Divider } from 'src/components/templates/divider/divider';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Button } from 'src/components/atoms/button/button';
import { UserProfileCardProps } from './user-profile-card.types';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { ConnectStatus, IdentityReq } from 'src/core/types';
import { useState } from 'react';

function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
  if (shortname && COUNTRIES_DICT[shortname]) {
    return COUNTRIES_DICT[shortname];
  } else {
    return shortname;
  }
}

export const UserProfileCard = (props: UserProfileCardProps): JSX.Element => {
  const { user } = props;
  const address = `${user.city}, ${getCountryName(user.country as keyof typeof COUNTRIES_DICT | undefined)}`;
  const socialCauses = socialCausesToCategory(user.social_causes);
  const avatarImage = user.avatar?.url ? user.avatar?.url : user.image?.url;
  const skills = skillsToCategory(user.skills);
  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const profileBelongToCurrentUser = currentIdentity?.id === user.id;
  const [following, setFollowing] = useState<boolean>();
  const [connectStatus, setConnectStatus] = useState<ConnectStatus | undefined>(undefined);
  const [message, setMessage] = useState('please connect to me');

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

  const orgNameJSX = <div className={css.name}>{user?.name}</div>;
  const usernameJSX = <div className={css.username}>@{user?.username}</div>;

  //   const connectJSX = (
  //     <Button
  //       width="8.5rem"
  //       onClick={() => setOpenConnectModal(true)}
  //       disabled={connectStatus === 'PENDING'}
  //       color={connectStatus === 'PENDING' ? 'white' : 'blue'}
  //     >
  //       {connectStatus === 'PENDING' ? 'Request sent' : 'Connect'}
  //     </Button>
  //   );

  //   const messageJSX = (
  //     <div
  //       className={css.message}
  //       onClick={() =>
  //         navigate({
  //           to: `/chats/new/${user?.id}`,
  //         })
  //       }
  //     >
  //       <img src="/icons/message-blue.svg" />
  //     </div>
  //   );
  return (
    <Card className={css.card} padding={0}>
      <div className={css.header}>
        <div style={{ backgroundImage: `url(${user.cover_image?.url})` }} className={css.cover}>
          <div className={css.avatarContainer}>
            <Avatar img={avatarImage} size="8rem" type="users" />
          </div>
        </div>
        <div className={css.menu}>
          <div className={css.btnContainer}>
            {/* {printWhen(messageJSX, !profileBelongToCurrentUser && showMessageIcon())} */}
            {/* {printWhen(connectJSX, !profileBelongToCurrentUser && connectStatus !== 'CONNECTED')} */}
            {/* {printWhen(editButtonJSX, profileBelongToCurrentUser)} */}
          </div>
        </div>
      </div>
      <div>
        <Divider>
          {printWhen(orgNameJSX, !!user?.name)}
          {printWhen(userFullNameJSX, !!user?.first_name || !!user?.last_name)}
          {printWhen(usernameJSX, !!user?.username)}
        </Divider>
        {/* <Divider>
          <div className={css.achievements} onClick={gotToDesktopAchievement}>
            <div className={css.badges}>
              {badgesList(badges.badges).map((item) => {
                return <ImpactBadge key={item.color} size="2.75rem" {...item} />;
              })}
            </div>
            <div className={css.achievementsLink}>Achievements</div>
          </div>
        </Divider> */}

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
    </Card>
  );
};
