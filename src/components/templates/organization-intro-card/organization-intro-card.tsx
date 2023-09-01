import React from 'react';
import { Card } from 'src/components/atoms/card/card';
import { OrganizationIntroCardProps } from './organization-intro-card.types';
import css from './organization-intro-card.module.scss';
import { Avatar } from 'src/components/atoms/avatar/avatar';
export const OrganizationIntroCard = ({
  customStyle,
  title,
  description,
  logo,
  impact,
  link,
}: OrganizationIntroCardProps) => {
  return (
    <Card className={`${css.job} ${customStyle}`}>
      <Avatar type="organizations" img={logo} size="6rem" customStyle={css.avatar} />
      <h1 className={css.title}>{title}</h1>
      <div className={css.link}>
        <a href={link.url}>{link.label}</a>
      </div>
      <div className={css.description}>{description}</div>
      <div className={css.footer}>
        <span className={css.following}>following {impact.following}</span>
        <span className={css.followers}>followers {impact.followers}</span>
      </div>
    </Card>
  );
};
