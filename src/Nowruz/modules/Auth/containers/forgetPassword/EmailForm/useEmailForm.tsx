import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { forgetPassword, handleError } from 'src/core/api';
import * as yup from 'yup';

export const formModel = {
  email: '',
};

export const schema = yup
  .object()
  .shape({
    email: yup.string().trim().email('Enter a correct email').required('Enter a correct email'),
  })
  .required();

export const useEmailForm = () => {
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
    const email = getValues().email.trim();

    forgetPassword({ email })
      .then(() => navigate(`../otp?email=${email}`))
      .catch(handleError({ section: 'FORGET_PASSWORD' }));
  };

  const onBack = () => {
    navigate('/sign-in');
  };

  return { register, handleSubmit, errors, isValid, navigateToOtp, onBack, getValues };
};
