import React from 'react';
import css from './job-intro-card.module.scss';
import { Card } from 'src/components/atoms/card/card';
import { JobIntoCardProps } from './job-intro-card.types';

export const JobIntroCard = ({ title, description, icon, link, footer, customStyle = '' }: JobIntoCardProps) => {
  return (
    <Card className={`${css.job} ${customStyle}`}>
      <div>
        <a className={css.title} href={link} target="_blank" rel="noreferrer">
          {title}
        </a>
      </div>
      <div className={css.description}>
        <img src={icon} alt="applicant-logo" className={css.descriptionIcon} />
        <span> {description} </span>
      </div>
      <div className={css.footer}>{footer}</div>
    </Card>
  );
};
