import { Google } from 'public/icons/nowruz/google';
import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import { useEmailForm } from './useEmailForm';

export const EmailForm = () => {
  const { register, errors, onSubmit, handleSubmit, navigate } = useEmailForm();
  const type = localStorage.getItem('registerFor');
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          autoComplete="Email"
          label={type === 'user' ? 'Email*' : 'Your work email*'}
          name="email"
          register={register}
          placeholder="Enter your email"
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <div className=" flex flex-col gap-4 mt-8">
          <Button color="primary" block onClick={handleSubmit(onSubmit)}>
            Continue
          </Button>
          <Button color="primary" variant="outlined" onClick={() => navigate('/oauth/google')}>
            <Google />
            <div>Continue with Google</div>
          </Button>
        </div>
      </form>
    </>
  );
};
