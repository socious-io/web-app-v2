import { useNavigate } from '@tanstack/react-location';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { handleError } from 'src/core/http';
import { formModel } from './sign-up-user-email.form';
import { preRegister, register } from './sign-up-user-email.services';
import { useForm } from 'src/core/form';

export const useSignUpUserEmailShared = () => {
  const form = useForm(formModel);
  const navigate = useNavigate();

  async function onSubmit() {
    const formValues = getFormValues(form);
    await preRegister({ email: form.controls.email.value });
    register(formValues)
      .then(() => localStorage.setItem('email', formValues.email))
      .then(() => navigate({ to: '../verification' }))
      .catch(handleError());
  }

  function navigateToSignIn() {
    navigate({ to: '/sign-in' });
  }

  return { form, navigateToSignIn, onSubmit };
};
