import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IdentityReq } from '../../../core/types';
import { RootState } from '../../../store/store';
import { Button } from '@atoms/button/button';
import { Input } from '@atoms/input/input';
import { deleteAccount, login } from '../delete-profile.service';
import css from './password.module.scss';
import { useForm } from '../../../core/form';
import { formModel } from './password.form';
import { handleError } from '../../../core/http';

export const Password = () => {
  const navigate = useNavigate();
  const form = useForm(formModel);
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const email = identity.meta.email;

  const backToPerviousPage = () => {
    navigate({ to: '../delete' });
  };

  const deleteMyAccount = () => {
    login(email, form.controls.password.value)
      .then((resp) => {
        if (resp.message === 'success') {
          deleteAccount().then((resp) => {
            if (resp.message === 'success') {
              navigate({ to: `../confirm?email=${email}` });
            }
          });
        }
      })
      .catch(handleError({message: 'Not matched password'}));
  };

  const cancel = () => {
    navigate({ to: '../../jobs' });
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
