import { useReducer } from 'react';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { PasswordQuality } from '../../atoms/password-quality/password-quality';
import { Typography } from '../../atoms/typography/typography';
import { BottomStatic } from '../../templates/bottom-static/bottom-static';
import css from './change-password.module.scss';
import {
  changePassword,
  formInitialState,
  passwordQualityValidators,
  reducer,
} from './change-password.services';

export const ChangePassword = (): JSX.Element => {
  const [formState, dispatch] = useReducer(reducer, formInitialState);

  function updateForm(field: keyof typeof formInitialState) {
    return (value: string) => {
      dispatch({ type: field, value });
    };
  }

  function onSubmit() {
    const payload = {
      current_password: formState.currentPassword,
      password: formState.newPassword,
    };
    return () => changePassword(payload).then(console.log);
  }

  return (
    <BottomStatic>
      <div className={css.top}>
        <div className={css.header}>
          <Typography marginBottom=".5rem" type="heading" size="l">
            Change Password
          </Typography>
          <Typography color="var(--color-gray-01)" type="body">
            Change Password
          </Typography>
        </div>
        <form className={css.form}>
          <Input
            onValueChange={updateForm('currentPassword')}
            label="Current password"
            type="password"
            placeholder="Current password"
          />
          <Input
            onValueChange={updateForm('newPassword')}
            label="New password"
            type="password"
            placeholder="New password"
          />
          <Input
            onValueChange={updateForm('confirmPassword')}
            label="Confirm new password"
            type="password"
            placeholder="Confirm new password"
          />
          <PasswordQuality
            value={formState.newPassword}
            validators={passwordQualityValidators}
          />
        </form>
      </div>
      <div>
        <div className={css.bottom}>
          <Button onClick={onSubmit()} color="blue">
            Change your password
          </Button>
        </div>
      </div>
    </BottomStatic>
  );
};
