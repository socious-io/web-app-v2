import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './job-info.module.scss';
import { JobInfoCardProps } from './jobInfoCard.types';
export const JobInfoCard: React.FC<JobInfoCardProps> = ({ payload }) => {
  const { location, remotePreference, jobType, jobLength, experienceLevel, minPayment, maxPayment, isCryptoPayment } =
    payload;
  const renderItem = (icon: string, name: string) => {
    return (
      <div className="flex">
        <Icon name={icon} fontSize={20} className="mr-1.5" color={variables.color_grey_500} />
        <span color={variables.color_grey_500}>{name}</span>
      </div>
    );
  };
  const items = [
    { icon: 'marker-pin-01', title: location },
    { icon: 'mouse', title: remotePreference },
    { icon: 'calendar', title: jobType },
    { icon: 'hourglass-03', title: jobLength },
    { icon: 'target-02', title: experienceLevel },
    { icon: 'currency-dollar-circle', title: `${minPayment}~${maxPayment} USD` },
  ];
  return (
    <div className={css.jobCard}>
      {items.map((item) => renderItem(item.icon, item.title))}
      {/* {isCryptoPayment && (
        <div className={css.item}>
          <Icon name="cryptocurrency-01" fontSize={20} className="mr-1.5" /> <span>Payment in Crypto OK</span>
        </div>
      )} */}
    </div>
  );
};
