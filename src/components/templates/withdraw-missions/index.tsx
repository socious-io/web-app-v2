import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { printWhen } from 'src/core/utils';
import { WithdrawMissionsProps } from './withdraw-missions.types';
import css from './withdraw-missions.module.scss';

export const WithdrawMissions: React.FC<WithdrawMissionsProps> = ({
  mission_name,
  amount,
  onClickWithdraw,
  fee,
  unit = 'USD',
  disbaledWithdraw = false,
}) => {
  return (
    <Card className={css.container}>
      <div className={css.header}>{mission_name}</div>
      <div className={css.total}>
        <div className={css.balance}>
          <img src={`/icons/fiat/${unit}.svg`} className={css.balance__img} />
          {unit}
        </div>
        $ {amount.toLocaleString()}
      </div>
      {printWhen(
        <div className={css.total}>
          <div>Fee </div>$ {fee?.toLocaleString()}
        </div>,
        !!fee
      )}
      <Button color="blue" disabled={disbaledWithdraw} onClick={onClickWithdraw} className={css.button}>
        Withdraw funds
      </Button>
    </Card>
  );
};
