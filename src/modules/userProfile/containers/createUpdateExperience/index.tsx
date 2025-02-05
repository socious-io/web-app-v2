import React from 'react';
import { Experience } from 'src/core/api';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';
import CompanySearchDropdown from 'src/modules/general/containers/CompanySearchDropdown';

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

  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-5 overflow-y-auto">
      <Input
        id="title"
        label={translate('experience.title')}
        required
        name="title"
        register={register}
        placeholder={translate('experience.title.placeholder')}
        errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
        disabled={readonly}
      />
      <SearchDropdown
        id="job-category"
        value={category}
        label={translate('experience.jobCategory')}
        options={jobCategories}
        icon="search-lg"
        hasDropdownIcon={false}
        onChange={value => {
          onChangeCategory(value);
        }}
        className="flex-1"
        isSearchable
        errors={errors['jobCategory']?.label?.message ? [errors['jobCategory']?.label.message.toString()] : undefined}
        placeholder={translate('experience.jobCategory.placeholder')}
        isDisabled={readonly}
      />
      <CompanySearchDropdown
        onChange={onSelectCompany}
        value={companyVal}
        errors={errors['org']?.label?.message ? [errors['org']?.label?.message.toString()] : undefined}
      />
      <SearchDropdown
        id="city"
        isClearable
        value={cityVal}
        placeholder={translate('experience.city.placeholder')}
        isAsync
        loadOptions={searchCities}
        icon="search-lg"
        hasDropdownIcon={false}
        label={translate('experience.location')}
        onChange={value => {
          onSelectCity(value);
        }}
        errors={errors['city']?.label?.message ? [errors['city']?.label?.message.toString()] : undefined}
        isDisabled={readonly}
      />
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium leading-5 text-Gray-light-mode-700">{translate('experience.volunteer')}</p>
        <Checkbox
          id="volunteer-experience"
          label={translate('experience.volunteer.yes')}
          checked={volunteer}
          onChange={e => handleCheckVolunteer(e.target.checked)}
          value
          disabled={readonly}
        />
      </div>
      <SearchDropdown
        id="employment-type"
        value={employmentTypeVal}
        placeholder={translate('experience.employmentType.placeholder')}
        label={translate('experience.employmentType')}
        options={employmentTypes}
        icon="search-lg"
        hasDropdownIcon={false}
        onChange={onSelectEmplymentType}
        className="flex-1"
        isSearchable
        errors={
          errors['employmentType']?.label?.message ? [errors['employmentType']?.label?.message.toString()] : undefined
        }
        isDisabled={readonly}
      />
      <Checkbox
        id="currently-working"
        label={translate('experience.currentlyWorking')}
        checked={currentlyWorking}
        onChange={e => handleCheckWorking(e.target.checked)}
        value
        disabled={readonly}
      />
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="start-month"
          value={startMonth}
          label={translate('experience.startDate')}
          options={months}
          hasDropdownIcon
          onChange={onSelectStartMonth}
          className="flex-1"
          placeholder={translate('experience.startDate.month')}
          isSearchable
          errors={startDateErrors ? [startDateErrors.toString()] : undefined}
          isDisabled={readonly}
          maxMenuHeight={200}
        />
        <SearchDropdown
          id="start-year"
          value={startYear}
          options={years}
          hasDropdownIcon
          onChange={onSelectStartYear}
          label="&nbsp;"
          className="flex-1"
          placeholder={translate('experience.startDate.year')}
          isSearchable
          isDisabled={readonly}
          maxMenuHeight={200}
        />
      </div>
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="end-month"
          value={endMonth}
          label={translate('experience.endDate', { required: !currentlyWorking ? '*' : '' })}
          options={months}
          hasDropdownIcon
          onChange={onSelectEndMonth}
          placeholder={translate('experience.endDate.month')}
          className="flex-1"
          isSearchable
          errors={endDateErrors ? [endDateErrors.toString()] : undefined}
          isDisabled={currentlyWorking || readonly}
          maxMenuHeight={200}
        />
        <SearchDropdown
          id="end-year"
          label="&nbsp;"
          value={endYear}
          options={years}
          hasDropdownIcon
          onChange={onSelectEndYear}
          className="flex-1"
          placeholder={translate('experience.endDate.year')}
          isSearchable
          isDisabled={currentlyWorking || readonly}
          maxMenuHeight={200}
        />
      </div>
      <Input
        id="description"
        name="description"
        label={translate('experience.description')}
        multiline
        customHeight="130px"
        register={register}
        placeholder={translate('experience.description.placeholder')}
      />
    </div>
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(onSave)}>
        {translate(experience ? 'experience.save' : 'experience.add')}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleClose}>
        {translate('experience.cancel')}
      </Button>
      {experience && (
        <Button
          variant="text"
          color="primary"
          customStyle="ml-0 mr-auto text-Gray-light-mode-600 w-full md:w-fit"
          onClick={onDelete}
        >
          {translate('experience.delete')}
        </Button>
      )}
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={translate(experience ? 'experience.editTitle' : 'experience.addTitle')}
      subTitle={translate(experience ? '' : 'experience.addSubtitle')}
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};
