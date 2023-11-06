import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { changePasswordDirect, handleError } from 'src/core/api';
import * as yup from 'yup';

export const formModel = {
  password: '',
  confirmPassword: '',
};

export const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, '')
    .matches(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/),
  confirmPassword: yup.string().test('passwords-match', 'Passwords must match', function (value) {
    return this.parent.password === value;
  }),
});

export const usePasswordForm = () => {
  const navigate = useNavigate();
  const [validLength, setValidLength] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onChangePassword = () => {
    changePasswordDirect({ password: getValues().password as string })
      .then(() => navigate(`../succeed`))
      .catch(handleError());
  };

  const onBack = () => {
    navigate('/sign-in');
  };

  const checkPassword = (passwordVal: string) => {
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    setValidLength(passwordVal.length >= 8);
    setSpecialChar(regex.test(passwordVal));
  };

  return { register, handleSubmit, errors, isValid, onChangePassword, onBack, checkPassword, validLength, specialChar };
};
