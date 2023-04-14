import css from './sign-up-user-verification.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../components/atoms/button/button';
import { Link } from '../../../components/atoms/link/link';
import { Typography } from '../../../components/atoms/typography/typography';
import { BottomStatic } from '../../../components/templates/bottom-static/bottom-static';
import { Otp } from '../../../components/atoms/otp/otp';
import { endpoint } from 'src/core/endpoints';
import { useState } from 'react';
import { dialog } from '../../../core/dialog/dialog';
import { setAuthCookies } from 'src/pages/sign-in/sign-in.services';
import { LoginResp } from 'src/core/types';

export const SignUpUserVerification = (): JSX.Element => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  function onIncorrectOtp(resp: { error: string }) {
    dialog.alert({ title: 'Failed to proceed', message: resp.error || 'OTP is incorrect' }).then(() => setOtp(''));
  }

  async function successOTP(resp: LoginResp) {
    await setAuthCookies(resp);
    navigate({ to: '../complete' });
  }

  function onSubmit() {
    const email = localStorage.getItem('email') as string;
    endpoint.get.auth['otp/confirm']({ email, otp }).then(successOTP).catch(onIncorrectOtp);
  }

  function onResendSucceed() {
    dialog.alert({ title: 'Success', message: 'OTP has been successfully sent' }).then(() => setOtp(''));
  }

  function onResendRequest() {
    const email = localStorage.getItem('email') as string;
    endpoint.auth.resendOTP(email).then(onResendSucceed);
  }

  return (
    <BottomStatic>
      <div className={css.top}>
        <div className={css.header}>
          <Typography marginBottom=".5rem" type="heading" size="l">
            Please check your email
          </Typography>
          <Typography color="var(--color-gray-01)" type="body">
            We've sent a code to {localStorage.getItem('email')}
          </Typography>
        </div>
        <Otp value={otp} onChange={setOtp} length={6} />
        <div className={css.didNotReceivedCode}>
          <Typography textAlign="center">
            <span>Didn't received a code? </span>
            <Link onClick={onResendRequest}>Click to resend</Link>
          </Typography>
        </div>
      </div>
      <div>
        <div className={css.bottom}>
          <Button disabled={otp.length !== 6} onClick={onSubmit} color="blue">
            Verify email
          </Button>
          <Typography marginTop="1rem">
            <span>Already a member? </span>
            <Link onClick={() => navigate({ to: '/sign-in' })}>Sign in</Link>
          </Typography>
        </div>
      </div>
    </BottomStatic>
  );
};
