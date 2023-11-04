import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useVerifyForm = () => {
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState('');
  const onSubmit = () => {
    console.log(otpValue);
  };
  return { onSubmit, otpValue, setOtpValue };
};
