import { Typography, CircularProgress } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { OTP } from 'src/Nowruz/modules/general/components/otp/otp';

import { useOtpForm } from './useOtpForm';

export const OtpForm = () => {
  const { otpVal, setOtpVal, sendOtp, resendOtp, onBack, isValid, loading } = useOtpForm();
  return (
    <div className="flex flex-col gap-8 justify-center items-center ">
      <div className="mt-8">
        <OTP
          value={otpVal}
          setValue={setOtpVal}
          isValid={isValid}
          errorMessage={'Incorrect verification code entered'}
        />
      </div>

      <Button color="primary" disabled={!otpVal.length} onClick={sendOtp} fullWidth>
        {loading ? <CircularProgress size="32px" sx={{ color: variables.color_white }} /> : 'Verify email'}
      </Button>
      <div>
        <Typography variant="caption" color={variables.color_grey_600}>
          Didn’t receive the email?
        </Typography>
        <Button color="primary" variant="text" onClick={resendOtp}>
          <Typography variant="subtitle2" color={variables.color_primary_700}>
            Click to resend
          </Typography>
        </Button>
      </div>
      <BackLink title="Back to log in" onBack={onBack} variant="subtitle2" textAlign="center" />
    </div>
  );
};
