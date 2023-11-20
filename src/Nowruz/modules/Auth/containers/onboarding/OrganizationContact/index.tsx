import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import css from './contact.module.scss';
import { useOrganizationContact } from './useOrganizationContact';
export const OrganizationContact = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    companySizeOptions,
    setValue,
    searchCities,
    updateWebsite,
    updateEmail,
    onSelectCity,
    onSelectSize,
    isFormValid,
  } = useOrganizationContact();
  return (
    <div className="lg:pt-9 sm:pt-4 px-4">
      <div className={css.header}>
        <h1 className={css.title}>Tell us more about your organization</h1>
        <h2 className={css.description}>Add your contact information</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          onChange={(e) => updateEmail(e.target.value)}
          autoComplete="Email"
          label={'Your organization contact email*'}
          name="email"
          register={register}
          placeholder="Enter your email"
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <SearchDropdown
          id="city"
          placeholder="Search for a city"
          cacheOptions
          isAsync
          loadOptions={searchCities}
          defaultOptions
          className="my-5"
          icon="search-lg"
          hasDropdownIcon={false}
          label="City*"
          onChange={(value) => onSelectCity(value)}
        />
        <SearchDropdown
          className="mb-5"
          label="Organization size*"
          placeholder="Select a company size"
          options={companySizeOptions}
          isSearchable={false}
          onChange={(value) => onSelectSize(value)}
        />
        <Input
          id="website"
          autoComplete="Website"
          onChange={(e) => updateWebsite(e.target.value)}
          label={'Website'}
          name="website"
          register={register}
          placeholder="www.website.com"
          prefix="https://"
        />
        <div className="fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ">
          <Button disabled={!isFormValid} color="primary" block onClick={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};
