import { Typography } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import { useSignInForm } from './useSignInForm';

// import { Google } from 'public/icons/nowruz/google';
// import { LinkedIn } from 'public/icons/nowruz/linkedin';

export const SignInForm = () => {
  const {
    register,
    errors,
    keepLoggedIn,
    setKeepLoggedIn,
    navigateToForgetPassword,
    isValid,
    handleSubmit,
    onLogin,
    navigateToSignUp,
    getValues,
  } = useSignInForm();
  return (
    <>
      <form className="flex flex-col gap-6 my-8">
        <div className="flex flex-col gap-[20px]">
          <Input
            autoComplete="Email"
            label="Email"
            name="email"
            register={register}
            placeholder="Enter your email"
            errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
          />
          <Input
            autoComplete="current-password"
            type="password"
            label="Password"
            name="password"
            register={register}
            placeholder="Enter your password"
            errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
          />
        </div>
        <div className="flex flex-row">
          <Checkbox label={'Keep me logged in'} value={keepLoggedIn} onChange={() => setKeepLoggedIn(!keepLoggedIn)} />
          <div className="w-fit mr-0 ml-auto">
            <Button color="primary" variant="text" onClick={navigateToForgetPassword}>
              <Typography variant="subtitle2" color={variables.color_primary_700}>
                Forgot password
              </Typography>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button color="primary" onClick={handleSubmit(onLogin)}>
            Continue
          </Button>
          {/* <Button variant="outlined" color="secondary" className={css.button}>
              <Google />
              <div className={css.buttonTitle}>Continue with Google</div>
            </Button>
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

        <Button color="primary" variant="text" onClick={navigateToSignUp}>
          <Typography variant="subtitle2" color={variables.color_primary_700}>
            Sign up
          </Typography>
        </Button>
      </div>
    </>
  );
};
