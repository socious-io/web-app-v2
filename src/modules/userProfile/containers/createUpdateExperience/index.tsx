import React from 'react';
import { useTranslation } from 'react-i18next';
import { Experience } from 'src/core/api';
import { Button } from 'src/modules/general/components/Button';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { useCreateUpdateExperience } from './useCreateUpdateExperience';

interface CreateUpdateExperienceProps {
  open: boolean;
  handleClose: () => void;
  experience?: Experience;
  readonly?: boolean;
}
export const CreateUpdateExperience: React.FC<CreateUpdateExperienceProps> = ({
  open,
  handleClose,
  experience,
  readonly,
}) => {
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
    startDateErrors,
    endDateErrors,
    volunteer,
    handleCheckVolunteer,
  } = useCreateUpdateExperience(handleClose, experience);
  const { t } = useTranslation('profile');
  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-5 overflow-y-auto">
      <Input
        id="title"
        label={t('job_title_header')}
        required
        name="title"
        register={register}
        placeholder={t('enterJobTitleText')}
        errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
        disabled={readonly}
      />
      <SearchDropdown
        id="job-category"
        value={category}
        label={t('jobCategoryLabel')}
        options={jobCategories}
        icon="search-lg"
        hasDropdownIcon={false}
        onChange={value => {
          onChangeCategory(value);
        }}
        className="flex-1"
        isSearchable
        errors={errors['jobCategory']?.label?.message ? [errors['jobCategory']?.label.message.toString()] : undefined}
        placeholder="Search for job category"
        isDisabled={readonly}
      />
      <SearchDropdown
        id="company"
        cacheOptions
        value={companyVal}
        placeholder="Search for company"
        isAsync
        creatable
        loadOptions={searchCompanies}
        defaultOptions
        icon="search-lg"
        hasDropdownIcon={false}
        label={t('companyLabel')}
        onChange={value => {
          onSelectCompany(value);
        }}
        errors={errors['org']?.label?.message ? [errors['org']?.label?.message.toString()] : undefined}
        isDisabled={readonly}
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
        label={t('locationLabel')}
        onChange={value => {
          onSelectCity(value);
        }}
        errors={errors['city']?.label?.message ? [errors['city']?.label?.message.toString()] : undefined}
        isDisabled={readonly}
      />
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium leading-5 text-Gray-light-mode-700">{t('volunteerExperienceLabel')}</p>
        <Checkbox
          id="volunteer-experience"
          label={t('yesText')}
          checked={volunteer}
          onChange={e => handleCheckVolunteer(e.target.checked)}
          value
          disabled={readonly}
        />
      </div>
      <SearchDropdown
        id="employment-type"
        value={employmentTypeVal}
        placeholder="Please select"
        label={t('employment_type')}
        options={employmentTypes}
        icon="search-lg"
        hasDropdownIcon={false}
        onChange={value => {
          onSelectEmplymentType(value);
        }}
        className="flex-1"
        isSearchable
        errors={
          errors['employmentType']?.label?.message ? [errors['employmentType']?.label?.message.toString()] : undefined
        }
        isDisabled={readonly}
      />
      <Checkbox
        id="currently-working"
        label={t('currentlyWorkingText')}
        checked={currentlyWorking}
        onChange={e => handleCheckWorking(e.target.checked)}
        value
        disabled={readonly}
      />
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="start-month"
          value={startMonth}
          label={t('startDateLabel')}
          options={months}
          hasDropdownIcon
          onChange={value => {
            onSelectStartMonth(value);
          }}
          className="flex-1"
          placeholder="Month"
          isSearchable
          errors={startDateErrors ? [startDateErrors.toString()] : undefined}
          isDisabled={readonly}
        />
        <SearchDropdown
          id="start-year"
          value={startYear}
          options={years}
          hasDropdownIcon
          onChange={value => {
            onSelectStartYear(value);
          }}
          label="&nbsp;"
          className="flex-1"
          placeholder="Year"
          isSearchable
          isDisabled={readonly}
        />
      </div>
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="end-month"
          value={endMonth}
          label={t('endDateLabel') + (!currentlyWorking ? '*' : '')}
          options={months}
          hasDropdownIcon
          onChange={value => {
            onSelectEndMonth(value);
          }}
          placeholder="Month"
          className="flex-1"
          isSearchable
          errors={endDateErrors ? [endDateErrors.toString()] : undefined}
          isDisabled={currentlyWorking || readonly}
        />
        <SearchDropdown
          id="end-year"
          label="&nbsp;"
          value={endYear}
          options={years}
          hasDropdownIcon
          onChange={value => {
            onSelectEndYear(value);
          }}
          className="flex-1"
          placeholder="Year"
          isSearchable
          isDisabled={currentlyWorking || readonly}
        />
      </div>
      <Input
        id="description"
        name="description"
        label={t('descriptionLabel')}
        multiline
        customHeight="130px"
        register={register}
        placeholder={t('experience_description_details')}
      />
    </div>
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(onSave)}>
        {experience ? t('saveText') : t('addExperience')}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleClose}>
        {t('cancelText')}
      </Button>
      {experience && (
        <Button
          variant="text"
          color="primary"
          customStyle="ml-0 mr-auto text-Gray-light-mode-600 w-full md:w-fit"
          onClick={onDelete}
        >
          {t('deleteExperienceText')}
        </Button>
      )}
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={experience ? t('editExperienceText') : t('addExperienceText')}
      subTitle={experience ? '' : t('shareWorkProfileText')}
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};
