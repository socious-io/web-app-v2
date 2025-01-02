import React from 'react';
import { translate } from 'src/core/utils';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Button } from 'src/modules/general/components/Button';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import { useVerifyEducationModal } from './useVerifyEducationModal';
import { OptionType, VerifyEducationModalProps } from './verifyEducationModal.types';

export const VerifyEducationModal: React.FC<VerifyEducationModalProps> = ({
  open,
  handleClose,
  onVerifyEducation,
  organization,
  education,
}) => {
  const {
    register,
    errors,
    days,
    months,
    years,
    day,
    month,
    year,
    forgotInfo,
    handleSubmit,
    onSend,
    onSelectDay,
    onSelectMonth,
    onSelectYear,
    handleForgotInfo,
    subtitle,
    accountItem,
    dateErrors,
  } = useVerifyEducationModal(handleClose, onVerifyEducation, organization, education);

  const footerJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button fullWidth variant="contained" color="primary" onClick={handleSubmit(onSend)}>
        {translate('verifyEducationModal.send')}
      </Button>
      <Button fullWidth variant="outlined" color="primary" onClick={handleClose}>
        {translate('verifyEducationModal.cancel')}
      </Button>
    </div>
  );

  const avatarJsx = (
    <div className="flex flex-col gap-[6px]">
      <span className="font-medium text-sm leading-5 text-Gray-light-mode-700">
        {translate('verifyEducationModal.sendToLabel')}
      </span>
      <AvatarLabelGroup account={accountItem} avatarSize={'48px'} customStyle="!p-0" />
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={
        <div className="flex flex-col items-start">
          <Icon name="shield-tick" className="p-3 mb-4 border border-solid border-Gray-light-mode-200 rounded-lg" />
          {translate('verifyEducationModal.requestCertificate')}
        </div>
      }
      subTitle={subtitle}
      footer={footerJsx}
      mobileFullHeight
      headerDivider
      footerDivider
      id={'VerifyEducationModal'}
      customStyle="!max-w-[540px]"
    >
      <div className="py-5 px-4 md:px-6 flex flex-col gap-4">
        {organization.verified ? (
          avatarJsx
        ) : (
          <Input
            id="email"
            label={translate('verifyEducationModal.emailLabel')}
            required
            name="email"
            register={register}
            placeholder={translate('verifyEducationModal.emailPlaceholder')}
            startIcon={<Icon name="user-01" fontSize={20} color={variables.color_grey_500} />}
            errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
          />
        )}
        <Input
          id="credential-name"
          label={translate('verifyEducationModal.credentialNameLabel')}
          required
          name="credentialName"
          register={register}
          errors={errors['credentialName']?.message ? [errors['credentialName']?.message.toString()] : undefined}
        />
        <div className="flex gap-4 items-start">
          <SearchDropdown
            id="month"
            value={month}
            label={translate('verifyEducationModal.awardedDateLabel')}
            options={months}
            hasDropdownIcon
            onChange={value => onSelectMonth(value as OptionType)}
            className="flex-1"
            placeholder={translate('verifyEducationModal.monthPlaceholder')}
            isSearchable
            errors={dateErrors ? [dateErrors.toString()] : undefined}
            maxMenuHeight={200}
          />
          <SearchDropdown
            id="day"
            value={day}
            options={days}
            hasDropdownIcon
            onChange={value => onSelectDay(value as OptionType)}
            label="&nbsp;"
            className="flex-1"
            placeholder={translate('verifyEducationModal.dayPlaceholder')}
            maxMenuHeight={200}
          />
          <SearchDropdown
            id="year"
            value={year}
            options={years}
            hasDropdownIcon
            onChange={value => onSelectYear(value as OptionType)}
            label="&nbsp;"
            className="flex-1"
            placeholder={translate('verifyEducationModal.yearPlaceholder')}
            isSearchable
            maxMenuHeight={200}
          />
        </div>
        <div className="flex flex-col">
          <Checkbox
            id="forgot-info"
            label={translate('verifyEducationModal.forgotInfo')}
            checked={forgotInfo}
            onChange={e => handleForgotInfo(e.target.checked)}
            value
          />
          <span className="text-sm ml-6 text-Gray-light-mode-600">
            {translate('verifyEducationModal.forgotInfoHint')}
          </span>
        </div>
        <Input
          id="message"
          name="message"
          label={translate('verifyEducationModal.messageLabel')}
          multiline
          customHeight="130px"
          register={register}
          placeholder={translate('verifyEducationModal.messagePlaceholder')}
          errors={errors['message']?.message ? [errors['message']?.message.toString()] : undefined}
        />
      </div>
    </Modal>
  );
};
