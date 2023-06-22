import { Button } from 'src/components/atoms/button/button';
import { Input } from 'src/components/atoms/input/input';
import { usePasswordShared } from '../password.shared';
import css from './mobile.module.scss';

export const Mobile = () => {
  const { backToPerviousPage, form, formIsValid, onChangePassword } = usePasswordShared();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div onClick={backToPerviousPage}>
          <img src="/icons/chevron-left.svg" />
        </div>
      </div>
      <div className={css.main}>
        <span className={css.title}>Reset your password </span>
        <div className={css.newPassword}>
          <Input type="password" register={form} name="newPassword" placeholder="New password" label="New password" />
          <Input
            type="password"
            register={form}
            name="confirmPassword"
            placeholder="Confirm new password"
            label="Confirm new password"
          />
        </div>
      </div>
      <div className={css.footer}>
        <Button disabled={!formIsValid} color="blue" onClick={onChangePassword}>
          Change your password
        </Button>
      </div>
    </div>
  );
};
