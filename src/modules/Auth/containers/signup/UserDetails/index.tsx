import React from 'react';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';

import { useUserDetails } from './useUserDetails';

export const UserDetails = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isUsernameValid,
    isFormValid,
    currentProfile,
    translate,
    appleUser,
  } = useUserDetails();
  const { last_name, first_name } = currentProfile.current;

  const defaultFirstName = first_name || appleUser?.first_name || '';
  const defaultLastName = last_name || appleUser?.last_name || '';

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="first-name"
          autoComplete="first"
          label={translate('sign-up-user-detail-name')}
          name="firstName"
          defaultValue={defaultFirstName}
          register={register}
          placeholder={translate('sign-up-user-detail-name-placeholder')}
          errors={errors['firstName']?.message ? [errors['firstName']?.message.toString()] : undefined}
        />
        <div className="mt-4">
          <Input
            id="last-name"
            label={translate('sign-up-user-detail-last-name')}
            name="lastName"
            defaultValue={defaultLastName}
            register={register}
            placeholder={translate('sign-up-user-detail-last-name-placeholder')}
            errors={errors['lastName']?.message ? [errors['lastName']?.message.toString()] : undefined}
          />
        </div>
        <div className="mt-4">
          <Input
            id="username"
            label={translate('sign-up-user-username')}
            name="username"
            register={register}
            placeholder={translate('sign-up-user-username-placeholder')}
            validMessage={translate('sign-up-user-username-valid')}
            hints={[
              {
                hint: translate('sign-up-user-username-hint'),
                hide: !isUsernameValid,
              },
            ]}
            isValid={isUsernameValid}
            errors={errors['username']?.message ? [errors['username']?.message.toString()] : undefined}
          />
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
