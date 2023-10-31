import { Typography } from '@mui/material';
import { Mail01 } from 'public/icons/nowruz/mail-01';
import { BackLink } from 'src/Nowruz/general/BackLink';
import { Button } from 'src/Nowruz/general/Button';
import { OTP } from 'src/Nowruz/general/otp/otp';
import { useEmail } from 'src/Nowruz/pages/forget-password/email/useEmail';
import css from 'src/Nowruz/pages/forget-password/forgetPassword.module.scss';

import { useOtp } from './useOtp';

export const Otp = () => {
  const { onBack } = useEmail();
  const { otpVal, setOtpVal, sendOtp, resendOtp } = useOtp();
  return (
    <div className={css.container}>
      <div className="display:none md:flex-1 md:block" />
      <div className={`${css.main} p-8 pt-12 md:pt-24`}>
        <div className={css.icon}>
          <Mail01 width={28} height={28} />
        </div>
        <div className={css.title}>
          <Typography variant="body1" className={css.grey900text} textAlign="center">
            Check your email
          </Typography>
          <Typography variant="h5" className={css.grey600text} textAlign="center">
            We sent a verification link to umaya.nigina@gmail.com
          </Typography>
        </div>

        <OTP value={otpVal} setValue={setOtpVal} />

        <Button disabled={otpVal.length < 6} color="primary" onClick={sendOtp} className={css.button}>
          Continue
        </Button>
        <div className={css.centeredDiv}>
          <Typography variant="caption" className={css.grey600text}>
            Didn’t receive the email?
          </Typography>
          <Button color="primary" variant="text" className={css.linkButton} onClick={resendOtp}>
            <Typography variant="subtitle2" className={css.primary700text}>
              Click to resend
            </Typography>
          </Button>
        </div>
        <BackLink
          title="Back to log in"
          onBack={onBack}
          variant="subtitle2"
          textAlign="center"
          className={css.grey600text}
        />
      </div>
      <div className="display:none md:flex-1 md:block" />
    </div>
  );
};
