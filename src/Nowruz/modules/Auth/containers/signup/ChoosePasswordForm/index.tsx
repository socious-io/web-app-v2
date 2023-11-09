import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import css from './choose-password.module.scss';
import { useChoosePassword } from './useChoosePassword';
export const ChoosePasswordForm = () => {
  const { register, errors, onSubmit, handleSubmit, isFormValid, isPasswordLengthValid, isPasswordPatternValid } =
    useChoosePassword();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-8'>
          <Input type="password" name="password" register={register} placeholder="Choose a password" />
        </div>
        <div className="mt-4">
          <Input type="password" name="confirm" register={register} placeholder="Confirm password" />
        </div>
        <div>
          <div className={`${css.validation} mt-4`}>
            <img
              className="mr-1"
              src={isPasswordLengthValid ? '/icons/green-check.svg' : '/icons/grey-check.svg'}
              alt="check"
            />
            Must be at least 8 characters
          </div>
          <div className={`${css.validation} mt-2 mb-4`}>
            <img
              className="mr-1"
              src={isPasswordPatternValid ? '/icons/green-check.svg' : '/icons/grey-check.svg'}
              alt="check"
            />
            Must contain one special character
          </div>
        </div>
        <div className="mt-8">
          <Button disabled={!isFormValid} color="primary" block onClick={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </div>
      </form>
    </>
  );
};
