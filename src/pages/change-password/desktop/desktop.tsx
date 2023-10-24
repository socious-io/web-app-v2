import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { Header } from 'src/components/atoms/header-v2/header';
import { Input } from 'src/components/atoms/input/input';
import { BottomStatic } from 'src/components/templates/bottom-static/bottom-static';
import { printWhen } from 'src/core/utils';

import css from './desktop.module.scss';
import { useChangePasswordShared } from '../change-password.shared';

export const Desktop = (): JSX.Element => {
  const { form, onSubmit, formIsValid, notMatchingPasswords } = useChangePasswordShared();
  return (
    <div className={css.container}>
      <Card>
        <Header title="Change Password" />
        <form className={css.form}>
          <Input
            autoComplete="password"
            register={form}
            name="current_password"
            label="Current password"
            type="password"
            placeholder="Current password"
          />
          <Input
            autoComplete="new-password"
            register={form}
            name="password"
            label="New password"
            type="password"
            placeholder="New password"
          />
          <Input
            autoComplete="new-password"
            register={form}
            name="confirm_new_password"
            label="Confirm new password"
            type="password"
            placeholder="Confirm new password"
          />
          {printWhen(<p className={css.passNotMatch}>- Passwords do not match</p>, notMatchingPasswords)}
        </form>
        <div>
          <div className={css.bottom}>
            <Button disabled={!formIsValid} onClick={onSubmit()} color="blue">
              Change your password
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
