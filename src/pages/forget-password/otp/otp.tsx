import { useMatch, useNavigate } from '@tanstack/react-location';
import { Button } from '../../../components/atoms/button/button';
import css from './otp.module.scss';
import { Otp as OtpCom } from '../../../components/atoms/otp/otp';
import { useState } from 'react';
import { confirm, forgetPassword } from '../forget-password.service';
import { handleError } from '../../../core/http';
import { dialog } from '../../../core/dialog/dialog';
import translate from '../../../translations';
export const Otp = () => {
  const navigate = useNavigate();
  const queryParam = useMatch().search;
  const email = queryParam.email;
  const [otpValue, setOtpValue] = useState('');

  function submit() {
    confirm(email, otpValue)
      .then((resp) => {
        if (resp.message === 'success') {
          navigate({ to: '../password' });
        }
      })
      .catch((err) => {
        handleError()(err);
        setOtpValue('');
      });
  }

  function onResendOtp() {
    forgetPassword(email)
      .then(() => dialog.alert({ title: 'success', message: translate('OTP sent success') }))
      .catch((err) => {
        handleError()(err);
        setOtpValue('');
      });
  }

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
            A message with a verification code has been sent to your email. Enter the code to continue.
          </span>
        </div>
        <div className={css.otp}>
          <OtpCom value={otpValue} length={6} onChange={setOtpValue} />
        </div>
      </div>
      <div className={css.footer}>
        <Button onClick={submit} disabled={!(otpValue.length === 6)}>
          Verify
        </Button>
        <Button font-weight="normal" border={0} color="white" onClick={onResendOtp}>
          Resend code
        </Button>
      </div>
    </div>
  );
};
