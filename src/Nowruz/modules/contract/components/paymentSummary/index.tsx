import { Divider, Typography } from '@mui/material';
import React from 'react';

import css from './paymentSummary.module.scss';

export interface PaymentSummaryProps {
  offerAmount: number;
  currency: string;
}
export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ offerAmount, currency }) => {
  const sociousFees = Math.round(offerAmount * 2) / 100;
  const stripeFees = Math.round(offerAmount * 3.6) / 100;
  const total = offerAmount + sociousFees + stripeFees;
  const symbol = currency === 'JPY' ? '¥' : '$';
  const renderItems = (title: string, value: number) => {
    return (
      <div className="flex justify-between">
        <Typography variant="caption" className="text-Gray-light-mode-700">
          {title}
        </Typography>
        <Typography variant="h6" className="text-Gray-light-mode-700">
          {/* <Icon name={currencyIconName} fontSize={} */}
          {`${symbol}${value.toLocaleString()} ${currency}`}
        </Typography>
      </div>
    );
  };
  return (
    <div className={css.container}>
      <h1 className={css.title}>Payment summary</h1>
      <Divider />
      <div className="flex flex-col gap-2">
        {renderItems('Job payment', offerAmount)}
        {renderItems('Socious commission (2%)', sociousFees)}
        {renderItems('Stripe fees (3,6%)', stripeFees)}
      </div>
      <Divider />
      <div className="flex justify-between">
        <Typography variant="caption" className="text-Gray-light-mode-700">
          Total payment
        </Typography>
        <span className={css.sum}>{`${symbol}${total.toLocaleString()} ${currency}`}</span>
      </div>
    </div>
  );
};
