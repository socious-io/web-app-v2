import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { getFlooredFixed } from 'src/core/numbers';
import { printWhen } from 'src/core/utils';

import css from './withdraw-missions.module.scss';
import { WithdrawMissionsProps } from './withdraw-missions.types';

export const WithdrawMissions: React.FC<WithdrawMissionsProps> = ({
  mission_name,
  escrow,
  amount,
  total,
  fee,
  service,
  onClickWithdraw,
  currency = 'USD',
  disbaledWithdraw = false,
  disableText = '',
}) => {
  const isStripe = service === 'STRIPE';
  return (
    <Card className={css.container}>
      <div className={css.header}>
        {mission_name} ({isStripe ? 'FIAT' : 'CRYPTO'})
      </div>
      <div className={css.rowItem}>
        <div className={css.balance}>
          <img src={`/icons/crypto/${currency}.svg`} className={css.balance__img} />
          {currency}
        </div>
        {getFlooredFixed(amount, 2)}
      </div>
      <div className={css.rowItem}>
        <span className={css.title}>Fee </span> {getFlooredFixed(fee, 2)}
      </div>
      <div className={css.rowItem}>
        <span className={css.title}>total </span> {getFlooredFixed(total, 2)}
      </div>
      {printWhen(
        <>
          <span className={css.title}>Transaction date</span>
          <div className={css.rowItem}>{escrow?.released_at?.toLocaleString()}</div>
        </>,
        escrow?.released_at != null,
      )}
      {printWhen(
        <>
          <span className={css.title}>Transaction id</span>
          <div className={css.rowItem}>{escrow?.release_id}</div>
        </>,
        escrow?.release_id != null,
      )}
      {printWhen(<div className={css.errorText}>{disableText}</div>, !!disableText && isStripe)}
      {printWhen(
        <Button color="blue" disabled={disbaledWithdraw} onClick={onClickWithdraw} className={css.button}>
          Withdraw funds
        </Button>,
        isStripe,
      )}
    </Card>
  );
};
