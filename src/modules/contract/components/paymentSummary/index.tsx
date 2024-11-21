import { Divider, Typography } from '@mui/material';
import React from 'react';
import { translate } from 'src/core/utils';

import css from './paymentSummary.module.scss';

export interface PaymentSummaryProps {
  amount: number;
  sociousFee: number;
  stripeFee: number;
  total: number;
  currency: string;
  hasFeeDiscount: boolean;
}
export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  amount,
  sociousFee,
  stripeFee,
  total,
  currency,
  hasFeeDiscount,
}) => {
  const originalSociousFee = hasFeeDiscount ? sociousFee * 2 : sociousFee;
  const sociousPercent = Math.trunc((originalSociousFee / amount) * 1000) / 10;
  const stripePercent = Math.trunc((stripeFee / amount) * 1000) / 10;
  const symbol = currency === 'JPY' ? '¥' : currency === 'USD' ? '$' : '';

  const renderItems = (title: string, value: number, colorClassName?: string) => {
    return (
      <div className="flex justify-between">
        <Typography variant="caption" className={colorClassName || 'text-Gray-light-mode-700'}>
          {title}
        </Typography>
        <Typography variant="h6" className={colorClassName || 'text-Gray-light-mode-700'}>
          {`${symbol}${value.toLocaleString()} ${currency}`}
        </Typography>
      </div>
    );
  };
  return (
    <div className={css.container}>
      <h1 className={css.title}>{translate('cont-payment-summary')}</h1>
      <Divider />
      <div className="flex flex-col gap-2">
        {amount ? renderItems(translate('cont-job-payment'), amount) : ''}
        {sociousFee
          ? renderItems(translate('cont-socious-fee', { sociousPercent: sociousPercent }), originalSociousFee)
          : ''}
        {sociousFee &&
          hasFeeDiscount &&
          renderItems(translate('cont-socious-discount'), originalSociousFee - sociousFee, 'text-Success-600')}
        {stripeFee ? renderItems(translate('cont-stripe-fee', { stripePercent: stripePercent }), stripeFee) : ''}
      </div>
      <Divider />
      <div className="flex justify-between">
        <Typography variant="caption" className="text-Gray-light-mode-700">
          {translate('cont-total-payment')}
        </Typography>
        <span className={css.sum}>{`${symbol}${total} ${currency}`}</span>
      </div>
    </div>
  );
};
