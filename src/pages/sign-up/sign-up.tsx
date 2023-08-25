import { useState } from 'react';
import { Input } from '@atoms/input/input';
import { Otp } from '@atoms/otp/otp';
import css from './sign-up.module.scss';
import { SignUpProps } from './sign-up.types';

export const SignUp = (props: SignUpProps): JSX.Element => {
  const [value, setValue] = useState('');

  return (
    <div className={css.container}>
      <div>HEADER</div>
      <Input placeholder="bla" onValueChange={console.log} label="label" />
      <div>{value}</div>
      <Otp length={5} onChange={setValue} />
      signup
    </div>
  );
};
