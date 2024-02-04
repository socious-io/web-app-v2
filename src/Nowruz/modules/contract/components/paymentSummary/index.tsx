import { Divider, Typography } from '@mui/material';
import React from 'react';

import css from './paymentSummary.module.scss';

export interface PaymentSummaryProps {
  amount: number;
  sociousFee: number;
  stripeFee: number;
  total: number;
  currency: string;
}
export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ amount, sociousFee, stripeFee, total, currency }) => {
  const sociousPercent = Math.round((sociousFee / amount) * 100) / 100;
  const stripePercent = Math.round((stripeFee / amount) * 100) / 100;
  const symbol = currency === 'JPY' ? '¥' : '$';
  const renderItems = (title: string, value: number) => {
    return (
      <div className="flex justify-between">
        <Typography variant="caption" className="text-Gray-light-mode-700">
          {title}
        </Typography>
        <Typography variant="h6" className="text-Gray-light-mode-700">
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
        {renderItems('Job payment', amount)}
        {renderItems(`Socious commission (${sociousPercent}%)`, sociousFee)}
        {renderItems(`Stripe fees (${stripePercent}%)`, stripeFee)}
      </div>
      <Divider />
      <div className="flex justify-between">
        <Typography variant="caption" className="text-Gray-light-mode-700">
          Total payment
        </Typography>
        <span className={css.sum}>{`${symbol}${total} ${currency}`}</span>
      </div>
    </div>
  );
};
