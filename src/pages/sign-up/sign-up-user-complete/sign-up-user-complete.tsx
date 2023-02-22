import css from './sign-up-user-complete.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../components/atoms/button/button';
import { Link } from '../../../components/atoms/link/link';
import { Typography } from '../../../components/atoms/typography/typography';
import { BottomStatic } from '../../../components/templates/bottom-static/bottom-static';
import { Input } from '../../../components/atoms/input/input';
import { PasswordQuality } from '../../../components/atoms/password-quality/password-quality';
import { passwordQualityValidators } from './sign-up-user.complete.services';
import { registerUser } from './sign-up-user-complete.services';
import { useForm } from '../../../core/form';
import { formModel } from '../sign-up-user-email/sign-up-user-email.form';

export const SignUpUserComplete = (): JSX.Element => {
  const navigate = useNavigate();
  const form = useForm(formModel);
  //   const [formState, dispatch] = useReducer(reducer, formInitialState);
  //   const basicValidity = formState.firstName && formState.lastName && formState.password;

  //   function updateForm(field: keyof typeof formInitialState) {
  //     return (e: ChangeEvent<HTMLInputElement>) => {
  //       dispatch({ type: field, value: e.target.value });
  //     };
  //   }

  function onSubmit(form) {
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
          <Input autoComplete="firstName" label="Your First Name" placeholder="First name" />
          <Input autoComplete="lastName" label="Your Last Name" placeholder="Last name" />
          <Input type="password" label="Choose a Password" autoComplete="new-password" placeholder="Password" />
        </form>
        <div className={css.passwordQuality}>
          <PasswordQuality value={''} validators={passwordQualityValidators} />
        </div>

        <div className={css.passwordQuality}>
          <Typography textAlign="center" paddingBottom="1rem">
            By signing up, you agree to Socious' <Link onClick={console.log}>Terms of Service</Link> and{' '}
            <Link onClick={console.log}>Privacy Policy</Link>
          </Typography>
        </div>
      </div>
      <div>
        <div className={css.bottom}>
          {/* <Button disabled={!basicValidity} onClick={onSubmit(formState)}>
            Join
          </Button> */}
          <Button>Join</Button>
          <Typography marginTop="1rem">
            <span>Already a member? </span>
            <Link onClick={() => navigate({ to: '/sign-in' })}>Sign in</Link>
          </Typography>
        </div>
      </div>
    </BottomStatic>
  );
};
