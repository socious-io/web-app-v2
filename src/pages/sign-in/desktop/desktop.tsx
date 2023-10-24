import { Button } from 'src/components/atoms/button/button';
import { NewInput } from 'src/components/atoms/input/refactored/input';
import { Link } from 'src/components/atoms/link/link';
import { Typography } from 'src/components/atoms/typography/typography';
import { BottomStatic } from 'src/components/templates/bottom-static/bottom-static';

import css from './desktop.module.scss';
import { useSignInShared } from '../sign-in.shared';

export const Desktop = (): JSX.Element => {
  const { onLogin, handleSubmit, navigate, register, errors, isValid } = useSignInShared();
  return (
    <BottomStatic>
      <div className={css.top}>
        <div className={css.header}>
          <Typography marginBottom=".5rem" type="heading" size="l">
            Sign in to Socious
          </Typography>
        </div>
        <form className={css.formContainer}>
          <NewInput
            {...register('email')}
            autoComplete="Email"
            label="Email"
            name="email"
            placeholder="Email"
            register={register}
            errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
          />
          <NewInput
            {...register('password')}
            autoComplete="current-password"
            type="password"
            label="Password"
            name="password"
            placeholder="Password"
            register={register}
            errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
          />
        </form>
        <div className={css.forgotPassword}>
          <Link onClick={() => navigate('/forget-password/email')}>Forgot your password?</Link>
        </div>
      </div>
      <div>
        <div className={css.bottom}>
          <Button disabled={!isValid} onClick={handleSubmit(onLogin)}>
            Sign in
          </Button>
          <Typography marginTop="1rem">
            <span>Not a member? </span>
            <Link onClick={() => navigate('/sign-up/user/email')}>Sign up</Link>
          </Typography>
        </div>
      </div>
    </BottomStatic>
  );
};
