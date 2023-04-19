import { Card } from 'src/components/atoms/card/card';
import css from './payment-methods.module.scss';
import { PaymentMethodsProps } from './payment-methods.types';
import { useNavigate } from '@tanstack/react-location';

export const PaymentMethods = (props: PaymentMethodsProps): JSX.Element => {
  const { containerClassName = '' } = props;
  const navigate = useNavigate();
  return (
    <Card className={`${css['connect']} ${containerClassName}`}>
      <div>{props.crypto_method}</div>
      {props.fiat_method}
      <div className={css['connect__text']}>
        All payments in Socious are done with cryptocurrencies or credit card. By connecting a wallet, you agree to
        Socious’
        <p className={css['connect__link']} onClick={() => navigate({ to: '/terms-conditions' })}>
          {' '}
          terms & conditions.
        </p>
      </div>
      <div className={css['connect__text']}>
        To learn more about payments, <p className={css['connect__link']}>visit our FAQ.</p>
      </div>
    </Card>
  );
};
