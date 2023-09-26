import { changePassword } from '../forget-password.service';
import { handleError } from 'src/core/http';
import { formModel } from './password.form';
import { useForm } from 'src/core/form';

export const usePasswordShared = () => {
  const navigate = {};
  const form = useForm(formModel);
  const formIsValid = form.isValid && form.controls.newPassword.value === form.controls.confirmPassword.value;

  const onChangePassword = () => {
    changePassword(form.controls.confirmPassword.value as string)
      .then((resp) => {
        if (resp.message === 'success') {
          navigate({ to: `../../jobs` });
        }
      })
      .catch(handleError());
  };

  const backToPerviousPage = () => {
    navigate({ to: '../otp' });
  };

  return { backToPerviousPage, form, formIsValid, onChangePassword };
};
