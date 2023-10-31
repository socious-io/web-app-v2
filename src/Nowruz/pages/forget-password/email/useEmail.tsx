import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { forgetPassword, handleError } from 'src/core/api';

import { schema } from './email.form';

export const useEmail = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const navigateToOtp = () => {
    const email = getValues().email;

    forgetPassword({ email })
      .then(() => navigate(`../otp?email=${email}`))
      .catch(handleError({ section: 'FORGET_PASSWORD' }));
  };

  const onBack = () => {
    navigate('/sign-in');
  };

  return { register, handleSubmit, errors, isValid, getValues, navigateToOtp, onBack };
};
