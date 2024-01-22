import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthRes, identities, login } from 'src/core/api';
import { setAuthParams } from 'src/core/api/auth/auth.service';
import { useCaptcha } from 'src/Nowruz/pages/captcha';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .email('Enter a correct email')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter a correct email')
      .required('Enter a correct email'),
    password: yup.string().required('Enter a correct password'),
  })
  .required();

export const useSignInForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { tried, required } = useCaptcha();

  useEffect(() => {
    if (required) navigate('/captcha');
  }, [required]);

  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  async function onLoginSucceed(loginResp: AuthRes) {
    await setAuthParams(loginResp, keepLoggedIn);
    store.dispatch(setIdentityList(await identities()));
    window.location.reload();
    return loginResp;
  }

  async function onLogin() {
    const formValues = { email: getValues().email.trim(), password: getValues().password };
    tried();
    login(formValues)
      .then(onLoginSucceed)
      .catch((e) => {
        if (e?.response?.data.error) {
          setError('password', {
            type: 'manual',
            message: 'Username or password not matched',
          });
        }
      });
  }

  const handleChange = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };
  return {
    register,
    handleSubmit,
    errors,
    isValid,
    getValues,
    onLogin,
    keepLoggedIn,
    setKeepLoggedIn,
    handleChange,
    tried,
  };
};
