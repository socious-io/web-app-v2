import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { InputDropDown } from 'src/Nowruz/modules/general/components/inputDropDown';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import css from './contact.module.scss';
import { useOrganizationContact } from './useOrganizationContact';
export const OrganizationContact = () => {
  const { register, handleSubmit, errors, onSubmit, companySizeOptions, setValue, searchCities, options } =
    useOrganizationContact();
  return (
    <div className="lg:pt-9 sm:pt-4 px-4">
      <div className={css.header}>
        <div className={css.title}>Tell us more about your organization</div>
        <div className={css.description}>Add your contact information</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          autoComplete="Email"
          label={'Your organization contact email*'}
          name="email"
          register={register}
          placeholder="Enter your email"
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <AsyncSelect
          placeholder="Search for a city"
          defaultValue={[]}
          cacheOptions
          loadOptions={searchCities}
          defaultOptions
          className="my-5"
          styles={{
            control: (provided) => ({
              ...provided,
              border: '1px solid #ccc',
              boxShadow: 'none',
            }),
            indicatorSeparator: () => ({ display: 'none' }),
            dropdownIndicator: () => ({ display: 'none' }),
          }}
          onChange={(value) => console.log(value)}
        />
        <Select
          className="mb-5"
          placeholder="Select a company size"
          options={companySizeOptions}
          isSearchable={false}
          onChange={(value) => setValue('size', value.value)}
        />
        <Input
          autoComplete="Website"
          label={'Website'}
          name="website"
          register={register}
          placeholder="www.website.com"
          prefix="https://"
          errors={errors['website']?.message ? [errors['website']?.message.toString()] : undefined}
        />
      </form>
      <div className="mt-6 mb-2">
        <Button color="primary" block onClick={handleSubmit(onSubmit)}>
          Continue
        </Button>
      </div>
    </div>
  );
};
