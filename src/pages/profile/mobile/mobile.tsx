import css from './mobile.module.scss';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { ThreeDotsButton } from '../../../components/atoms/three-dots-button/three-dots-button';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Divider } from '../../../components/templates/divider/divider';
import { ProfileReq } from '../profile.types';
import { CategoriesClickable } from '../../../components/atoms/categories-clickable/categories-clickable';
import { skillsToCategory, socialCausesToCategory } from '../../../core/adaptors';
import { printWhen } from '../../../core/utils';
import { Link } from '../../../components/atoms/link/link';
import { showActions } from '../profile.services';
import { useSelector } from 'react-redux';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { Button } from 'src/components/atoms/button/button';

export const Mobile = (): JSX.Element => {
  const data = useMatch().data.profile as ProfileReq;
  const socialCauses = socialCausesToCategory(data.social_causes);
  const skills = skillsToCategory(data.skills);
  const navigate = useNavigate();
  const avatarImage = data.avatar?.url ? data.avatar?.url : data.image?.url;

  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const profileBelongToCurrentUser = currentIdentity?.id === data.id;

  function onClose() {
    navigate({ to: '/jobs' });
  }

  const cityLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/pin-green.svg" />
      <div className={css.contactData}>{data.city}</div>
    </div>
  );

  const contactLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/phone-green.svg" />
      <a href={`tel:${data.mobile_country_code}${data.phone}`} className={css.contactData}>
        {data.mobile_country_code} {data.phone}
      </a>
    </div>
  );

  const emailLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/email-green.svg" />
      <a href={`mailto:${data.email}`} className={css.contactData}>
        {data.email}
      </a>
    </div>
  );

  const websiteLinkJSX = (
    <div className={css.contactItem}>
      <img height={22} src="/icons/email-green.svg" />
      <a href={`mailto:${data.email}`} className={css.contactData}>
        {data.email}
      </a>
    </div>
  );

  const bioJSX = (
    <Divider>
      <div className={css.bio}>{data.bio}</div>
    </Divider>
  );

  const userFullNameJSX = (
    <div className={css.name}>
      {data?.first_name} {data?.last_name}
    </div>
  );

  const missionJSX = (
    <Divider title="Mission">
      <div className={css.mission}>{data.mission}</div>
    </Divider>
  );

  const cultureJSX = (
    <Divider title="Culture">
      <div className={css.culture}>{data.culture}</div>
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

  const orgNameJSX = <div className={css.name}>{data?.name}</div>;
  const usernameJSX = <div className={css.username}>@{data?.username}</div>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div onClick={onClose} className={css.close}>
          <img src="/icons/close-black.svg" />
        </div>
        <div style={{ backgroundImage: `url(${data.cover_image?.url})` }} className={css.cover}>
          <div className={css.avatarContainer}>
            <Avatar img={avatarImage} size="8rem" type="users" />
          </div>
        </div>
        <div className={css.menu}>
          <div className={css.btnContainer}>
            {/* <Button width="6.5rem">Connect</Button> */}
            {printWhen(editButtonJSX, profileBelongToCurrentUser)}
            {printWhen(<ThreeDotsButton onClick={() => showActions(data.id)} />, !profileBelongToCurrentUser)}
          </div>
          <div className={css.userConnections}>
            <div>{data.followings} connections</div>
            <div>{data.followers} Followers</div>
          </div>
        </div>
      </div>
      <div>
        <Divider>
          {printWhen(orgNameJSX, !!data?.name)}
          {printWhen(userFullNameJSX, !!data?.first_name || !!data?.last_name)}
          {printWhen(usernameJSX, !!data?.username)}
        </Divider>
        <Divider>
          <div className={css.achievements}>
            <Link onClick={() => navigate({ to: '/achievements' })}>Impact points: {data.impact_points}</Link>
          </div>
        </Divider>

        {printWhen(bioJSX, !!data.bio)}
        <Divider title="Social Causes">
          <CategoriesClickable list={socialCauses} />
        </Divider>
        <Divider title="Contact">
          {printWhen(contactLinkJSX, !!data.mobile_country_code)}
          {printWhen(emailLinkJSX, !!data.email)}
          {printWhen(websiteLinkJSX, !!data.website)}
          {printWhen(cityLinkJSX, !!data.city)}
        </Divider>
        {printWhen(missionJSX, !!data.mission)}
        {printWhen(cultureJSX, !!data.culture)}
        {printWhen(skillsJSX, data.skills && data.skills.length > 0)}
      </div>
    </div>
  );
};
