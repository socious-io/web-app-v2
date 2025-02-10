import React from 'react';
import { Education } from 'src/core/api';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { useCreateUpdateEducation } from './useCreateUpdateEducation';

interface CreateUpdateEducationProps {
  open: boolean;
  handleClose: () => void;
  education?: Education;
  readonly?: boolean;
  hasDeleteButton?: boolean;
  onAddEducation?: (education: Education, isEdit: boolean) => void;
}

export const CreateUpdateEducation: React.FC<CreateUpdateEducationProps> = ({
  open,
  handleClose,
  education,
  readonly,
  hasDeleteButton = true,
  onAddEducation,
}) => {
  const {
    schoolVal,
    searchSchools,
    onSelectSchool,
    errors,
    register,
    months,
    years,
    startMonth,
    startYear,
    endMonth,
    endYear,
    onSelectStartMonth,
    onSelectStartYear,
    onSelectEndMonth,
    onSelectEndYear,
    handleSubmit,
    onSave,
    onDelete,
    startDateErrors,
    endDateErrors,
  } = useCreateUpdateEducation(handleClose, education, onAddEducation);

  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-5 overflow-y-auto">
      <SearchDropdown
        id="school"
        value={schoolVal}
        isAsync
        creatable
        loadOptions={searchSchools}
        icon="search-lg"
        hasDropdownIcon={false}
        label={translate('createUpdateEducation.school.label')}
        onChange={onSelectSchool}
        placeholder={translate('createUpdateEducation.school.placeholder')}
        noOptionsMessage={({ inputValue }) => inputValue}
        errors={errors['school']?.label?.message ? [errors['school']?.label.message.toString()] : undefined}
        isDisabled={readonly}
      />
      <Input
        id="degree"
        label={translate('createUpdateEducation.degree.label')}
        name="degree"
        register={register}
        placeholder={translate('createUpdateEducation.degree.placeholder')}
        errors={errors['degree']?.message ? [errors['degree']?.message.toString()] : undefined}
        disabled={readonly}
      />
      <Input
        id="field-of-study"
        label={translate('createUpdateEducation.field.label')}
        name="field"
        register={register}
        placeholder={translate('createUpdateEducation.field.placeholder')}
        errors={errors['field']?.message ? [errors['field']?.message.toString()] : undefined}
        disabled={readonly}
      />
      <div className="flex gap-4 items-start">
        <SearchDropdown
          required
          id="start-month"
          value={startMonth}
          label={translate('createUpdateEducation.startDate.label')}
          options={months}
          hasDropdownIcon
          onChange={onSelectStartMonth}
          className="flex-1"
          placeholder={translate('createUpdateEducation.startDate.monthPlaceholder')}
          isSearchable
          errors={startDateErrors ? [startDateErrors.toString()] : undefined}
          isDisabled={readonly}
          maxMenuHeight={200}
        />
        <SearchDropdown
          required
          id="start-year"
          label="&nbsp;"
          value={startYear}
          options={years}
          hasDropdownIcon
          onChange={onSelectStartYear}
          className="flex-1"
          placeholder={translate('createUpdateEducation.startDate.yearPlaceholder')}
          isSearchable
          isDisabled={readonly}
          maxMenuHeight={200}
        />
      </div>
      <div className="flex gap-4 items-start">
        <SearchDropdown
          required
          id="end-month"
          value={endMonth}
          label={translate('createUpdateEducation.endDate.label')}
          options={months}
          hasDropdownIcon
          onChange={onSelectEndMonth}
          placeholder={translate('createUpdateEducation.endDate.monthPlaceholder')}
          className="flex-1"
          isSearchable
          errors={endDateErrors ? [endDateErrors.toString()] : undefined}
          isDisabled={readonly}
          maxMenuHeight={200}
        />
        <SearchDropdown
          required
          id="end-year"
          label="&nbsp;"
          value={endYear}
          options={years}
          hasDropdownIcon
          onChange={onSelectEndYear}
          className="flex-1"
          placeholder={translate('createUpdateEducation.endDate.yearPlaceholder')}
          isSearchable
          isDisabled={readonly}
          maxMenuHeight={200}
        />
      </div>
      <Input
        id="grade"
        label={translate('createUpdateEducation.grade.label')}
        name="grade"
        register={register}
        placeholder={translate('createUpdateEducation.grade.placeholder')}
        errors={errors['grade']?.message ? [errors['grade']?.message.toString()] : undefined}
        disabled={readonly}
      />
      <Input
        id="description"
        name="description"
        label={translate('createUpdateEducation.description.label')}
        multiline
        customHeight="130px"
        register={register}
        placeholder={translate('createUpdateEducation.description.placeholder')}
        disabled={readonly}
      />
    </div>
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(onSave)}>
        {education ? translate('createUpdateEducation.save') : translate('createUpdateEducation.add')}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleClose}>
        {translate('createUpdateEducation.cancel')}
      </Button>
      {hasDeleteButton && education && (
        <Button
          variant="text"
          color="primary"
          customStyle="ml-0 mr-auto text-Gray-light-mode-600 w-full md:w-fit"
          onClick={onDelete}
        >
          {translate('createUpdateEducation.delete')}
        </Button>
      )}
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={education ? translate('createUpdateEducation.edit') : translate('createUpdateEducation.add')}
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};
