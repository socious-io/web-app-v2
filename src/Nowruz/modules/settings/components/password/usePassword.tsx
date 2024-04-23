import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { changePassword } from 'src/core/api';
import { passwordPattern } from 'src/core/regexs';
import * as yup from 'yup';

import { Inputs } from './password.type';

const schema = yup.object().shape({
  current_password: yup.string().required('Current password is required'),
  password: yup
    .string()
    .required('Password is required')
    .notOneOf([yup.ref('current_password'), null], 'cantMatch')
    .min(8, 'Minimum 8 characters')
    .matches(passwordPattern, 'Password complexity is week'),
  confirm: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const usePassword = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm<Inputs>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
  const [isPasswordPatternValid, setIsPasswordPatternValid] = useState(false);

  const alertContent = {
    ['cantMatch']: 'Your password cannot be the same as the current password',
    ['incorrect']: 'Your current password is incorrect',
  };

  const current_password = watch('current_password');
  const password = watch('password');

  useEffect(() => {
    setIsPasswordLengthValid(!!(password && password.length >= 8));
    setIsPasswordPatternValid(!!(password && passwordPattern.test(password)));
  }, [password]);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    try {
      await changePassword({ current_password, password });
      reset();
    } catch (error: unknown) {
      console.log('error is changing password', error);
      if (error instanceof AxiosError) {
        if (error.response?.data.error === 'Not matched') setError('password', { message: 'incorrect' });
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    reset,
    isFormValid: isValid,
    isPasswordLengthValid,
    isPasswordPatternValid,
    alertContent,
  };
};
