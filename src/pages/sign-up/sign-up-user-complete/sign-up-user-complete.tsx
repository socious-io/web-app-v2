import css from './sign-up-user-complete.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../components/atoms/button/button';
import { Link } from '../../../components/atoms/link/link';
import { Typography } from '../../../components/atoms/typography/typography';
import { BottomStatic } from '../../../components/templates/bottom-static/bottom-static';
import { Input } from '../../../components/atoms/input/input';
import { changePasswordDirect } from './sign-up-user-complete.services';
import { useForm } from '../../../core/form';
import { formModel } from './sign-up-user-complete.form';
import { handleError } from '../../../core/http';
import { getIdentities } from '../../../core/api';
import { updateProfile } from './sign-up-user.complete.services';
import { useDispatch } from 'react-redux';
import { setIdentityList } from '../../../store/reducers/identity.reducer';

export const SignUpUserComplete = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm(formModel);

  async function setProfileName() {
    const identities = await getIdentities();
    dispatch(setIdentityList(identities));
    const username = identities.find((identity) => identity.current)?.meta.username;

    const payload = {
      username,
      firstName: form.controls.firstName.value,
      lastName: form.controls.lastName.value,
    };
    updateProfile(payload);
  }

  async function onSubmit() {
    const password = form.controls.password.value as string;
    changePasswordDirect(password)
      .then(setProfileName)
      .then(() => navigate({ to: '/jobs' }))
      .catch(handleError());
  }

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
            register={form}
            name="firstName"
            autoComplete="firstName"
            label="Your First Name"
            placeholder="First name"
          />
          <Input register={form} name="lastName" autoComplete="lastName" label="Your Last Name" placeholder="Last name" />
          <Input
            register={form}
            name="password"
            type="password"
            label="Choose a Password"
            autoComplete="new-password"
            placeholder="Password"
          />
        </form>
        {/* <div className={css.passwordQuality}>
          <PasswordQuality value={form.controls.password.value} validators={passwordQualityValidators} />
        </div> */}

        <div className={css.passwordQuality}>
          <Typography textAlign="center" paddingBottom="1rem">
            By signing up, you agree to Socious'{' '}
            <Link onClick={() => navigate({ to: '/terms-conditions' })}>Terms of Service</Link> and{' '}
            <Link onClick={() => navigate({ to: '/privacy-policy' })}>Privacy Policy</Link>
          </Typography>
        </div>
      </div>
      <div>
        <div className={css.bottom}>
          {/* <Button disabled={!basicValidity} onClick={onSubmit(formState)}>
            Join
          </Button> */}
          <Button onClick={onSubmit} disabled={!form.isValid}>
            Join
          </Button>
          <Typography marginTop="1rem">
            <span>Already a member? </span>
            <Link onClick={() => navigate({ to: '/sign-in' })}>Sign in</Link>
          </Typography>
        </div>
      </div>
    </BottomStatic>
  );
};
