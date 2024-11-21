import React from 'react';
import { Experience } from 'src/core/api';
import { translate } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Button } from 'src/modules/general/components/Button';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { useExperienceDetails } from './useExperienceDetails';

interface ExperienceDetailsProps {
  open: boolean;
  handleClose: () => void;
  experience: Experience;
  onUpdateExperience?: (experience: Experience) => void;
  avatarInfo?: { url: string; first_name: string; last_name: string; username: string } | null;
  readonly?: boolean;
}
export const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({
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
    handleSubmit,
    onSave,
    startDateErrors,
    endDateErrors,
    volunteer,
    handleCheckVolunteer,
  } = useExperienceDetails(handleClose, experience, onUpdateExperience);

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
        label={translate('cred-job-title')}
        required
        name="title"
        register={register}
        placeholder={translate('cred-job-title-placeholder')}
        errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
        disabled={readonly}
      />
      <SearchDropdown
        id="job-category"
        value={category}
        label={translate('cred-job-cat')}
        options={jobCategories}
        icon="search-lg"
        hasDropdownIcon={false}
        onChange={value => {
          onChangeCategory(value);
        }}
        className="flex-1"
        isSearchable
        errors={errors['jobCategory']?.label?.message ? [errors['jobCategory']?.label.message.toString()] : undefined}
        placeholder={translate('cred-job-cat-placeholder')}
        isDisabled={readonly}
      />
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium leading-5 text-Gray-light-mode-700">{translate('cred-volunteer')}</p>
        <Checkbox
          id="volunteer-experience"
          label={translate('cred-yes')}
          checked={volunteer}
          onChange={e => handleCheckVolunteer(e.target.checked)}
          value
          disabled={readonly}
        />
      </div>
      <SearchDropdown
        id="employment-type"
        value={employmentTypeVal}
        placeholder={translate('cred-emp-type-placeholder')}
        label={translate('cred-employment-type')}
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
          name={translate('cred-week-hours')}
          register={register}
          label={translate('cred-week-hours-label')}
          postfix={translate('cred-week-hours-postfix')}
          noBorderPostfix
          disabled={readonly}
        />
      )}
      {employmentTypeVal?.value === 'ONE_OFF' && (
        <Input
          id="total-hours"
          name="totalHours"
          register={register}
          label={translate('cred-total-hours')}
          postfix={translate('cred-total-hours-postfix')}
          noBorderPostfix
          disabled={readonly}
        />
      )}
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="start-month"
          value={startMonth}
          label={translate('cred-start-date')}
          options={months}
          hasDropdownIcon
          onChange={value => {
            onSelectStartMonth(value);
          }}
          className="flex-1"
          placeholder={translate('cred-month')}
          isSearchable
          errors={startDateErrors ? [startDateErrors.toString()] : undefined}
          isDisabled={readonly}
          maxMenuHeight={200}
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
          placeholder={translate('cred-day')}
          isDisabled={readonly}
          maxMenuHeight={200}
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
          placeholder={translate('cred-year')}
          isSearchable
          isDisabled={readonly}
          maxMenuHeight={200}
        />
      </div>
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="end-month"
          value={endMonth}
          label={translate('cred-end-date')}
          options={months}
          hasDropdownIcon
          onChange={value => {
            onSelectEndMonth(value);
          }}
          placeholder={translate('cred-month')}
          className="flex-1"
          isSearchable
          errors={endDateErrors ? [endDateErrors.toString()] : undefined}
          isDisabled={readonly}
          maxMenuHeight={200}
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
          placeholder={translate('cred-day')}
          className="flex-1"
          isDisabled={readonly}
          maxMenuHeight={200}
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
          placeholder={translate('cred-year')}
          isSearchable
          isDisabled={readonly}
          maxMenuHeight={200}
        />
      </div>
    </div>
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(onSave)}>
        {translate('cred-send')}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleClose}>
        {translate('cred-cancel')}
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={translate('cred-details')}
      content={contentJSX}
      footer={readonly ? <></> : modalFooterJsx}
    />
  );
};
