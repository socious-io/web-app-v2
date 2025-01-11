import React from 'react';
import { Experience } from 'src/core/api';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { useVerifyExperience } from './useVerifyExperience';

interface VerifyExperienceProps {
  open: boolean;
  handleClose: () => void;
  experience: Experience;
  onVerifyExperience: (id: string, message?: string, exact_info?: boolean) => void;
}
export const VerifyExperience: React.FC<VerifyExperienceProps> = ({
  open,
  handleClose,
  experience,
  onVerifyExperience,
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
    handleSubmit,
    onSave,
    startDateErrors,
    endDateErrors,
  } = useVerifyExperience(handleClose, experience, onVerifyExperience);
  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-5 overflow-y-auto">
      <Input
        id="title"
        label={translate('verifyExperience.title')}
        required
        name="title"
        register={register}
        placeholder={translate('verifyExperience.title.placeholder')}
        errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
      />
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="start-month"
          value={startMonth}
          label={translate('verifyExperience.startDate')}
          options={months}
          hasDropdownIcon
          onChange={onSelectStartMonth}
          className="flex-1"
          placeholder={translate('verifyExperience.startDate.month')}
          isSearchable
          errors={startDateErrors ? [startDateErrors.toString()] : undefined}
          maxMenuHeight={200}
        />
        <SearchDropdown
          id="start-day"
          value={startDay}
          options={startDays}
          hasDropdownIcon
          onChange={onSelectStartDay}
          label="&nbsp;"
          className="flex-1"
          placeholder={translate('verifyExperience.startDate.day')}
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
          placeholder={translate('verifyExperience.startDate.year')}
          isSearchable
          maxMenuHeight={200}
        />
      </div>
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="end-month"
          value={endMonth}
          label={translate('verifyExperience.endDate')}
          options={months}
          hasDropdownIcon
          onChange={onSelectEndMonth}
          placeholder={translate('verifyExperience.endDate.month')}
          className="flex-1"
          isSearchable
          errors={endDateErrors ? [endDateErrors.toString()] : undefined}
          maxMenuHeight={200}
        />
        <SearchDropdown
          id="end-day"
          label="&nbsp;"
          value={endDay}
          options={endDays}
          hasDropdownIcon
          onChange={onSelectEndDay}
          placeholder={translate('verifyExperience.endDate.day')}
          className="flex-1"
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
          placeholder={translate('verifyExperience.endDate.year')}
          isSearchable
          maxMenuHeight={200}
        />
      </div>
      <div className="flex flex-col">
        <Checkbox
          id="forgot-info"
          label={translate('verifyExperience.forgotInfo')}
          checked={forgotInfo}
          onChange={e => handleForgotInfo(e.target.checked)}
          value
        />
        <span className="text-sm ml-6 text-Gray-light-mode-600">{translate('verifyExperience.forgotInfo.note')}</span>
      </div>
      <Input
        id="message"
        name="message"
        label={translate('verifyExperience.message')}
        multiline
        customHeight="130px"
        register={register}
        placeholder={translate('verifyExperience.message.placeholder')}
      />
    </div>
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(onSave)}>
        {translate('verifyExperience.send')}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleClose}>
        {translate('verifyExperience.cancel')}
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={
        <div className="flex flex-col items-start">
          <Icon name="shield-tick" className="p-3 mb-4 border border-solid border-Gray-light-mode-200 rounded-lg" />
          {translate('verifyExperience.titleModal')}
        </div>
      }
      subTitle={translate('verifyExperience.subtitle', { company: experience?.org.name })}
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};
