import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { setApplicantStatusLabel } from 'src/constants/APPLICANT_STATUS';
import { toRelativeTime } from 'src/core/relative-time';
import { Icon } from 'src/Nowruz/general/Icon';

import { ContractCardProps } from './contractCard.types';
import { useContractCard } from './useContractCard';
import { Avatar } from '../../general/components/avatar/avatar';
import { Chip } from '../../general/components/Chip';

export const ContractCard: React.FC<ContractCardProps> = ({ offer, type }) => {
  const name = type === 'users' ? offer.recipient.meta.name : offer.offerer.meta.name;
  const profileImageUrl = type === 'users' ? offer.recipient.meta.avatar : offer.offerer.meta.image;

  const { theme, startIcon } = useContractCard(offer);

  return (
    <div className="flex flex-col gap-5 border border-solid border-Gray-light-mode-200 rounded-default py-5 px-6">
      <div className="flex gap-4 ">
        <Avatar size="56px" type={type} img={profileImageUrl} />
        <div className="flex flex-col">
          <span className="font-semibold text-lg leading-7 text-Gray-light-mode-900">{offer.project.title}</span>
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{`${name} . ${toRelativeTime(
            offer.created_at.toString(),
          )}`}</span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Icon name="currency-dollar-circle" fontSize={20} color={variables.color_grey_500} />
        <span className="font-medium text-base leading-6 text-Gray-light-mode-700">{`${offer.assignment_total} ${offer.currency}`}</span>
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{`(Fixed-price)`}</span>
        <div className="mr-0 ml-auto">
          <Chip
            label={setApplicantStatusLabel(offer.status)}
            startIcon={startIcon}
            theme={theme}
            shape="round"
            size="sm"
            transparent
          />
        </div>
      </div>
    </div>
  );
};
