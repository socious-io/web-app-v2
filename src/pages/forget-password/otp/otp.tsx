import { useMatch, useNavigate } from '@tanstack/react-location';
import { Button } from '../../../components/atoms/button/button';
import css from './otp.module.scss';
import { Otp as OtpCom } from '../../../components/atoms/otp/otp';
import { useState } from 'react';
import { confirm } from '../forget-password.service';
import { handleError } from '../../../core/api';

export const Otp = () => {
  const navigate = useNavigate();
  const queryParam = useMatch().search;
  const email = queryParam.email;
  const [otpValue, setOtpValue] = useState('');

  const submit = () => {
    confirm(email, otpValue)
      .then((resp) => {
        if (resp.message === 'success') {
          navigate({ to: '../password' });
        }
      })
      .catch((err) => {
        handleError('Failed')(err);
        setOtpValue('');
      });
  };

  const backToPerviousPage = () => {
    navigate({ to: '../email' });
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div onClick={backToPerviousPage}>
          <img src="/icons/chevron-left.svg" />
        </div>
      </div>
      <div className={css.main}>
        <div className={css.content}>
          <span className={css.title}>Making sure it's you </span>
          <span className={css.text}>
            A message with a verification code has been send to your email. Enter the code to continue.
          </span>
        </div>
        <div className={css.otp}>
          <OtpCom value={otpValue} length={6} onChange={setOtpValue} />
        </div>
      </div>
      <div className={css.footer}>
        <Button color="blue" onClick={submit} disabled={!(otpValue.length === 6)}>
          Verify
        </Button>
      </div>
    </div>
  );
};
