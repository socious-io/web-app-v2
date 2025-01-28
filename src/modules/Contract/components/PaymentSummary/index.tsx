import { Divider } from '@mui/material';
import { CURRENCY_SIGNS } from 'src/constants/PAYMENT_CURRENCY';
import { translate } from 'src/core/utils';

import styles from './index.module.scss';
import { PaymentSummaryProps } from './index.types';

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  amount,
  sociousFee,
  stripeFee,
  total,
  currency,
  hasFeeDiscount,
}) => {
  const originalSociousFee = hasFeeDiscount ? sociousFee * 2 : sociousFee;
  const sociousPercent = Math.trunc((originalSociousFee / amount) * 1_000) / 10;
  const stripePercent = Math.trunc((stripeFee / amount) * 1_000) / 10;
  const symbol = CURRENCY_SIGNS[currency] || '';

  const renderItems = (title: string, value: number, className = '') => {
    return (
      <div className={`${styles['row']} ${className}`}>
        {title}
        <span className={styles['row--bold']}>{`${symbol}${value.toLocaleString()} ${currency}`}</span>
      </div>
    );
  };

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>{translate('cont-payment-summary')}</h1>
      <Divider />
      <div className={styles['col']}>
        {renderItems(translate('cont-job-payment'), amount)}
        {renderItems(translate('cont-socious-fee', { sociousPercent }), originalSociousFee)}
        {hasFeeDiscount &&
          renderItems(translate('cont-socious-discount'), originalSociousFee - sociousFee, styles['row--success'])}
        {renderItems(translate('cont-stripe-fee', { stripePercent }), stripeFee)}
      </div>
      <Divider />
      <div className={styles['row']}>
        {translate('cont-total-payment')}
        <span className={styles['row--bolder']}>{`${symbol}${total} ${currency}`}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
