import { Typography } from '@mui/material';
import { Google } from 'public/icons/nowruz/google';
import { useNavigate } from 'react-router-dom';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Link } from 'src/Nowruz/modules/general/components/link';

import { useSignInForm } from './useSignInForm';
import { useCaptcha } from 'src/Nowruz/pages/captcha';
import { useEffect } from 'react';
// import { LinkedIn } from 'public/icons/nowruz/linkedin';

export const SignInForm = () => {
  const { register, errors, keepLoggedIn, handleChange, handleSubmit, onLogin } = useSignInForm();
  const navigate = useNavigate();
  const { tried, required } = useCaptcha();

  useEffect(() => {
    if (required) navigate('/captcha');
  }, [required]);

  return (
    <>
      <form className="flex flex-col gap-6 my-8 ">
        <div className="flex flex-col gap-[20px]">
          <Input
            id="email"
            autoComplete="Email"
            label="Email"
            name="email"
            register={register}
            placeholder="Enter your email"
            errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
          />
          <Input
            autoComplete="current-password"
            id="password"
            type="password"
            label="Password"
            name="password"
            register={register}
            placeholder="Enter your password"
            errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
          />
        </div>
        <div className="flex flex-row">
          <Checkbox id="Keep_me_logged_in" label={'Keep me logged in'} value={keepLoggedIn} onChange={handleChange} />
          <div className="w-fit mr-0 ml-auto flex items-center">
            <Link href="/forget-password/email" label="Forgot password" customStyle="!font-semibold" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            color="primary"
            onClick={() => {
              tried();
              handleSubmit(onLogin);
            }}
          >
            Continue
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              tried();
              navigate('/oauth/google');
            }}
            style={{ display: 'flex', gap: '12px' }}
          >
            <Google />
            Continue with Google
          </Button>
          {/*
            <Button variant="outlined" color="secondary" className={css.button}>
              <LinkedIn />
              <div className={css.buttonTitle}>Continue with LinkedIn</div>
            </Button> */}
        </div>
      </form>

      <div className="flex flex-row items-center justify-center gap-1">
        <Typography variant="caption" color={variables.color_grey_600}>
          Don't have an account?
        </Typography>
        <Link label=" Sign up" href="/intro" customStyle="!font-semibold" />
      </div>
    </>
  );
};
