import { Typography } from '@mui/material';
import { Key01 } from 'public/icons/nowruz/key-01';
import { BackLink } from 'src/Nowruz/general/BackLink';
import { Button } from 'src/Nowruz/general/Button';
import { Input } from 'src/Nowruz/general/input/input';
import css from 'src/Nowruz/pages/forget-password/forgetPassword.module.scss';

import { useEmail } from './useEmail';

export const Email = () => {
  const { register, errors, isValid, handleSubmit, navigateToOtp, onBack } = useEmail();
  return (
    <div className={css.container}>
      <div className="display:none md:flex-1 md:block" />
      <div className={`${css.main} p-8 pt-12 md:pt-24`}>
        <div className={css.icon}>
          <Key01 width={28} height={28} />
        </div>
        <div className={css.title}>
          <Typography variant="body1" className={css.grey900text} textAlign="center">
            Forgot Password?
          </Typography>
          <Typography variant="h5" className={css.grey600text} textAlign="center">
            No worries, we’ll send you reset instructions.
          </Typography>
        </div>
        <form className={css.form}>
          <Input
            name="email"
            register={register}
            autoComplete="Email"
            label="Email"
            placeholder="Email"
            errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
          />
          <Button disabled={!isValid} color="primary" onClick={handleSubmit(navigateToOtp)} className={css.button}>
            Continue
          </Button>
        </form>
        <BackLink
          title="Back to log in"
          onBack={onBack}
          variant="subtitle2"
          textAlign="center"
          className={css.grey600text}
        />
      </div>
      <div className="display:none md:flex-1 md:block" />
    </div>
  );
};
