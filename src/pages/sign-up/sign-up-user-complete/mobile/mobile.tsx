import { Button } from 'src/components/atoms/button/button';
import { Input } from 'src/components/atoms/input/input';
import { Link } from 'src/components/atoms/link/link';
import { Typography } from 'src/components/atoms/typography/typography';
import { BottomStatic } from 'src/components/templates/bottom-static/bottom-static';

import css from './mobile.module.scss';
import { useSignUpUserCompleteShared } from '../sign-up-user-complete.shared';

export const Mobile = (): JSX.Element => {
  const shared = useSignUpUserCompleteShared();

  return (
    <BottomStatic>
      <div className={css.top}>
        <div className={css.header}>
          <Typography marginBottom=".5rem" type="heading" size="l">
            Complete your profile
          </Typography>
          <Typography color="var(--color-gray-01)" type="body">
            What should we call you?
          </Typography>
        </div>
        <form className={css.formContainer}>
          <Input
            register={shared.form}
            name="firstName"
            autoComplete="firstName"
            label="Your First Name"
            placeholder="First name"
          />
          <Input
            register={shared.form}
            name="lastName"
            autoComplete="lastName"
            label="Your Last Name"
            placeholder="Last name"
          />
          <Input
            register={shared.form}
            name="password"
            type="password"
            label="Choose a Password"
            autoComplete="new-password"
            placeholder="Password"
          />
        </form>

        <div className={css.passwordQuality}>
          <Typography textAlign="center" paddingBottom="1rem">
            By signing up, you agree to Socious'{' '}
            <Link onClick={shared.navigateToTermsConditions}>Terms of Service</Link> and{' '}
            <Link onClick={shared.navigateToPrivacyPolicy}>Privacy Policy</Link>
          </Typography>
        </div>
      </div>
      <div>
        <div className={css.bottom}>

          <Button onClick={shared.onSubmit} disabled={!shared.form.isValid}>
            Join
          </Button>

          <Typography marginTop="1rem">
            <span>Already a member? </span>
            <Link onClick={shared.navigateToSignIn}>Sign in</Link>
          </Typography>
        </div>
      </div>
    </BottomStatic>
  );
};
