import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { forgetPassword, handleError, otpConfirm } from 'src/core/api';
import { setAuthParams } from 'src/core/api/auth/auth.service';
import { dialog } from 'src/core/dialog/dialog';

export const useOtpForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otpVal, setOtpVal] = useState('');

  function sendOtp() {
    if (!email) return;

    otpConfirm({ email, code: otpVal })
      .then((resp) => {
        setAuthParams(resp);
        navigate(`../password?email=${email}`);
      })
      .catch((err) => {
        handleError()(err);
        setOtpVal('');
      });
  }

  function resendOtp() {
    if (!email) return;

    forgetPassword({ email })
      .then(() => dialog.alert({ title: 'success', message: 'OTP sent success' }))
      .catch((err) => {
        handleError()(err);
        setOtpVal('');
      });
  }

  const onBack = () => {
    navigate('/sign-in');
  };
  return { otpVal, setOtpVal, sendOtp, resendOtp, onBack };
};
