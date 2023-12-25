import React from 'react';
import { Experience } from 'src/core/api';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { useCreateUpdateExperience } from './useCreateUpdateExperience';

interface CreateUpdateExperienceProps {
  open: boolean;
  handleClose: () => void;
  experience?: Experience;
}
export const CreateUpdateExperience: React.FC<CreateUpdateExperienceProps> = ({ open, handleClose, experience }) => {
  const {
    jobCategories,
    category,
    register,
    errors,
    onChangeCategory,
    searchCompanies,
    companyVal,
    onSelectCompany,
    cityVal,
    searchCities,
    onSelectCity,
    employmentTypeVal,
    employmentTypes,
    onSelectEmplymentType,
    years,
    months,
    startMonth,
    startYear,
    endMonth,
    endYear,
    onSelectStartMonth,
    onSelectStartYear,
    onSelectEndMonth,
    onSelectEndYear,
    currentlyWorking,
    handleCheckWorking,
    handleSubmit,
    onSave,
    onDelete,
  } = useCreateUpdateExperience(handleClose, experience);
  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-5 overflow-y-auto">
      <Input
        id="title"
        label="Title*"
        required
        name="title"
        register={register}
        placeholder="What is your title?"
        errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
      />
      <SearchDropdown
        id="job-category"
        value={category}
        label="Job category"
        options={jobCategories}
        icon="search-lg"
        hasDropdownIcon={false}
        onChange={(value) => {
          onChangeCategory(value);
        }}
        className="flex-1"
        isSearchable
        errors={errors['jobCategory']?.message ? [errors['jobCategory']?.message.toString()] : undefined}
        placeholder="Search for job category"
      />
      <SearchDropdown
        required
        id="company"
        cacheOptions
        value={companyVal}
        isAsync
        loadOptions={searchCompanies}
        defaultOptions
        icon="search-lg"
        hasDropdownIcon={false}
        label="Company*"
        onChange={(value) => {
          onSelectCompany(value);
        }}
        placeholder="Search for company"
        noOptionsMessage={({ inputValue }) => inputValue}
        errors={errors['orgName']?.message ? [errors['orgName']?.message.toString()] : undefined}
      />

      <SearchDropdown
        id="city"
        cacheOptions
        value={cityVal}
        placeholder="Search for city"
        isAsync
        loadOptions={searchCities}
        defaultOptions
        icon="search-lg"
        hasDropdownIcon={false}
        label="Location"
        onChange={(value) => {
          onSelectCity(value);
        }}
        errors={errors['city']?.message ? [errors['city']?.message.toString()] : undefined}
      />
      <SearchDropdown
        id="employment-type"
        value={employmentTypeVal}
        placeholder="Please select"
        label="Employment type*"
        options={employmentTypes}
        icon="search-lg"
        hasDropdownIcon={false}
        onChange={(value) => {
          onSelectEmplymentType(value);
        }}
        className="flex-1"
        isSearchable
        errors={errors['employmentType']?.message ? [errors['employmentType']?.message.toString()] : undefined}
      />
      <Checkbox
        id="currently-working"
        label={'I am currently working in this role'}
        checked={currentlyWorking}
        onChange={handleCheckWorking}
      />
      <div className="flex gap-4 items-end">
        <SearchDropdown
          id="start-month"
          value={startMonth}
          label="Start date*"
          options={months}
          hasDropdownIcon
          onChange={(value) => {
            onSelectStartMonth(value);
          }}
          className="flex-1"
          placeholder="Month"
          isSearchable
          errors={errors['startMonth']?.message ? [errors['startMonth']?.message.toString()] : undefined}
        />
        <SearchDropdown
          required
          id="start-year"
          value={startYear}
          options={years}
          hasDropdownIcon
          onChange={(value) => {
            onSelectStartYear(value);
          }}
          className="flex-1"
          placeholder="Year"
          isSearchable
          errors={errors['startYear']?.message ? [errors['startYear']?.message.toString()] : undefined}
        />
      </div>
      <div className="flex gap-4 items-end">
        <SearchDropdown
          id="end-month"
          value={endMonth}
          label="End date"
          options={months}
          hasDropdownIcon
          onChange={(value) => {
            onSelectEndMonth(value);
          }}
          placeholder="Month"
          className="flex-1"
          isSearchable
          errors={errors['endMonth']?.message ? [errors['endMonth']?.message.toString()] : undefined}
          isDisabled={currentlyWorking}
        />
        <SearchDropdown
          id="end-year"
          value={endYear}
          options={years}
          hasDropdownIcon
          onChange={(value) => {
            onSelectEndYear(value);
          }}
          className="flex-1"
          placeholder="Year"
          isSearchable
          errors={errors['endYear']?.message ? [errors['endYear']?.message.toString()] : undefined}
          isDisabled={currentlyWorking}
        />
      </div>
      <Input
        id="description"
        name="description"
        label="Description"
        multiline
        customHeight="130px"
        register={register}
        placeholder="e.g. I joined Stripe’s Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
      />
    </div>
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(onSave)}>
        {experience ? 'Save' : 'Add experience'}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleClose}>
        Cancel
      </Button>
      {experience && (
        <Button
          variant="text"
          color="primary"
          customStyle="ml-0 mr-auto text-Gray-light-mode-600 w-full md:w-fit"
          onClick={onDelete}
        >
          Delete experience
        </Button>
      )}
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={experience ? 'Edit experience' : 'Add experience'}
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};
