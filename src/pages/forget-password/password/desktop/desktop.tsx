import { Card } from 'src/components/atoms/card/card';
import { Input } from 'src/components/atoms/input/input';
import { Button } from 'src/components/atoms/button/button';
import { usePasswordShared } from '../password.shared';
import css from './desktop.module.scss';

export const Desktop: React.FC = () => {
  const { backToPerviousPage, form, formIsValid, onChangePassword } = usePasswordShared();

  return (
    <div className={css.container}>
      <Card className={css.card}>
        <div className={css.header}>
          <img src="/icons/chevron-left.svg" alt="back-icon" className={css.icon} onClick={backToPerviousPage} />
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
      </Card>
    </div>
  );
};
