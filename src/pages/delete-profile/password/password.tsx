import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/atoms/button/button';
import { Input } from 'src/components/atoms/input/input';
import { CurrentIdentity, handleError } from 'src/core/api';
import { useForm } from 'src/core/form';
import { RootState } from 'src/store';

import { formModel } from './password.form';
import css from './password.module.scss';
import { deleteAccount, login } from '../delete-profile.service';

export const Password = () => {
  const navigate = useNavigate();
  const form = useForm(formModel);
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const email = identity?.meta.email;

  const backToPerviousPage = () => {
    navigate('../delete');
  };

  const deleteMyAccount = () => {
    login(email!, form.controls.password.value)
      .then((resp) => {
        if (resp.access_token) {
          deleteAccount().then((resp) => {
            if (resp.message === 'success') {
              navigate(`../confirm?email=${email}`);
            }
          });
        }
      })
      .catch(handleError({ message: 'Not matched password' }));
  };

  const cancel = () => {
    navigate('../../jobs');
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div onClick={backToPerviousPage}>
          <img src="/icons/chevron-left.svg" />
        </div>
      </div>
      <div className={css.main}>
        <div className={css.content}>
          <span className={css.title}>Delete account </span>
          <span className={css.text}>Please enter your password to delete your account. </span>
        </div>
        <div className={css.input}>
          <Input type="password" register={form} name="password" placeholder="Enter password" label="Enter password" />
        </div>
      </div>
      <div className={css.footer}>
        <Button disabled={!form.isValid} color="red" onClick={deleteMyAccount}>
          Delete my account
        </Button>
        <Button color="white" onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
