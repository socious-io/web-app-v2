import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { otpConfirm, resendVerifyCode } from 'src/core/api';
import { setAuthParams } from 'src/core/api/auth/auth.service';

export const useVerifyForm = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email') as string;
  const [otpValue, setOtpValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const onSubmit = async () => {
    try {
      const result = await otpConfirm({ email, code: otpValue });
      if (result) {
        await setAuthParams(result);
        navigate('../password');
      }
    } catch (error) {
      setIsValid(false);
    }
  };
  function resendCode() {
    const email = localStorage.getItem('email');
    resendVerifyCode({ email });
  }
  return { onSubmit, otpValue, setOtpValue, email, resendCode, isValid };
};
