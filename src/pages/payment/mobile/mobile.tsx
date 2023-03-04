import { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/atoms/button/button';
import { Input } from '../../../components/atoms/input/input';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const [amount, setAmount] = useState('');

  function onAmountChange(e: ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
  }

  return (
    <div className={css.container}>
      <Input value={amount} onChange={onAmountChange} label="amount" />
      <Button onClick={console.log}>button</Button>
    </div>
  );
};
