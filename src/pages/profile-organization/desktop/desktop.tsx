import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import css from './desktop.module.scss';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { printWhen } from 'src/core/utils';
import { Divider } from 'src/components/templates/divider/divider';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { IdentityReq } from 'src/core/types';
import { ProfileReq } from '../profile-organization.types';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Button } from 'src/components/atoms/button/button';
import { ThreeDotsButton } from 'src/components/atoms/three-dots-button/three-dots-button';
import { badgesList, showActions } from '../profile-organization.services';
import { ImpactBadge } from 'src/components/atoms/impact-badge/impact-badge';

export const Desktop = (): JSX.Element => {
  const { user, badges } = useMatch().data as { user: ProfileReq; badges: { badges: unknown[] } };
  const socialCauses = socialCausesToCategory(user.social_causes);
  const navigate = useNavigate();
  const skills = skillsToCategory(user.skills);

  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const profileBelongToCurrentUser = currentIdentity?.id === user.id;

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
    <Button onClick={() => navigate({ to: '../edit' })} color="white" width="6.5rem">
      Edit
    </Button>
  );

  const orgNameJSX = <div className={css.name}>{user?.name}</div>;
  const usernameJSX = <div className={css.username}>@{user?.username}</div>;

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
      <div className={css.contactData}>{user.city}</div>
    </div>
  );

  function onClose() {
    navigate({ to: '/jobs' });
  }

  function onAchievementClick() {
    const connectId = user.proofspace_connect_id ? user.proofspace_connect_id : null;
    navigate({ to: `/achievements?proofspace_connect_id=${connectId}` });
  }

  return (
    <TwoColumnCursor>
      <div className={css.sidebar}>
        <Card cursor="pointer" onClick={() => history.back()}>
          <div className={css.back}>
            <img src="/icons/chevron-left.svg" />
            <div>Jobs</div>
          </div>
        </Card>
      </div>
      <Card className={css.card} padding={0}>
        <div className={css.container}>
          <div className={css.header}>
            <div style={{ backgroundImage: `url(${user.cover_image?.url})` }} className={css.cover}>
              <div className={css.avatarContainer}>
                <Avatar img={user.image?.url} size="8rem" type="users" />
              </div>
            </div>
            <div className={css.menu}>
              <div className={css.btnContainer}>
                {/* <Button width="6.5rem">Connect</Button> */}
                {/* {printWhen(editButtonJSX, profileBelongToCurrentUser)} */}
                {printWhen(<ThreeDotsButton onClick={() => showActions(user.id)} />, !profileBelongToCurrentUser)}
              </div>
              <div className={css.userConnections}>
                <div>{user.followings} connections</div>
                <div>{user.followers} Followers</div>
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
              <div className={css.achievements} onClick={onAchievementClick}>
                <div className={css.badges}>
                  {badgesList(badges.badges).map((item) => {
                    return <ImpactBadge key={item.color} size="2.75rem" {...item} />;
                  })}
                </div>
                <div className={css.achievementsLink}>Achievements</div>
              </div>
            </Divider>

            {printWhen(bioJSX, !!user.bio)}
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
              <Divider title="Mission">
                <div className={css.mission}>{user.mission}</div>
              </Divider>,
              !!user.mission
            )}
            {printWhen(
              <Divider title="Culture">
                <div className={css.culture}>{user.culture}</div>
              </Divider>,
              !!user.culture
            )}
          </div>
        </div>
      </Card>
    </TwoColumnCursor>
  );
};
