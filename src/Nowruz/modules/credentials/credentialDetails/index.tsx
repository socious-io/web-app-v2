import React from 'react';
import { Experience } from 'src/core/api';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { useCredentialDetails } from './useCredentialDetails';

interface CredentialDetailsProps {
  open: boolean;
  handleClose: () => void;
  experience?: Experience;
  onUpdateExperience?: (experience: Experience) => void;
  avatarInfo?: { url: string; first_name: string; last_name: string; username: string } | null;
  readonly?: boolean;
}
export const CredentialDetails: React.FC<CredentialDetailsProps> = ({
  open,
  handleClose,
  experience,
  onUpdateExperience,
  avatarInfo,
  readonly,
}) => {
  const {
    jobCategories,
    category,
    register,
    errors,
    onChangeCategory,
    employmentTypeVal,
    employmentTypes,
    onSelectEmplymentType,
    years,
    months,
    startDays,
    endDays,
    startMonth,
    startDay,
    startYear,
    endMonth,
    endDay,
    endYear,
    onSelectStartMonth,
    onSelectStartDay,
    onSelectStartYear,
    onSelectEndMonth,
    onSelectEndDay,
    onSelectEndYear,
    currentlyWorking,
    handleSubmit,
    onSave,
    dateError,
    volunteer,
    handleCheckVolunteer,
  } = useCredentialDetails(handleClose, experience, onUpdateExperience);

  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-5 overflow-y-auto">
      <div className="flex flex-[2_2_0%] justify-start items-center gap-3">
        <Avatar size="48px" type={'users'} img={avatarInfo?.url} />
        <div className="flex flex-col">
          <span className="leading-7 text-Gray-light-mode-900">
            {avatarInfo?.first_name} {avatarInfo?.last_name}
          </span>
          <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">@{avatarInfo?.username}</span>
        </div>
      </div>
      <Input
        id="title"
        label="Job title*"
        required
        name="title"
        register={register}
        placeholder="Enter job title"
        errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
        disabled={readonly}
      />
      <SearchDropdown
        id="job-category"
        value={category}
        label="Job category"
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
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium leading-5 text-Gray-light-mode-700">Volunteer experience?</p>
        <Checkbox
          id="volunteer-experience"
          label={'Yes'}
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
        label="Employment type*"
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
      {employmentTypeVal?.value === 'PART_TIME' && (
        <Input
          id="weekly-hours"
          name="weeklyHours"
          register={register}
          label="Estimated weekly hours"
          postfix="hrs/week"
          noBorderPostfix
          disabled={readonly}
        />
      )}
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="start-month"
          value={startMonth}
          label="Start date*"
          options={months}
          hasDropdownIcon
          onChange={value => {
            onSelectStartMonth(value);
          }}
          className="flex-1"
          placeholder="Month"
          isSearchable
          errors={errors['startMonth']?.label?.message ? [errors['startMonth']?.label?.message.toString()] : undefined}
          isDisabled={readonly}
        />
        <SearchDropdown
          id="start-day"
          value={startDay}
          options={startDays}
          hasDropdownIcon
          onChange={value => {
            onSelectStartDay(value);
          }}
          label="&nbsp;"
          className="flex-1"
          placeholder="Day"
          errors={errors['startDay']?.label?.message ? [errors['startDay']?.label?.message.toString()] : undefined}
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
          errors={errors['startYear']?.label?.message ? [errors['startYear']?.label?.message.toString()] : undefined}
          isDisabled={readonly}
        />
      </div>
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="end-month"
          value={endMonth}
          label={`End date${!currentlyWorking ? '*' : ''}`}
          options={months}
          hasDropdownIcon
          onChange={value => {
            onSelectEndMonth(value);
          }}
          placeholder="Month"
          className="flex-1"
          isSearchable
          errors={errors['endMonth']?.label?.message ? [errors['endMonth']?.label?.message.toString()] : undefined}
          isDisabled={currentlyWorking || readonly}
        />
        <SearchDropdown
          id="end-day"
          label="&nbsp;"
          value={endDay}
          options={endDays}
          hasDropdownIcon
          onChange={value => {
            onSelectEndDay(value);
          }}
          placeholder="Day"
          className="flex-1"
          errors={errors['endDay']?.label?.message ? [errors['endDay']?.label?.message.toString()] : undefined}
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
          errors={dateError ? [dateError] : undefined} //{errors['endYear']?.message ? [errors['endYear']?.message.toString()] : undefined}
          isDisabled={currentlyWorking || readonly}
        />
      </div>
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
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Credential details"
      content={contentJSX}
      footer={readonly ? <></> : modalFooterJsx}
    />
  );
};
