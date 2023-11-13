import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FormCheck } from 'src/Nowruz/modules/general/components/FormCheck';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import { usePasswordForm } from './usePasswordForm';

export const PasswordForm = () => {
  const { register, errors, handleSubmit, validLength, specialChar, onChangePassword, onBack, isValid } =
    usePasswordForm();

  return (
    <div className="flex flex-col">
      <form className="my-8">
        <div className="flex flex-col gap-[20px]">
          <Input
            name="password"
            type="password"
            register={register}
            placeholder="Choose a new password"
            errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
          />
          <Input
            name="confirmPassword"
            type="password"
            register={register}
            placeholder="Confirm password"
            errors={errors['confirmPassword']?.message ? [errors['confirmPassword']?.message.toString()] : undefined}
          />
          <div className="flex flex-col gap-3 mb-6">
            <FormCheck passCondition={validLength} label={'Must be at least 8 characters'} />
            <FormCheck passCondition={specialChar} label={'Must contain one special character'} />
          </div>
        </div>
        <Button color="primary" block onClick={handleSubmit(onChangePassword)} disabled={!isValid}>
          Reset password
        </Button>
      </form>
      <BackLink title="Back to log in" onBack={onBack} variant="subtitle2" textAlign="center" />
    </div>
  );
};
