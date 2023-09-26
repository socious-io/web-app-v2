import { useState } from 'react';

import { endpoint } from 'src/core/endpoints';
import { handleError } from 'src/core/http';
import { dialog } from 'src/core/dialog/dialog';
import translate from 'src/translations';
import { setAuthCookies } from 'src/pages/sign-in/sign-in.services';
import { forgetPassword } from '../forget-password.service';

export const useOtpShared = () => {
  const navigate = {};
  const queryParam = useMatch().search;
  const email = String(queryParam.email);
  const [otpValue, setOtpValue] = useState('');

  function submit() {
    endpoint.get.auth['otp/confirm']({ email, otp: otpValue })
      .then((resp) => {
        if (resp.access_token && resp.access_token?.length > 0) {
          setAuthCookies(resp);
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

  return { backToPerviousPage, otpValue, setOtpValue, submit, onResendOtp };
};
