import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { toRelativeTime } from 'src/core/relative-time';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';

import { ContractCardProps } from './contractCard.types';
import { useContractCard } from './useContractCard';

export const ContractCard: React.FC<ContractCardProps> = ({ offer, mission }) => {
  const { type, badge, name, profileImageUrl, currencyIconName } = useContractCard(offer, mission);

  return (
    <div className="flex flex-col gap-5 border border-solid border-Gray-light-mode-200 rounded-default py-5 px-6">
      <div className="flex gap-4 ">
        <Avatar size="56px" type={type || 'users'} img={profileImageUrl} />
        <div className="flex flex-col">
          <span className="font-semibold text-lg leading-7 text-Gray-light-mode-900">{offer.project.title}</span>
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{`${name} . ${toRelativeTime(
            offer.created_at.toString(),
          )}`}</span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Icon name={currencyIconName} fontSize={20} color={variables.color_grey_500} />
        <span className="font-medium text-base leading-6 text-Gray-light-mode-700">{`${offer.assignment_total} ${offer.currency}`}</span>
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{`(Fixed-price)`}</span>
        <div className="mr-0 ml-auto">
          <Chip
            label={badge?.label || ''}
            startIcon={badge?.icon || ''}
            theme={badge?.theme || 'secondary'}
            shape="round"
            size="sm"
            transparent
          />
        </div>
      </div>
    </div>
  );
};
