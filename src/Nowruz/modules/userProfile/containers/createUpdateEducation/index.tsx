import React from 'react';
import { AdditionalRes } from 'src/core/api/additionals/additionals.types';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { useCreateUpdateEducation } from './useCreateUpdateEducation';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

interface CreateUpdateEducationProps {
  open: boolean;
  handleClose: () => void;
  education?: AdditionalRes;
}

export const CreateUpdateEducation: React.FC<CreateUpdateEducationProps> = ({ open, handleClose, education }) => {
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
  } = useCreateUpdateEducation(handleClose, education);
  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-5 overflow-y-auto">
      <SearchDropdown
        required
        id="company"
        cacheOptions
        value={schoolVal}
        isAsync
        loadOptions={searchSchools}
        defaultOptions
        icon="search-lg"
        hasDropdownIcon={false}
        label="Company*"
        onChange={(value) => {
          onSelectSchool(value);
        }}
        noOptionsMessage={({ inputValue }) => inputValue}
        errors={errors['schoolName']?.message ? [errors['schoolName']?.message.toString()] : undefined}
      />
      <Input
        id="degree"
        label="Degree"
        name="degree"
        register={register}
        placeholder="Degree name"
        errors={errors['degree']?.message ? [errors['degree']?.message.toString()] : undefined}
      />
      <Input
        id="field-of-study"
        label="Field of study"
        name="field"
        register={register}
        placeholder="Specialities"
        errors={errors['field']?.message ? [errors['field']?.message.toString()] : undefined}
      />
      <div className="flex gap-4 items-end">
        <SearchDropdown
          required
          id="start-month"
          value={startMonth}
          label="Start date"
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
          required
          id="end-month"
          value={endMonth}
          label="End date*"
          options={months}
          hasDropdownIcon
          onChange={(value) => {
            onSelectEndMonth(value);
          }}
          placeholder="Month"
          className="flex-1"
          isSearchable
          errors={errors['endMonth']?.message ? [errors['endMonth']?.message.toString()] : undefined}
        />
        <SearchDropdown
          required
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
        />
      </div>
      <Input
        id="grade"
        label="Grade"
        name="grade"
        register={register}
        placeholder="Grade"
        errors={errors['grade']?.message ? [errors['grade']?.message.toString()] : undefined}
      />
      <Input
        id="description"
        name="description"
        label="Description"
        multiline
        customHeight="130px"
        register={register}
      />
    </div>
  );
  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(onSave)}>
        {education ? 'Save' : 'Add education'}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleClose}>
        Cancel
      </Button>
      {education && (
        <Button
          variant="text"
          color="primary"
          customStyle="ml-0 mr-auto text-Gray-light-mode-600 w-full md:w-fit"
          // onClick={onDelete}
        >
          Delete education
        </Button>
      )}
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={education ? 'Edit education' : 'Add education'}
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};
