import css from './change-password.module.scss';
import { Button } from '@atoms/button/button';
import { Header } from '@atoms/header/header';
import { Input } from '@atoms/input/input';
import { BottomStatic } from '../../components/templates/bottom-static/bottom-static';
import { useChangePasswordShared } from './change-password.shared';

export const ChangePassword = (): JSX.Element => {
  const { form, navigateToJobs, onSubmit, formIsValid } = useChangePasswordShared();
  return (
    <BottomStatic>
      <div className={css.top}>
        <Header onBack={navigateToJobs} height="auto" title="Change Password" />
        <div className={css.header}></div>
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
        </form>
      </div>
      <div>
        <div className={css.bottom}>
          <Button disabled={!formIsValid} onClick={onSubmit()} color="blue">
            Change your password
          </Button>
        </div>
      </div>
    </BottomStatic>
  );
};
