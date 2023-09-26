import { useForm } from 'src/core/form';
import { formModel } from './email.form';
import { handleError } from 'src/core/http';
import { forgetPassword } from '../forget-password.service';

export const useEmailShared = () => {
  const navigate = {};
  const form = useForm(formModel);

  const navigateToOtp = () => {
    const email = form.controls.email.value as string;
    forgetPassword(email)
      .then((resp) => {
        if (resp.message === 'success') {
          navigate({ to: `../otp?email=${email}` });
        }
      })
      .catch(handleError({ section: 'FORGET_PASSWORD' }));
  };

  const backToPerviousPage = () => {
    navigate({ to: '/sign-in' });
  };

  return { backToPerviousPage, form, navigateToOtp };
};
