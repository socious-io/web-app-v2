import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import { useUserDetails } from './useUserDetails';
export const UserDetails = () => {
  const { register, handleSubmit, onSubmit, errors, isUsernameValid, isFormValid, currentProfile } = useUserDetails();
  const { last_name, first_name } = currentProfile.current;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="first-name"
          autoComplete="first"
          label="First name*"
          name="firstName"
          defaultValue={first_name}
          register={register}
          placeholder="Your first name"
          errors={errors['firstName']?.message ? [errors['firstName']?.message.toString()] : undefined}
        />
        <div className="mt-4">
          <Input
            id="last-name"
            label="Last name*"
            name="lastName"
            defaultValue={last_name}
            register={register}
            placeholder="Your last name"
            errors={errors['lastName']?.message ? [errors['lastName']?.message.toString()] : undefined}
          />
        </div>
        <div className="mt-4">
          <Input
            id="username"
            label="Username*"
            name="username"
            register={register}
            placeholder="Username"
            validMessage="Username available"
            hints={[
              {
                hint: `Lowercase letters, digits, '.', '_', and '-'; must be 6-24 characters.`,
                hide: !isUsernameValid,
              },
            ]}
            // prefix="socious.io/"
            isValid={isUsernameValid}
            errors={errors['username']?.message ? [errors['username']?.message.toString()] : undefined}
          />
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
