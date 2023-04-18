import css from './desktop.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../components/atoms/button/button';
import { Input } from '../../../components/atoms/input/input';
import { Link } from '../../../components/atoms/link/link';
import { Typography } from '../../../components/atoms/typography/typography';
import { BottomStatic } from '../../../components/templates/bottom-static/bottom-static';
import { endpoint } from '../../../core/endpoints';
import { formModel } from '../sign-in.form';
import { useForm } from '../../../core/form';
import { getFormValues } from '../../../core/form/customValidators/formValues';
import { LoginPayload } from '../sign-in.types';
import { handleError } from '../../../core/http';
import { getIdentities } from '../../../core/api';
import { setIdentityList } from '../../../store/reducers/identity.reducer';
import store from '../../../store/store';
import { LoginResp } from 'src/core/types';
import { setAuthCookies } from '../sign-in.services';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const form = useForm(formModel);

  async function onLoginSucceed(loginResp: LoginResp) {
    await setAuthCookies(loginResp);
    const resp = await getIdentities();
    store.dispatch(setIdentityList(resp));
    navigate({ to: '/jobs', replace: true });
  }

  async function onLogin() {
    const formValues = getFormValues(form) as LoginPayload;
    endpoint.post.auth
      .login(formValues)
      .then(onLoginSucceed)
      .catch(handleError({ title: 'Login Failed' }));
  }

  return (
    <BottomStatic>
      <div className={css.top}>
        <div className={css.header}>
          <Typography marginBottom=".5rem" type="heading" size="l">
            Sign in to Socious
          </Typography>
        </div>
        <form className={css.formContainer}>
          <Input register={form} autoComplete="Email" label="Email" name="email" placeholder="Email" />
          <Input
            register={form}
            autoComplete="current-password"
            type="password"
            label="Password"
            name="password"
            placeholder="Password"
          />
        </form>
        <div className={css.forgotPassword}>
          <Link onClick={() => navigate({ to: '/forget-password/email' })}>Forgot your password?</Link>
        </div>
      </div>
      <div>
        <div className={css.bottom}>
          <Button disabled={!form.isValid} onClick={onLogin}>
            Sign in
          </Button>
          <Typography marginTop="1rem">
            <span>Not a member? </span>
            <Link onClick={() => navigate({ to: '/sign-up/user/email' })}>Sign up</Link>
          </Typography>
        </div>
      </div>
    </BottomStatic>
  );
};
