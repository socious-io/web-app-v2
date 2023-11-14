import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import { useEmailForm } from './useEmailForm';

export const EmailForm = () => {
  const { register, errors, onSubmit, handleSubmit } = useEmailForm();
  const type = localStorage.getItem('registerFor');
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          autoComplete="Email"
          label={type === 'User' ? 'Email*' : 'Your work email*'}
          name="email"
          register={register}
          placeholder="Enter your email"
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <div className="mt-8">
          <Button color="primary" block onClick={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </div>
      </form>
    </>
  );
};
