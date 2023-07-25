import css from './payment-detail.module.scss';
import { PaymentDetailProps } from './payment-detail.types';

export const PaymentDetail: React.FC<PaymentDetailProps> = ({ list, unit = 'USDC' }) => {
  return (
    <>
      {list.map((item) => (
        <div className={css.container} key={item.title}>
          {item.title}
          <div className={css.total}>
            {unit}
            <span>{item.price.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </>
  );
};
