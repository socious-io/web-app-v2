import { Button } from 'src/components/atoms/button/button';
import { Header } from 'src/components/atoms/header-v2/header';
import { Input } from 'src/components/atoms/input/input';
import { Modal } from 'src/components/templates/modal/modal';
import { dialog } from 'src/core/dialog/dialog';
import { printWhen } from 'src/core/utils';
import { useChangePasswordShared } from 'src/pages/change-password/change-password.shared';

import css from './change-password-modal.module.scss';
import { ChangePasswordModalProps } from './change-password-types';

export const ChangePasswordModal = (props: ChangePasswordModalProps): JSX.Element => {
  const { form, notMatchingPasswords, formIsValid, onSubmitDesktop } = useChangePasswordShared();

  function onChangePasswordSubmit() {
    const cb = () =>
      dialog.alert({ title: 'Successful', message: 'Password has been successfully changed' }).then(props.onClose);
    onSubmitDesktop(cb);
  }

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
          <Button disabled={!formIsValid} onClick={onChangePasswordSubmit} color="blue">
            Change your password
          </Button>
        </div>
      </div>
    </Modal>
  );
};
