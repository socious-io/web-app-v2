import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { changePasswordDirect, handleError } from 'src/core/api';
import * as yup from 'yup';

export const usePasswordForm = () => {
  const navigate = useNavigate();
  const [validLength, setValidLength] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  const schema = yup.object().shape({
    password: yup.string().test('password-validation', '', function (value) {
      const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      const errors: yup.ValidationError[] = [];
      if (!value || value.length < 8) {
        setValidLength(false);
        errors.push(this.createError({ path: 'password', message: '' }));
      } else setValidLength(true);

      if (!value || !regex.test(value)) {
        setSpecialChar(false);
        errors.push(this.createError({ path: 'password', message: '' }));
      } else setSpecialChar(true);

      if (errors.length) return false;
      return true;
    }),
    confirmPassword: yup.string().test('passwords-match', 'Passwords entered are not the same', function (value) {
      return this.parent.password === value;
    }),
  });

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
      .then(() => navigate(`../reset-completed`))
      .catch(handleError());
  };

  const onBack = () => {
    navigate('/sign-in');
  };

  return { register, handleSubmit, errors, isValid, onChangePassword, onBack, validLength, specialChar };
};
