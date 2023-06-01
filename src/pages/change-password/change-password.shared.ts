import { useNavigate } from '@tanstack/react-location';
import { useForm } from 'src/core/form';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { changePassword } from './change-password.services';
import { dialog } from 'src/core/dialog/dialog';
import { formModel } from './change-password.form';

export const useChangePasswordShared = () => {
  const form = useForm(formModel);
  const navigate = useNavigate();

  function onSubmitError(err: { error: string }) {
    // FIXME: we should get an error code instead of a string
    if (err.error === 'Not matched') {
      dialog.alert({ title: 'Failed to change password', message: 'Current password is incorrect' });
    }
  }

  async function onSubmitDesktop(cb: () => void) {
    const formValues = getFormValues(form);
    const payload = {
      current_password: formValues.current_password,
      password: formValues.password,
    };
    return changePassword(payload)
      .then(cb)
      .catch((err) => onSubmitError(err.response.data));
  }

  function onSubmit() {
    const formValues = getFormValues(form);
    const payload = {
      current_password: formValues.current_password,
      password: formValues.password,
    };
    return () =>
      changePassword(payload)
        .then(() => navigate({ to: '/jobs' }))
        .catch((err) => {
          onSubmitError(err.response.data);
        });
  }

  const notMatchingPasswords = form.controls.password.value !== form.controls.confirm_new_password.value;
  const formIsValid = form.isValid && !notMatchingPasswords;

  return { form, onSubmitError, onSubmit, formIsValid, notMatchingPasswords, onSubmitDesktop };
};
