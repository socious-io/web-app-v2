import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button/index';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Input } from 'src/modules/general/components/input/input';

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
          <h2 className="grow css.title text-lg font-semibold">{translate('password.title')}</h2>
          <p className="text-sm font-normal text-Gray-light-mode-600 pt-1">{translate('password.description')}</p>
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
            <label>{translate('password.labels.currentPassword')}</label>
            <div className="col-span-2">
              <Input
                id="current_password"
                autoComplete="current_password"
                register={register}
                name="current_password"
                type="password"
                placeholder={translate('password.placeholders.currentPassword')}
              />
            </div>
          </div>
        </div>
        <div className={css.borderSection}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <label>{translate('password.labels.newPassword')}</label>
            <div className="col-span-2">
              <div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  register={register}
                  placeholder={translate('password.placeholders.newPassword')}
                />
              </div>
              <div className={`${css.validation} mt-4`}>
                <div>
                  <img
                    className="mr-1"
                    src={!isPasswordLengthValid ? '/icons/check-circle-grey.svg' : '/icons/check-circle-green.svg'}
                    alt="check"
                  />
                  {translate('password.validations.minLength')}
                </div>
              </div>
              <div className={`${css.validation} mt-2`}>
                <img
                  className="mr-1"
                  src={!isPasswordPatternValid ? '/icons/check-circle-grey.svg' : '/icons/check-circle-green.svg'}
                  alt="check"
                />
                {translate('password.validations.specialCharacter')}
              </div>
            </div>
          </div>
        </div>
        <div className={css.borderSection}>
          <div className="grid grid-cols-1 lg:grid-cols-5  gap-4 ">
            <label>{translate('password.labels.confirmPassword')}</label>
            <div className="col-span-2">
              <div>
                <Input
                  autoComplete="confirm"
                  register={register}
                  name="confirm"
                  id="confirm"
                  type="password"
                  placeholder={translate('password.placeholders.confirmPassword')}
                />
              </div>
              <div>
                <div className={`${css.validation} mt-2 mb-4`}>
                  <img
                    className="mr-1"
                    src={!errors.confirm ? '/icons/check-circle-green.svg' : '/icons/check-circle-grey.svg'}
                    alt="check"
                  />
                  {translate('password.validations.passwordsMatch')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 place-items-end pt-8">
          <div className="flex gap-4">
            <Button color="info" onClick={() => reset()}>
              {translate('password.buttons.cancel')}
            </Button>

            <Button
              data-testid="submit-button"
              disabled={!isFormValid}
              color="primary"
              block
              onClick={handleSubmit(onSubmit)}
            >
              {translate('password.buttons.update')}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Password;
