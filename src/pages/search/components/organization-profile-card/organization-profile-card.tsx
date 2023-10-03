import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Divider } from 'src/components/templates/divider/divider';
import { printWhen } from 'src/core/utils';

import css from './organization-profile-card.module.scss';

const OrganizationProfileCard = ({ organization }) => {
  const navigate = useNavigate();

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
    <Card className={css.card} padding={0}>
      <div className={css.container}>
        <div className={css.header}>
          <div style={{ backgroundImage: `url(${organization.cover_image?.url})` }} className={css.cover}>
            <div className={css.avatarContainer}>
              <Avatar img={organization.image?.url} size="8rem" type="organizations" />
            </div>
          </div>
          <div className={css.menu}>
            <div className={css.btnContainer}></div>
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

          <Divider title="Contact">
            {printWhen(contactLinkJSX, !!organization.mobile_country_code)}
            {printWhen(emailLinkJSX, !!organization.email)}
            {printWhen(websiteLinkJSX, !!organization.website)}
          </Divider>
          {printWhen(missionJSX, !!organization.mission)}
          {printWhen(cultureJSX, !!organization.culture)}
        </div>
      </div>
    </Card>
  );
};

export default OrganizationProfileCard;
