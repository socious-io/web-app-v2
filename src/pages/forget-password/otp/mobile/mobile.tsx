import { Button } from 'src/components/atoms/button/button';
import { Otp as OtpCom } from 'src/components/atoms/otp/otp';
import { useOtpShared } from '../otp.shared';
import css from './mobile.module.scss';

export const Mobile = () => {
  const { backToPerviousPage, otpValue, setOtpValue, submit, onResendOtp } = useOtpShared();

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
