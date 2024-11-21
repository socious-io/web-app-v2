import React from 'react';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';

import css from './choose-password.module.scss';
import { useChoosePassword } from './useChoosePassword';
export const ChoosePasswordForm = () => {
  const {
    register,
    errors,
    onSubmit,
    handleSubmit,
    isFormValid,
    isPasswordLengthValid,
    isPasswordPatternValid,
    translate,
  } = useChoosePassword();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8">
          <Input
            id="password"
            type="password"
            name="password"
            register={register}
            placeholder={translate('sign-up-password')}
          />
        </div>
        <div className="mt-4">
          <Input
            id="confirm-password"
            type="password"
            name="confirm"
            register={register}
            placeholder={translate('sign-up-password-confirm')}
          />
        </div>
        <div>
          <div className={`${css.validation} mt-4`}>
            <img
              className="mr-1"
              src={isPasswordLengthValid ? '/icons/check-circle-green.svg' : '/icons/check-circle-grey.svg'}
              alt="check"
            />
            {translate('sign-up-password-error-length')}
          </div>
          <div className={`${css.validation} mt-2 mb-4`}>
            <img
              className="mr-1"
              src={isPasswordPatternValid ? '/icons/check-circle-green.svg' : '/icons/check-circle-grey.svg'}
              alt="check"
            />
            {translate('sign-up-password-error-weak')}
          </div>
        </div>
        <div className="mt-8">
          <Button disabled={!isFormValid} color="primary" block onClick={handleSubmit(onSubmit)}>
            {translate('sign-up-continue')}
          </Button>
        </div>
      </form>
    </>
  );
};
