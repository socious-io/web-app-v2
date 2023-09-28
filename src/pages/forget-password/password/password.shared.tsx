import { useNavigate } from 'react-router-dom';
import { changePasswordDirect } from 'src/core/api';
import { useForm } from 'src/core/form';
import { handleError } from 'src/core/http';

import { formModel } from './password.form';


export const usePasswordShared = () => {
  const navigate = useNavigate();
  const form = useForm(formModel);
  const formIsValid = form.isValid && form.controls.newPassword.value === form.controls.confirmPassword.value;

  const onChangePassword = () => {
    changePasswordDirect({password: form.controls.confirmPassword.value as string})
      .then(() => navigate(`../../jobs`))
      .catch(handleError());
  };

  const backToPerviousPage = () => {
    navigate('../otp');
  };

  return { backToPerviousPage, form, formIsValid, onChangePassword };
};
