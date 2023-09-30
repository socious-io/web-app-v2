import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { forgetPassword, handleError, otpConfirm } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { setAuthCookies } from 'src/pages/sign-in/sign-in.services';
import translate from 'src/translations';

export const useOtpShared = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const [otpValue, setOtpValue] = useState('');

  function submit() {
    if (!email) return;
    
    
    otpConfirm({email, otp: otpValue })
      .then((resp) => {
          setAuthCookies(resp);
          navigate('../password');
      })
      .catch((err) => {
        handleError()(err);
        setOtpValue('');
      });
  }

  function onResendOtp() {
    if (!email) return;
    
    forgetPassword({email})
      .then(() => dialog.alert({ title: 'success', message: translate('OTP sent success') }))
      .catch((err) => {
        handleError()(err);
        setOtpValue('');
      });
  }

  const backToPerviousPage = () => {
    navigate('../email');
  };

  return { backToPerviousPage, otpValue, setOtpValue, submit, onResendOtp };
};
