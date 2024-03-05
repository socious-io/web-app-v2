import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Contract } from 'src/core/api';
import dapp from 'src/dapp';
import { Icon } from 'src/Nowruz/general/Icon';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';

interface ContractDetailTabProps {
  contract: Contract;
}
export const ContractDetailTab: React.FC<ContractDetailTabProps> = ({ contract }) => {
  let unit = contract.currency;
  if (!unit && contract.crypto_currency_address) {
    dapp.NETWORKS.map((n) => {
      const token = n.tokens.filter((t) => contract.crypto_currency_address === t.address)[0];
      if (token) unit = token.symbol;
    });
  }

  const currencyIcon =
    contract.payment_mode === 'CRYPTO'
      ? ''
      : contract.currency === 'JPY'
        ? 'currency-yen-circle'
        : 'currency-dollar-circle';
  const renderDetailItems = (iconName: string, title: string, subtitle?: string) => {
    return (
      <div className="flex gap-1.5">
        {iconName && <Icon name={iconName} fontSize={20} color={variables.color_grey_500} />}
        <span className="font-medium text-base leading-6 text-Gray-light-mode-700">{title}</span>
        {subtitle && <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{subtitle}</span>}
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-6 py-4">
      <ExpandableText text={contract.offer_message} isMarkdown expectedLength={700} />
      {(contract.due_date || contract.total_hours || contract.assignment_total) && (
        <div className="flex flex-col p-5 gap-5 border border-solid border-Gray-light-mode-200 rounded-default">
          {contract.due_date ? renderDetailItems('calendar-check-01', `Due ${contract.due_date || ''}`) : ''}
          {contract.total_hours
            ? renderDetailItems('clock', `${contract.total_hours} ${contract.total_hours === 1 ? 'hour' : 'hours'}`)
            : ''}
          {contract.assignment_total
            ? renderDetailItems(currencyIcon, `${contract.assignment_total.toString()} ${unit}`, '(fixed-price)')
            : ''}
          {contract.project.payment_type === 'VOLUNTEER' ? (
            <div className="flex gap-1.5">
              <img src="/icons/nowruz/red-heart.svg" alt="" />
              <span className="font-medium text-base leading-6 text-Gray-light-mode-700">Volunteer</span>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};
