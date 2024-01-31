import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './job-info.module.scss';
import { JobInfoCardProps } from './jobInfoCard.types';

export const JobInfoCard: React.FC<JobInfoCardProps> = ({ payload }) => {
  const {
    country,
    city,
    remotePreference,
    jobType,
    jobLength,
    experienceLevel,
    minPayment,
    maxPayment,
    isCryptoPayment,
    paymentType,
  } = payload;
  const renderItem = (icon: string, name: string) => {
    return (
      <div className="flex">
        <Icon name={icon} fontSize={20} className="mr-1.5" color={variables.color_grey_500} />
        <span color={variables.color_grey_500}>{name}</span>
      </div>
    );
  };

  const renderLocation = () => {
    return (
      <div className="flex">
        {city === 'Anywhere' ? (
          <img src="/icons/nowruz/earth.svg" alt="" />
        ) : (
          <Icon name="marker-pin-01" fontSize={20} className="mr-1.5" color={variables.color_grey_500} />
        )}
        <span color={variables.color_grey_500}>{city}</span>
      </div>
    );
  };
  const items = [
    { icon: remotePreference ? 'mouse' : '', title: remotePreference },
    { icon: jobType ? 'calendar' : '', title: jobType },
    { icon: jobLength ? 'hourglass-03' : '', title: jobLength },
    { icon: experienceLevel ? 'target-02' : '', title: experienceLevel },
  ];
  const item =
    paymentType === 'Volunteer'
      ? { icon: 'heart', title: 'Volunteer' }
      : minPayment && maxPayment
        ? { icon: 'currency-dollar-circle', title: `${minPayment}~${maxPayment} USD` }
        : {};
  items.push(item);
  return (
    <div className={css.jobCard}>
      {city && renderLocation()}
      {items.map((item) => renderItem(item.icon, item.title))}
      {/* {isCryptoPayment && (
        <div className={css.item}>
          <Icon name="cryptocurrency-01" fontSize={20} className="mr-1.5" /> <span>Payment in Crypto OK</span>
        </div>
      )} */}
    </div>
  );
};
