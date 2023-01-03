import css from './sign-up-user-verification.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../atoms/button/button';
import { Link } from '../../../atoms/link/link';
import { Typography } from '../../../atoms/typography/typography';
import { BottomStatic } from '../../../templates/bottom-static/bottom-static';
import { Otp } from '../../../atoms/otp/otp';
import { confirmOTP, resendOTP } from './sign-up-user-verification.services';
import { useState } from 'react';

export const SignUpUserVerification = (): JSX.Element => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  function onSubmit() {
    const email = localStorage.getItem('email') as string;
    confirmOTP(email, otp).then(() => {
      navigate({ to: '../complete' });
    });
  }

  function onResendRequest() {
    const email = localStorage.getItem('email') as string;
    resendOTP(email).then(console.log);
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
        <Otp onChange={setOtp} length={6} />
        <div className={css.didNotReceivedCode}>
          <Typography textAlign="center">
            <span>Didn't received a code? </span>
            <Link onClick={onResendRequest}>Click to resend</Link>
          </Typography>
        </div>
      </div>
      <div>
        <div className={css.bottom}>
          <Button onClick={onSubmit} color="blue">
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
