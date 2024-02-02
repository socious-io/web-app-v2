import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { toRelativeTime } from 'src/core/relative-time';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { Overlay } from 'src/Nowruz/modules/general/components/slideoutMenu';

import { ContractCardProps } from './contractCard.types';
import { useContractCard } from './useContractCard';
import { AcceptOffer } from '../acceptOffer';
import { CompleteJob } from '../completeJob';
import { ContractDetailsDefault } from '../contractDetailsDefault';

export const ContractCard: React.FC<ContractCardProps> = ({ offer, mission }) => {
  const {
    type,
    badge,
    name,
    profileImageUrl,
    currencyIconName,
    openAcceptModal,
    offerVal,
    missionVal,
    openCompleteModal,
    openDefaultModal,
    handleOpenModal,
    handleCloseModal,
  } = useContractCard(offer, mission);

  return (
    <>
      <div
        tabIndex={0}
        className="flex flex-col gap-5 border border-solid border-Gray-light-mode-200 rounded-default py-5 px-6 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="flex gap-4 ">
          <Avatar size="56px" type={type || 'users'} img={profileImageUrl} />
          <div className="flex flex-col">
            <span className="font-semibold text-lg leading-7 text-Gray-light-mode-900">{offerVal.project.title}</span>
            <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{`${name} . ${toRelativeTime(
              offerVal.created_at.toString(),
            )}`}</span>
          </div>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex gap-2 items-center">
            <Icon name={currencyIconName} fontSize={20} color={variables.color_grey_500} />
            <span className="font-medium text-base leading-6 text-Gray-light-mode-700">{`${offerVal.assignment_total} ${offerVal.currency}`}</span>
            <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{`(Fixed-price)`}</span>
          </div>
          <div className="md:mr-0 md:ml-auto w-fit">
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

      <Overlay open={openAcceptModal} onClose={handleCloseModal}>
        <AcceptOffer offer={offerVal} />
      </Overlay>
      <Overlay open={openCompleteModal} onClose={handleCloseModal}>
        <CompleteJob offer={offerVal} mission={missionVal} />
      </Overlay>
      <Overlay open={openDefaultModal} onClose={handleCloseModal}>
        <ContractDetailsDefault offer={offerVal} />
      </Overlay>
    </>
  );
};
