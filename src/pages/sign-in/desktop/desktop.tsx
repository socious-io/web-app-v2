import css from './desktop.module.scss';
import { Button } from '@atoms/button/button';
import { Input } from '@atoms/input/input';
import { Link } from '@atoms/link/link';
import { Typography } from '@atoms/typography/typography';
import { BottomStatic } from '@templates/bottom-static/bottom-static';
import { useSignInShared } from '../sign-in.shared';

export const Desktop = (): JSX.Element => {
  const { onLogin, form, navigate } = useSignInShared();

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
