import React from 'react';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Offer } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';

interface AcceptOfferDetailProps {
  offer: Offer;
}
export const AcceptOfferDetail: React.FC<AcceptOfferDetailProps> = ({ offer }) => {
  const renderDetailItems = (iconName: string, title: string, subtitle?: string) => {
    return (
      <div className="flex gap-1.5">
        <Icon name={iconName} fontSize={20} className="text-Gray-light-mode-500" />
        <span className="font-medium text-base leading-6 text-Gray-light-mode-700">{title}</span>
        {subtitle && <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{subtitle}</span>}
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-6 py-4">
      <ExpandableText text={offer.offer_message} isMarkdown expectedLength={700} />
      {(offer.due_date || offer.total_hours || offer.assignment_total) && (
        <div className="flex flex-col p-5 gap-5 border border-solid border-Gray-light-mode-200 rounded-default">
          {offer.due_date && renderDetailItems('calendar-check-01', `Due ${offer.due_date || ''}`)}
          {offer.total_hours && renderDetailItems('clock', `${offer.total_hours} hours`)}
          {offer.assignment_total &&
            renderDetailItems(
              offer.currency === 'JPY' ? 'currency-yen-circle' : 'currency-dollar-circle',
              offer.assignment_total.toString(),
              '(fixed-price)',
            )}
        </div>
      )}
    </div>
  );
};
