import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../components/atoms/button/button';
import { Input } from '../../../components/atoms/input/input';
import { handleError } from '../../../core/api';
import { useForm } from '../../../core/form';
import { forgetPassword } from '../forget-password.service';
import { formModel } from './email.form';
import css from './email.module.scss';

export const Email = () => {
  const navigate = useNavigate();
  const form = useForm(formModel);

  const navigateToOtp = () => {
    const email = form.controls.email.value;
    forgetPassword(email)
      .then((resp) => {
        if (resp.message === 'success') {
          navigate({ to: `../otp?email=${email}` });
        }
      })
      .catch(handleError('Failed'));
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <img onClick={() => navigate({ to: '/sign-in' })} src="/icons/chevron-left.svg" alt="" />
      </div>
      <div className={css.main}>
        <div className={css.forgetPass}>
          <div className={css.title}>Forget your password?</div>
          <div className={css.input}>
            <Input register={form} name="email" variant="outline" placeholder="Email" label="Email" />
          </div>
        </div>
      </div>
      <div className={css.footer}>
        <Button color="blue" onClick={navigateToOtp} disabled={!form.isValid}>
          Get a verification code
        </Button>
      </div>
    </div>
  );
};
