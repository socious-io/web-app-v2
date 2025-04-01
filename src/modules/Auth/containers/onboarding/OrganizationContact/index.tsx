import { ORGANIZATION_SIZE } from 'src/constants/ORGANIZATION_SIZE';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import css from './contact.module.scss';
import { useOrganizationContact } from './useOrganizationContact';
export const OrganizationContact = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    searchCities,
    updateWebsite,
    updateEmail,
    onSelectCity,
    onSelectSize,
    isFormValid,
    isUsernameValid,
    updateUsername,
    isShortnameValid,
    searchIndustries,
    onSelectIndustry,
    cityValue,
    industry,
    email,
    username,
    website,
    translate,
    orgSizeOptions,
  } = useOrganizationContact();
  return (
    <div className={`lg:pt-9 sm:pt-14 px-4 ${css.container}`}>
      <div className={css.header}>
        <h1 className={css.title}>{translate('onboarding-org-logo-title')}</h1>
        <h2 className={css.description}>{translate('onboarding-org-contact-subtitle')}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          onChange={e => updateEmail(e.target.value)}
          autoComplete="Email"
          label={translate('onboarding-org-email')}
          value={email}
          name="email"
          register={register}
          placeholder={translate('onboarding-org-email-placeholder')}
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <div className="mt-5">
          <Input
            id="username"
            label={translate('onboarding-org-username')}
            name="username"
            value={username}
            onChange={e => updateUsername(e.target.value)}
            register={register}
            placeholder={translate('onboarding-org-username-placeholder')}
            validMessage={translate('onboarding-org-username-valid')}
            hints={[
              {
                hint: translate('onboarding-org-username-hint'),
                hide: !isShortnameValid,
              },
            ]}
            // prefix="socious.io/"
            isValid={isUsernameValid}
            errors={errors['username']?.message ? [errors['username']?.message.toString()] : undefined}
          />
        </div>
        <SearchDropdown
          id="city"
          placeholder={translate('onboarding-city-placeholder')}
          isAsync
          loadOptions={searchCities}
          className="my-5"
          icon="search-lg"
          hasDropdownIcon={false}
          label={translate('onboarding-city-label')}
          value={cityValue}
          onChange={value => onSelectCity(value)}
        />
        <SearchDropdown
          id="industry"
          placeholder={translate('onboarding-industry-placeholder')}
          isAsync
          loadOptions={searchIndustries}
          className="my-5"
          icon="search-lg"
          hasDropdownIcon={false}
          label={translate('onboarding-industry-label')}
          value={industry === '' ? null : { label: industry }}
          onChange={value => onSelectIndustry(value)}
        />
        <SearchDropdown
          id="size"
          className="mb-5"
          label={translate('onboarding-org-size')}
          placeholder={translate('onboarding-org-placeholder')}
          options={orgSizeOptions}
          isSearchable={false}
          onChange={value => onSelectSize(value)}
        />
        <Input
          id="website"
          autoComplete="Website"
          onChange={e => updateWebsite(e.target.value)}
          value={website}
          label={translate('onboarding-website-label')}
          name="website"
          register={register}
          placeholder="www.website.com"
          prefix="https://"
        />
        <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ${css.footer}`}>
          <Button data-testid="next-button" disabled={!isFormValid} color="primary" block onClick={handleSubmit(onSubmit)}>
            {translate('onboarding-continue')}
          </Button>
        </div>
      </form>
    </div>
  );
};
