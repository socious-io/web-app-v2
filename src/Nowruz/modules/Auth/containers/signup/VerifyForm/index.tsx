import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { OTP } from 'src/Nowruz/modules/general/components/otp/otp';

import { useVerifyForm } from './useVerifyForm';

export const VerifyForm = () => {
  const { onSubmit, otpValue, setOtpValue } = useVerifyForm();

  return (
    <div className="flex flex-col justify-center">
      <OTP value={otpValue} setValue={setOtpValue} />
      <div className="mt-8">
        <Button disabled={!(otpValue.length === 6)} color="primary" block onClick={onSubmit}>
          Continue
        </Button>
      </div>
    </div>
  );
};
