import css from './sign-up-user-complete.module.scss';
import { ChangeEvent, useReducer } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../atoms/button/button';
import { Link } from '../../../atoms/link/link';
import { Typography } from '../../../atoms/typography/typography';
import { BottomStatic } from '../../../templates/bottom-static/bottom-static';
import { Input } from '../../../atoms/input/input';
import { PasswordQuality } from '../../../atoms/password-quality/password-quality';
import {
  formInitialState,
  passwordQualityValidators,
  reducer,
} from './sign-up-user.complete.services';
import { registerUser } from './sign-up-user-complete.services';

export const SignUpUserComplete = (): JSX.Element => {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(reducer, formInitialState);
  const basicValidity = formState.firstName && formState.lastName && formState.password;

  function updateForm(field: keyof typeof formInitialState) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: field, value: e.target.value });
    };
  }

  function onSubmit(form: typeof formState) {
    const payload = {
      email: localStorage.getItem('email') as string,
      first_name: form.firstName,
      last_name: form.lastName,
    };
    return () => registerUser(payload).then(() => navigate({ to: '/jobs' }));
  }

  return (
    <BottomStatic>
      <div className={css.top}>
        <div className={css.header}>
          <Typography marginBottom=".5rem" type="heading" size="l">
            Complete your profile
          </Typography>
          <Typography color="var(--color-gray-01)" type="body">
            I believe we need some text here
          </Typography>
        </div>
        <form className={css.formContainer}>
          <Input
            value={formState.firstName}
            autoComplete="firstName"
            onChange={updateForm('firstName')}
            label="Your First Name"
            placeholder="First name"
          />
          <Input
            onChange={updateForm('lastName')}
            autoComplete="lastName"
            label="Your Last Name"
            placeholder="Last name"
          />
          <Input
            onChange={updateForm('password')}
            type="password"
            label="Choose a Password"
            autoComplete="new-password"
            placeholder="Password"
          />
        </form>
        <div className={css.passwordQuality}>
          <PasswordQuality value={formState.password} validators={passwordQualityValidators} />
        </div>

        <div className={css.passwordQuality}>
          <Typography textAlign="center">
            By signing up, you agree to Socious' <Link onClick={console.log}>Terms of Service</Link>{' '}
            and <Link onClick={console.log}>Privacy Policy</Link>
          </Typography>
        </div>
      </div>
      <div>
        <div className={css.bottom}>
          <Button disabled={!basicValidity} onClick={onSubmit(formState)}>
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
