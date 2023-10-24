import { useNavigate } from 'react-router-dom';
import { handleError, forgetPassword } from 'src/core/api';
import { useForm } from 'src/core/form';

import { formModel } from './email.form';

export const useEmailShared = () => {
  const navigate = useNavigate();
  const form = useForm(formModel);

  const navigateToOtp = () => {
    const email = form.controls.email.value as string;
    forgetPassword({ email })
      .then(() => navigate(`../otp?email=${email}`))
      .catch(handleError({ section: 'FORGET_PASSWORD' }));
  };

  const backToPerviousPage = () => {
    navigate('/sign-in');
  };

  return { backToPerviousPage, form, navigateToOtp };
};
