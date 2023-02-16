import css from './sign-in.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { Link } from '../../atoms/link/link';
import { Typography } from '../../atoms/typography/typography';
import { BottomStatic } from '../../templates/bottom-static/bottom-static';
import { accountInitialState, login } from './sign-in.services';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const SignIn = (): JSX.Element => {
  const { register, formState, handleSubmit } = useForm();
  const navigate = useNavigate();
  //   const [account, setAccount] = useState(accountInitialState);

  //   function updateAccount(field: keyof typeof accountInitialState) {
  //     return (value: string) => {
  //       setAccount({ ...account, [field]: value });
  //     };
  //   }

  function goToJobList(navigator: typeof navigate) {
    return (loginSucceed: boolean): void => {
      loginSucceed && navigator({ to: '/jobs', replace: true });
    };
  }

  async function signIn() {
    // login(account).then(goToJobList(navigate));
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
            variant="outline"
            autoComplete="username"
            label="Email"
            {...register('username', { required: true })}
            placeholder="Email"
          />
          <Input
            variant="outline"
            autoComplete="current-password"
            type="password"
            label="Password"
            errors={['blaaaaa']}
            {...register('password', { required: true })}
            placeholder="Password"
          />
        </form>
        <div className={css.forgotPassword}>
          <Link onClick={console.log}>Forgot your password?</Link>
        </div>
      </div>
      <div>
        <div className={css.bottom}>
          <Button onClick={signIn} color="blue">
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
