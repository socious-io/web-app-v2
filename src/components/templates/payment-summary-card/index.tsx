import Card from '@atoms/card';
import { PaymentDetail } from '@molecules/payment-detail';
import css from './payment-summary-card.module.scss';
import { PaymentSummaryCardProps } from './payment-summary-card.types';
import clsx from 'clsx';

export const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
  title,
  total_price,
  unit = 'USDC',
  containerClassName = '',
  ...rest
}) => {
  return (
    <Card className={clsx(css.payment, containerClassName)}>
      <div className={css['payment__title']}>{title}</div>
      <div className={css['payment__detail']}>
        <PaymentDetail unit={unit} {...rest} />
      </div>
      <div className={css['payment__total']}>
        Total
        <div className={css['payment__price']}>
          {unit}
          <span>{total_price.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};
