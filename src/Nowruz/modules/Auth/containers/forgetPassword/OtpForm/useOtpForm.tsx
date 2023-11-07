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
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  function sendOtp() {
    if (!email || loading) return;
    otpConfirm({ email, code: otpVal })
      .then((resp) => {
        setAuthParams(resp);
        navigate(`../password?email=${email}`);
      })
      .catch((err) => {
        setIsValid(false);
      });
  }

  function resendOtp() {
    if (!email) return;
    setLoading(true);
    forgetPassword({ email })
      .then(() => setLoading(false))
      .catch((err) => {
        handleError()(err);
        setLoading(false);
        setOtpVal('');
      });
  }

  const onBack = () => {
    navigate('/sign-in');
  };

  return { otpVal, setOtpVal, sendOtp, resendOtp, onBack, isValid, loading };
};
