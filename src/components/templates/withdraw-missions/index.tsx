import { Button } from '@atoms/button/button';
import Card from '@atoms/card';
import { printWhen } from 'src/core/utils';
import { getFlooredFixed } from 'src/core/numbers';
import { WithdrawMissionsProps } from './withdraw-missions.types';
import css from './withdraw-missions.module.scss';

export const WithdrawMissions: React.FC<WithdrawMissionsProps> = ({
  mission_name,
  escrow,
  amount,
  total,
  fee,
  service,
  onClickWithdraw,
  unit = 'USD',
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
          <img src={`/icons/fiat/${unit}.svg`} className={css.balance__img} />
          {unit}
        </div>
        $ {getFlooredFixed(amount, 2)}
      </div>
      <div className={css.rowItem}>
        <span className={css.title}>Fee </span>$ {getFlooredFixed(fee, 2)}
      </div>
      <div className={css.rowItem}>
        <span className={css.title}>total </span>$ {getFlooredFixed(total, 2)}
      </div>
      {printWhen(
        <>
          <span className={css.title}>Transaction date</span>
          <div className={css.rowItem}>{new Date(escrow?.released_at).toLocaleString()}</div>
        </>,
        escrow?.released_at != null
      )}
      {printWhen(
        <>
          <span className={css.title}>Transaction id</span>
          <div className={css.rowItem}>{escrow?.release_id}</div>
        </>,
        escrow?.release_id != null
      )}
      {printWhen(<div className={css.errorText}>{disableText}</div>, !!disableText && isStripe)}
      {printWhen(
        <Button color="blue" disabled={disbaledWithdraw} onClick={onClickWithdraw} className={css.button}>
          Withdraw funds
        </Button>,
        isStripe
      )}
    </Card>
  );
};
