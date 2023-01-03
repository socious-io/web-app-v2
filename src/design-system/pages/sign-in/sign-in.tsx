import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { Link } from '../../atoms/link/link';
import { Typography } from '../../atoms/typography/typography';
import { BottomStatic } from '../../templates/bottom-static/bottom-static';
import css from './sign-in.module.scss';

export const SignIn = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <BottomStatic>
      <div className={css.top}>
        <div className={css.header}>
          <Typography marginBottom=".5rem" type="heading" size="l">
            Sign in to Socious
          </Typography>
        </div>
        <form className={css.formContainer}>
          <Input autoComplete="username" label="Email" placeholder="Email" />
          <Input
            autoComplete="current-password"
            type="password"
            label="Password"
            placeholder="Password"
          />
        </form>
        <div className={css.forgotPassword}>
          <Link onClick={console.log}>Forgot your password?</Link>
        </div>
      </div>
      <div>
        <div className={css.bottom}>
          <Button color="blue">Sign in</Button>
          <Typography marginTop="1rem">
            <span>Not a member? </span>
            <Link onClick={() => navigate({ to: '/sign-up/user/email' })}>
              Sign up
            </Link>
          </Typography>
        </div>
      </div>
    </BottomStatic>
  );
};
