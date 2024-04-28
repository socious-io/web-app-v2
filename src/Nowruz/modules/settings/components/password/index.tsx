import { Button } from 'src/Nowruz/modules/general/components/Button/index';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import css from './password.module.scss';
import { usePassword } from './usePassword';

const Password = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isFormValid,
    reset,
    isPasswordPatternValid,
    isPasswordLengthValid,
    alertContent,
  } = usePassword();

  return (
    <>
      <div className="border border-solid border-t-0 border-x-0 pb-5 border-Gray-light-mode-200">
        <div className="w-full items-center">
          <h2 className="grow css.title text-lg font-semibold">Password</h2>
          <p className="text-sm font-normal text-Gray-light-mode-600 pt-1">
            Please enter your current password to change your password. If you have signed up via Google, please log out
            and use “forgot password” to reset your password.{' '}
          </p>
        </div>
      </div>
      <form id="passwordForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          {(errors.password?.message || '') in alertContent ? (
            <div className={css.passwordWarning}>
              <FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />
              <span className="text-sm font-semibold">{alertContent[errors.password?.message || '']}</span>
            </div>
          ) : null}
        </div>

        <div className={css.borderSection}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <label>Current password</label>
            <div className="col-span-2">
              <Input
                id="current_password"
                autoComplete="current_password"
                register={register}
                name="current_password"
                type="password"
                placeholder="Current password"
              />
            </div>
          </div>
        </div>
        <div className={css.borderSection}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <label>New password</label>
            <div className="col-span-2">
              <div>
                <Input id="password" type="password" name="password" register={register} placeholder="New password" />
              </div>
              <div className={`${css.validation} mt-4`}>
                {
                  <div>
                    <img
                      className="mr-1"
                      src={!isPasswordLengthValid ? '/icons/grey-check.svg' : '/icons/green-check.svg'}
                      alt="check"
                    />
                    Must be at least 8 characters
                  </div>
                }
              </div>
              <div className={`${css.validation} mt-2`}>
                <img
                  className="mr-1"
                  src={!isPasswordPatternValid ? '/icons/grey-check.svg' : '/icons/green-check.svg'}
                  alt="check"
                />
                Must contain one special character
              </div>
            </div>
          </div>
        </div>
        <div className={css.borderSection}>
          <div className="grid grid-cols-1 lg:grid-cols-5  gap-4 ">
            <label>Confirm new password</label>
            <div className="col-span-2">
              <div>
                <Input
                  autoComplete="confirm"
                  register={register}
                  name="confirm"
                  id="confirm"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
              <div>
                <div className={`${css.validation} mt-2 mb-4`}>
                  <img
                    className="mr-1"
                    src={!errors.confirm ? '/icons/green-check.svg' : '/icons/grey-check.svg'}
                    alt="check"
                  />
                  Passwords match
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 place-items-end pt-8">
          <div className="flex gap-4">
            <Button color="info" onClick={() => reset()}>
              Cancel
            </Button>

            <Button disabled={!isFormValid} color="primary" block onClick={handleSubmit(onSubmit)}>
              Update Password
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Password;
