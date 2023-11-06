import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import { useEmailForm } from './useEmailForm';

export const EmailForm = () => {

  const { register, errors, navigateToOtp, handleSubmit, onBack, getValues } = useEmailForm();

  return (
    <>
      <form className="my-8">
        <Input
          autoComplete="Email"
          label="Email"
          name="email"
          register={register}
          placeholder="Enter your email"
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <div className="mt-6">
          <Button color="primary" disabled={!getValues().email} block onClick={handleSubmit(navigateToOtp)}>
            Reset password
          </Button>
        </div>
      </form>
      <BackLink title="Back to log in" onBack={onBack} variant="subtitle2" textAlign="center" />
    </>
  );
};
