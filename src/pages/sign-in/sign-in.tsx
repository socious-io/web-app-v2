import css from './sign-in.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../components/atoms/button/button';
import { Input } from '../../components/atoms/input/input';
import { Link } from '../../components/atoms/link/link';
import { Typography } from '../../components/atoms/typography/typography';
import { BottomStatic } from '../../components/templates/bottom-static/bottom-static';
import { useForm } from 'react-hook-form';
import { LoginPayload } from './sign-in.types';
import { login } from './sign-in.services';
import { REGEX } from '../../constants/REGEX';

export const SignIn = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const navigate = useNavigate();

  function goToJobList(navigator: typeof navigate) {
    return (loginSucceed: boolean): void => {
      loginSucceed && navigator({ to: '/jobs', replace: true });
    };
  }

  async function onLogin(credentials: LoginPayload) {
    login(credentials).then(goToJobList(navigate));
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
          <Input
            autoComplete="Email"
            label="Email"
            name="email"
            validations={{ pattern: REGEX.email }}
            register={register}
            placeholder="Email"
          />
          <Input
            autoComplete="current-password"
            type="password"
            label="Password"
            name="password"
            validations={{ minLength: 6 }}
            register={register}
            placeholder="Password"
          />
        </form>
        <div className={css.forgotPassword}>
          <Link onClick={console.log}>Forgot your password?</Link>
        </div>
      </div>
      <div>
        <div className={css.bottom}>
          <Button disabled={!isValid} onClick={handleSubmit(onLogin)}>
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
