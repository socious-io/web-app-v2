import React from 'react';
import { Education } from 'src/core/api';
import { translate } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { useEducationDetails } from './useEducationDetails';

interface EducationDetailsProps {
  open: boolean;
  handleClose: () => void;
  education: Education;
  onUpdateEducation?: (education: Education) => void;
  avatarInfo?: { url: string; first_name: string; last_name: string; username: string } | null;
  readonly?: boolean;
}

export const EducationDetails: React.FC<EducationDetailsProps> = ({
  open,
  handleClose,
  education,
  onUpdateEducation,
  avatarInfo,
  readonly,
}) => {
  const {
    register,
    errors,
    months,
    days,
    years,
    month,
    day,
    year,
    onSelectMonth,
    onSelectDay,
    onSelectYear,
    handleSubmit,
    onSend,
    dateErrors,
  } = useEducationDetails(handleClose, education, onUpdateEducation);

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
      <div>{education?.description}</div>
      <Input
        id="credentialName"
        label={translate('cred-name')}
        name="credentialName"
        register={register}
        placeholder={translate('cred-name-placeholder')}
        errors={errors['credentialName']?.message ? [errors['credentialName']?.message.toString()] : undefined}
        disabled={readonly}
      />
      <div className="flex gap-4 items-start">
        <SearchDropdown
          required
          id="month"
          value={month}
          label={translate('cred-award-date')}
          options={months}
          hasDropdownIcon
          onChange={value => {
            onSelectMonth(value);
          }}
          className="flex-1"
          placeholder={translate('cred-month')}
          isSearchable
          errors={dateErrors ? [dateErrors.toString()] : undefined}
          isDisabled={readonly}
          maxMenuHeight={200}
        />
        <SearchDropdown
          id="day"
          value={day}
          options={days}
          hasDropdownIcon
          onChange={value => {
            onSelectDay(value);
          }}
          label="&nbsp;"
          className="flex-1"
          placeholder={translate('cred-day')}
          isDisabled={readonly}
          maxMenuHeight={200}
        />
        <SearchDropdown
          required
          id="year"
          label="&nbsp;"
          value={year}
          options={years}
          hasDropdownIcon
          onChange={value => {
            onSelectYear(value);
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
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(onSend)}>
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
      title={translate('cred-req-detail')}
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};
