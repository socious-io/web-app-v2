import css from './change-password.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../components/atoms/button/button';
import { Header } from '../../components/atoms/header/header';
import { Input } from '../../components/atoms/input/input';
import { BottomStatic } from '../../components/templates/bottom-static/bottom-static';
import { useForm } from '../../core/form';
import { getFormValues } from '../../core/form/customValidators/formValues';
import { formModel } from './change-password.form';
import { changePassword } from './change-password.services';
import { Error } from '../../core/types';
import { dialog } from '../../core/dialog/dialog';

export const ChangePassword = (): JSX.Element => {
  const form = useForm(formModel);
  const navigate = useNavigate();

  function onSubmitError(err: Error) {
    dialog.alert({ title: 'Failed to change password', message: err.error });
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

  const formIsValid = form.isValid && form.controls.password.value === form.controls.confirm_new_password.value;

  return (
    <BottomStatic>
      <div className={css.top}>
        <Header onBack={() => navigate({ to: '/jobs' })} height="auto" title="Change Password" />
        <div className={css.header}></div>
        <form className={css.form}>
          <Input
            autoComplete="password"
            register={form}
            name="current_password"
            label="Current password"
            type="password"
            placeholder="Current password"
          />
          <Input
            autoComplete="new-password"
            register={form}
            name="password"
            label="New password"
            type="password"
            placeholder="New password"
          />
          <Input
            autoComplete="new-password"
            register={form}
            name="confirm_new_password"
            label="Confirm new password"
            type="password"
            placeholder="Confirm new password"
          />
        </form>
      </div>
      <div>
        <div className={css.bottom}>
          <Button disabled={!formIsValid} onClick={onSubmit()} color="blue">
            Change your password
          </Button>
        </div>
      </div>
    </BottomStatic>
  );
};
