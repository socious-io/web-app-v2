import css from './mobile.module.scss';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { ThreeDotsButton } from '../../../components/atoms/three-dots-button/three-dots-button';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Divider } from '../../../components/templates/divider/divider';
import { ProfileReq } from '../profile.types';
import { CategoriesClickable } from '../../../components/atoms/categories-clickable/categories-clickable';
import { socialCausesToCategory } from '../../../core/adaptors';
import { printWhen } from '../../../core/utils';

export const Mobile = (): JSX.Element => {
  const data = useMatch().ownData as ProfileReq;
  const socialCauses = socialCausesToCategory(data.social_causes);
  const navigate = useNavigate();
  const avatarImage = data.avatar?.url ? data.avatar?.url : data.image?.url;

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
            <ThreeDotsButton onClick={console.log} />
          </div>
          <div className={css.userConnections}>
            <div>{data.followings} connections</div>
            <div>{data.followers} Followers</div>
          </div>
        </div>
      </div>
      <div>
        <>
          <Divider>
            <div className={css.bio}>{data.bio}</div>
          </Divider>
          <Divider title="Social Causes">
            <CategoriesClickable list={socialCauses} />
          </Divider>
          <Divider title="Contact">
            <>
              {printWhen(contactLinkJSX, !!data.mobile_country_code)}
              {printWhen(emailLinkJSX, !!data.email)}
              {printWhen(websiteLinkJSX, !!data.website)}
              {printWhen(cityLinkJSX, !!data.city)}
            </>
          </Divider>
          {printWhen(
            <Divider title="Mission">
              <div className={css.mission}>{data.mission}</div>
            </Divider>,
            !!data.mission
          )}
          {printWhen(
            <Divider title="Culture">
              <div className={css.culture}>{data.culture}</div>
            </Divider>,
            !!data.culture
          )}
        </>
      </div>
    </div>
  );
};
