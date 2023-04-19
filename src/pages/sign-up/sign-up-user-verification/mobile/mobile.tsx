import { Otp } from 'src/components/atoms/otp/otp';
import { BottomStatic } from 'src/components/templates/bottom-static/bottom-static';
import { useSignUpUserVerificationShared } from '../sign-up-user-verification.shared';
import css from './mobile.module.scss';
import { Typography } from 'src/components/atoms/typography/typography';
import { Button } from 'src/components/atoms/button/button';
import { Link } from 'src/components/atoms/link/link';

export const Mobile = (): JSX.Element => {
  const { otp, setOtp, onResendRequest, onSubmit, navigateToSignIn } = useSignUpUserVerificationShared();

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
            <Link onClick={navigateToSignIn}>Sign in</Link>
          </Typography>
        </div>
      </div>
    </BottomStatic>
  );
};
