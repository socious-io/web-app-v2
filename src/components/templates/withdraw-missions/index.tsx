import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { printWhen } from 'src/core/utils';
import { getFlooredFixed } from 'src/core/numbers';
import { WithdrawMissionsProps } from './withdraw-missions.types';
import css from './withdraw-missions.module.scss';

export const WithdrawMissions: React.FC<WithdrawMissionsProps> = ({
  mission_name,
  escrow,
  onClickWithdraw,
  fee = 0,
  unit = 'USD',
  disbaledWithdraw = false,
  disableText = '',
}) => {
  return (
    <Card className={css.container}>
      <div className={css.header}>{mission_name}</div>
      <div className={css.rowItem}>
        <div className={css.balance}>
          <img src={`/icons/fiat/${unit}.svg`} className={css.balance__img} />
          {unit}
        </div>
        $ {getFlooredFixed(escrow?.amount, 1)}
      </div>
      {printWhen(
        <div className={css.rowItem}>
          <span className={css.title}>Fee </span>$ {getFlooredFixed(escrow?.amount * fee, 1)}
        </div>,
        !!fee
      )}
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
      {printWhen(<div className={css.errorText}>{disableText}</div>, !!disableText)}
      <Button color="blue" disabled={disbaledWithdraw} onClick={onClickWithdraw} className={css.button}>
        Withdraw funds
      </Button>
    </Card>
  );
};
