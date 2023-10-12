import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { otpConfirm } from 'src/core/api';
import { setAuthParams } from 'src/core/api/auth/auth.service';
import { dialog } from 'src/core/dialog/dialog';
import { endpoint } from 'src/core/endpoints';
import { LoginResp } from 'src/core/types';

export const useSignUpUserVerificationShared = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  function onIncorrectOtp(resp: { error: string }) {
    dialog.alert({ title: 'Failed to proceed', message: resp.error || 'OTP is incorrect' }).then(() => setOtp(''));
  }

  async function successOTP(resp: LoginResp) {
    await setAuthParams(resp);
    navigate('../complete');
  }

  function onSubmit() {
    const email = localStorage.getItem('email') as string;
    otpConfirm({ email, code: otp }).then(successOTP).catch(onIncorrectOtp);
  }

  function onResendSucceed() {
    dialog.alert({ title: 'Success', message: 'OTP has been successfully sent' }).then(() => setOtp(''));
  }

  function onResendRequest() {
    const email = localStorage.getItem('email') as string;
    endpoint.post.auth['resend-verify-code']({ email }).then(onResendSucceed);
  }

  function navigateToSignIn() {
    navigate('/sign-in');
  }

  return {
    otp,
    setOtp,
    onSubmit,
    onResendRequest,
    navigateToSignIn,
  };
};
