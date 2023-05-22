import { Button } from 'src/components/atoms/button/button';
import css from './change-password-modal.module.scss';
import { Header } from 'src/components/atoms/header-v2/header';
import { Input } from 'src/components/atoms/input/input';
import { Modal } from 'src/components/templates/modal/modal';
import { printWhen } from 'src/core/utils';
import { useChangePasswordShared } from 'src/pages/change-password/change-password.shared';
import { ChangePasswordModalProps } from './change-password-types';

export const ChangePasswordModal = (props: ChangePasswordModalProps): JSX.Element => {
  const { form, notMatchingPasswords, onSubmit, formIsValid } = useChangePasswordShared();

  return (
    <Modal zIndex={3} height="38rem" width="28.75rem" open={props.open} onClose={props.onClose}>
      <div className={css.container}>
        <div>
          <Header title="Change Password" onBack={() => props.onClose()} />
        </div>
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
        <div className={css.bottom}>
          <Button disabled={!formIsValid} onClick={onSubmit()} color="blue">
            Change your password
          </Button>
        </div>
      </div>
    </Modal>
  );
};
