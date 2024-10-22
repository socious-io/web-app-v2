import React from 'react';
import { toRelativeTime } from 'src/core/relative-time';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Chip } from 'src/modules/general/components/Chip';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import { ContractCardProps } from './contractCard.types';
import { useContractCard } from './useContractCard';

export const ContractCard: React.FC<ContractCardProps> = ({ contract }) => {
  const {
    type,
    badge,
    name,
    profileImageUrl,
    currencyIconName,
    formatCurrency,
    contractVal,
    handleOpenOverlayModal,
    contractCurrency,
  } = useContractCard(contract);
  return (
    <>
      <div
        tabIndex={0}
        className="flex flex-col gap-5 border border-solid border-Gray-light-mode-200 rounded-default py-5 px-6 cursor-pointer"
        onClick={handleOpenOverlayModal}
      >
        <div className="flex gap-4 ">
          <Avatar size="56px" type={type === 'users' ? 'organizations' : 'users'} img={profileImageUrl} />
          <div className="flex flex-col">
            <span className="font-semibold text-lg leading-7 text-Gray-light-mode-900">
              {contractVal.project.title}
            </span>
            <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{`${name}・${toRelativeTime(
              contractVal.created_at.toString(),
            )}`}</span>
          </div>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {formatCurrency ? (
            <div className="flex gap-2 items-center">
              {['USD', 'JPY'].includes(contractCurrency) ? (
                <Icon name={currencyIconName || ''} fontSize={20} color={variables.color_grey_500} />
              ) : (
                contractCurrency && (
                  <img
                    src={`/icons/crypto/${contractVal?.currency?.toString()}.svg`}
                    width={20}
                    alt={`${contractCurrency}`}
                  />
                )
              )}

              <span className="font-medium text-base leading-6 text-Gray-light-mode-700">
                {formatCurrency} {`${contractCurrency}`}
              </span>
              <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{`(Fixed-price)`}</span>
            </div>
          ) : contract.project.payment_type === 'VOLUNTEER' ? (
            <div className="flex gap-1.5">
              <Icon name="heart-filled" fontSize={20} className="text-Burgundy-600" />
              <span className="font-medium text-base leading-6 text-Gray-light-mode-700">Volunteer</span>
            </div>
          ) : (
            ''
          )}
          <div className="md:mr-0 md:ml-auto w-fit">
            <Chip
              label={contract.contractStatus}
              startIcon={badge?.icon || ''}
              theme={badge?.theme || 'secondary'}
              shape="round"
              size="sm"
              transparent
            />
          </div>
        </div>
      </div>
    </>
  );
};
