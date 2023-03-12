import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../components/atoms/button/button';
import { Input } from '../../../components/atoms/input/input';
import css from './password.module.scss';
import { changePassword } from '../forget-password.service';
import { handleError } from '../../../core/http';
import { formModel } from './password.form';
import { useForm } from '../../../core/form';

export const Password = () => {
  const navigate = useNavigate();
  const form = useForm(formModel);
  const formIsValid = form.isValid && form.controls.newPassword.value === form.controls.confirmPassword.value;

  const onChangePassword = () => {
    changePassword(form.controls.confirmPassword.value)
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

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div onClick={backToPerviousPage}>
          <img src="/icons/chevron-left.svg" />
        </div>
      </div>
      <div className={css.main}>
        <span className={css.title}>Reset your password </span>
        <div className={css.newPassword}>
          <Input type="password" register={form} name="newPassword" placeholder="New password" label="New password" />
          <Input
            type="password"
            register={form}
            name="confirmPassword"
            placeholder="Confirm new password"
            label="Confirm new password"
          />
        </div>
      </div>
      <div className={css.footer}>
        <Button disabled={!formIsValid} color="blue" onClick={onChangePassword}>
          Change your password
        </Button>
      </div>
    </div>
  );
};
