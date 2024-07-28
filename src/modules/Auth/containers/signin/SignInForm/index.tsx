import { Typography } from '@mui/material';
import { Apple } from 'public/icons/dynamic/apple';
import { Google } from 'public/icons/dynamic/google';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/modules/general/components/Button';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Input } from 'src/modules/general/components/input/input';
import { Link } from 'src/modules/general/components/link';
import variables from 'src/styles/constants/_exports.module.scss';

import { useSignInForm } from './useSignInForm';
// import { LinkedIn } from 'public/icons/dynamic/linkedin';

interface SignInFormProps {
  event: { id: string; name: string };
}

export const SignInForm: React.FC<SignInFormProps> = ({ event }) => {
  const { register, errors, keepLoggedIn, handleChange, handleSubmit, onLogin, tried, translate } = useSignInForm(
    event.id,
  );
  const navigate = useNavigate();

  return (
    <>
      <form className="flex flex-col gap-6 my-8 ">
        <div className="flex flex-col gap-[20px]">
          <Input
            id="email"
            autoComplete="Email"
            label={translate('login-email')}
            name="email"
            register={register}
            placeholder={translate('login-email-placeholder')}
            errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
          />
          <Input
            autoComplete="current-password"
            id="password"
            type="password"
            label={translate('login-password')}
            name="password"
            register={register}
            placeholder={translate('login-password-placeholder')}
            errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
          />
        </div>
        <div className="flex flex-row">
          <Checkbox
            id="Keep_me_logged_in"
            label={translate('login-checkbox-keep-logged-in')}
            value={keepLoggedIn}
            onChange={handleChange}
          />
          <div className="w-fit mr-0 ml-auto flex items-center">
            <Link
              href="/forget-password/email"
              label={translate('login-forget-password')}
              customStyle="!font-semibold"
              onClick={() => event.name && localStorage.setItem('event_name', event.name)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button color="primary" onClick={handleSubmit(onLogin)}>
            {translate('login-continue')}
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              tried();
              navigate(`/oauth/google${event.name && `?event_name=${event.name}`}`);
            }}
            fullWidth
            customStyle="flex gap-3 mt-3"
          >
            <Google />
            {translate('login-continue-google')}
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              tried();
              navigate(`/oauth/apple${event.name && `?event_name=${event.name}`}`);
            }}
            fullWidth
            customStyle="flex gap-3 mt-3"
          >
            <Apple />
            Continue with Apple
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
          {translate('login-not-account')}
        </Typography>
        <Link
          label={translate('login-sign-up')}
          href={event.name ? `/sign-up/user/email?event_name=${event.name}` : '/intro'}
          customStyle="!font-semibold"
          onClick={() => event.name && localStorage.setItem('registerFor', 'user')}
        />
      </div>
    </>
  );
};
