import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { dialog } from 'src/core/dialog/dialog';
import { LoginResp } from 'src/core/types';
import { setAuthCookies } from 'src/pages/sign-in/sign-in.services';
import { endpoint } from 'src/core/endpoints';

export const useSignUpUserVerificationShared = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  function onIncorrectOtp(resp: { error: string }) {
    dialog.alert({ title: 'Failed to proceed', message: resp.error || 'OTP is incorrect' }).then(() => setOtp(''));
  }

  async function successOTP(resp: LoginResp) {
    await setAuthCookies(resp);
    navigate({ to: '../complete' });
  }

  function onSubmit() {
    const email = localStorage.getItem('email') as string;
    endpoint.get.auth['otp/confirm']({ email, otp }).then(successOTP).catch(onIncorrectOtp);
  }

  function onResendSucceed() {
    dialog.alert({ title: 'Success', message: 'OTP has been successfully sent' }).then(() => setOtp(''));
  }

  function onResendRequest() {
    const email = localStorage.getItem('email') as string;
    endpoint.post.auth['resend-verify-code']({ email }).then(onResendSucceed);
  }

  function navigateToSignIn() {
    navigate({ to: '/sign-in' });
  }

  return {
    otp,
    setOtp,
    onSubmit,
    onResendRequest,
    navigateToSignIn,
  };
};
