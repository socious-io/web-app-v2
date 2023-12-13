import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './job-info.module.scss';
import { JobInfoCardProps } from './jobInfoCard.types';
export const JobInfoCard: React.FC<JobInfoCardProps> = ({ payload }) => {
  const { location, remotePreference, jobType, jobLength, experienceLevel, minPayment, maxPayment, isCryptoPayment } =
    payload;
  return (
    <div className={css.jobCard}>
      <div className={css.item}>
        <Icon name="marker-pin-01" fontSize={20} className="mr-1.5" /> <span>{location}</span>
        <Icon name="mouse" fontSize={20} className="ml-4 mr-1.5" /> <span>{remotePreference}</span>
      </div>
      <div className={css.item}>
        <Icon name="calendar" fontSize={20} className="mr-1.5" /> <span>{jobType}</span>
        <Icon name="hourglass-03" fontSize={20} className="ml-4 mr-1.5" /> <span>{jobLength}</span>
      </div>
      <div className={css.item}>
        <Icon name="target-02" fontSize={20} className="mr-1.5" /> <span>{experienceLevel}</span>
      </div>
      <div className={css.item}>
        <Icon name="currency-dollar-circle" fontSize={20} className="mr-1.5" />
        <span>
          {minPayment}~{maxPayment} USD
        </span>
      </div>
      {isCryptoPayment && (
        <div className={css.item}>
          <Icon name="cryptocurrency-01" fontSize={20} className="mr-1.5" /> <span>Payment in Crypto OK</span>
        </div>
      )}
    </div>
  );
};
