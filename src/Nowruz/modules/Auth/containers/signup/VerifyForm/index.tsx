import { Typography } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { OTP } from 'src/Nowruz/modules/general/components/otp/otp';

import { useVerifyForm } from './useVerifyForm';

export const VerifyForm = () => {
  const { onSubmit, otpValue, setOtpValue, resendCode, isValid } = useVerifyForm();

  return (
    <div className="flex flex-col justify-center">
      <OTP
        errorMessage={'Incorrect verification code entered'}
        isValid={isValid}
        value={otpValue}
        setValue={setOtpValue}
      />
      <div className="mt-8">
        <Button disabled={!(otpValue.length === 6)} color="primary" block onClick={onSubmit}>
          Verify email
        </Button>
      </div>
      <div className="flex flex-row items-center justify-center ">
        <Typography variant="caption" color={variables.color_grey_600}>
          Didn’t receive the email?
        </Typography>

        <Button color="primary" variant="text" onClick={resendCode}>
          <Typography variant="subtitle2" color={variables.color_primary_700}>
            Click to resend
          </Typography>
        </Button>
      </div>
    </div>
  );
};
