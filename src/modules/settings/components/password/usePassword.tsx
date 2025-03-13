import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { changePassword } from 'src/core/api';
import { passwordPattern } from 'src/core/regexs';
import { translate } from 'src/core/utils';
import * as yup from 'yup';

import { Inputs } from './password.type';

const schema = yup.object().shape({
  current_password: yup.string().required(translate('password.errors.currentPasswordRequired')),
  password: yup
    .string()
    .required(translate('password.errors.passwordRequired'))
    .notOneOf([yup.ref('current_password'), null], 'cantMatch')
    .min(8, translate('password.errors.minimumLength'))
    .matches(passwordPattern, translate('password.errors.complexityWeak')),
  confirm: yup
    .string()
    .required(translate('password.errors.confirmPasswordRequired'))
    .oneOf([yup.ref('password')], translate('password.errors.passwordsMustMatch')),
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
    ['cantMatch']: translate('password.alerts.cantMatch'),
    ['incorrect']: translate('password.alerts.incorrect'),
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
      console.log('Error changing password:', error);
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
    watch,
  };
};
