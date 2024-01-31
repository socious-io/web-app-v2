import { useNavigate } from 'react-router-dom';
import { register, preRegister, RegisterReq, handleError } from 'src/core/api';
import { useForm } from 'src/core/form';
import { getFormValues } from 'src/core/form/customValidators/formValues';

import { formModel } from './sign-up-user-email.form';

export const useSignUpUserEmailShared = () => {
  const form = useForm(formModel);
  const navigate = useNavigate();

  async function onSubmit() {
    const formValues = getFormValues(form) as RegisterReq;

    const response = await preRegister({ email: formValues.email });
    if (response.email === 'EXISTS') {
      handleError({ title: 'error', message: 'Email already in use. Please sign in or choose another email.' })();
      return;
    } else {
      register(formValues)
        .then(() => localStorage.setItem('email', formValues.email))
        .then(() => navigate('../verification'))
        .catch(handleError());
    }
  }

  function navigateToSignIn() {
    navigate('/sign-in');
  }

  return { form, navigateToSignIn, onSubmit };
};
