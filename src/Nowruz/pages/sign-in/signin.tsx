import { Link, Typography } from '@mui/material';
import { Google } from 'public/icons/nowruz/google';
import { LinkedIn } from 'public/icons/nowruz/linkedin';
import { Button } from 'src/Nowruz/general/Button';
import { Checkbox } from 'src/Nowruz/general/checkbox/checkbox';
import { Input } from 'src/Nowruz/general/input/input';

import { Header } from './logo/header';
import css from './signin.module.scss';
import { useSignin } from './useSignin';

export const SignIn = () => {
  const { register, errors, isValid, handleSubmit, onLogin, keepLoggedIn, setKeepLoggedIn } = useSignin();
  return (
    <div className={css.container}>
      <div className="display:none md:flex-1 md:block" />
      <div className={css.main}>
        <Header />
        <form className={css.form}>
          <Input
            autoComplete="Email"
            label="Email"
            name="email"
            register={register}
            placeholder="Email"
            errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
          />
          <Input
            autoComplete="current-password"
            type="password"
            label="Password"
            name="password"
            register={register}
            placeholder="Password"
            errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
          />
          <div className={css.container}>
            <Checkbox
              label={'Keep me logged in'}
              value={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
            />
            <Link href="/forget-password" className={css.forgotPass}>
              Forgot password
            </Link>
          </div>
          <div className={css.action}>
            <Button disabled={!isValid} color="primary" onClick={handleSubmit(onLogin)} className={css.button}>
              Continue
            </Button>
            <Button variant="outlined" color="secondary" className={css.button}>
              <Google />
              <div className={css.buttonTitle}>Continue with Google</div>
            </Button>
            <Button variant="outlined" color="secondary" className={css.button}>
              <LinkedIn />
              <div className={css.buttonTitle}>Continue with LinkedIn</div>
            </Button>
          </div>
        </form>
        <div className={css.centeredDiv}>
          <Typography variant="caption" className={css.signupTitle}>
            Don't have an account?
          </Typography>
          <Link href="/sign-up/user/email" className={css.signup}>
            Sign up
          </Link>
        </div>
      </div>
      <div className="display:none md:flex-1 md:block" />
    </div>
  );
};
