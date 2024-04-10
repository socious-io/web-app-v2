import React from 'react';
import { Experience } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { useVerifyExperience } from './useVerifyExperience';

interface VerifyExperienceProps {
  open: boolean;
  handleClose: () => void;
  onVerifyExperience: (id: string, message?: string, exact_info?: boolean) => void;
  experience?: Experience;
}
export const VerifyExperience: React.FC<VerifyExperienceProps> = ({
  open,
  handleClose,
  onVerifyExperience,
  experience,
}) => {
  const {
    register,
    errors,
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
    forgotInfo,
    handleForgotInfo,
    currentlyWorking,
    handleSubmit,
    onSave,
    dateError,
  } = useVerifyExperience(handleClose, onVerifyExperience, experience);

  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-5 overflow-y-auto">
      <Input
        id="title"
        label="Job title*"
        required
        name="title"
        register={register}
        placeholder="Enter job title"
        errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
      />
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
          isDisabled={currentlyWorking}
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
          isDisabled={currentlyWorking}
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
          isDisabled={currentlyWorking}
        />
      </div>
      <div className="flex flex-col">
        <Checkbox
          id="forgot-info"
          label="I don’t remember my exact information"
          checked={forgotInfo}
          onChange={e => handleForgotInfo(e.target.checked)}
          value
        />
        <span className="text-sm ml-6 text-Gray-light-mode-600">These information will be requested</span>
      </div>
      <Input
        id="message"
        name="message"
        label="Message*"
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
        Send
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
      title={
        <div className="flex flex-col items-start">
          <Icon name="shield-tick" className="p-3 mb-4 border border-solid border-Gray-light-mode-200 rounded-lg" />{' '}
          Verify experience
        </div>
      }
      subTitle="Confirm your information and send a request to UNHCR to verify your experience."
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};
