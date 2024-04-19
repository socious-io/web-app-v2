import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { useVerifyEducationModal } from './useVerifyEducationModal';
import { OptionType, VerifyEducationModalProps } from './verifyEducationModal.types';

export const VerifyEducationModal: React.FC<VerifyEducationModalProps> = ({
  open,
  handleClose,
  education,
  organization,
  onSendRequest,
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
  } = useVerifyEducationModal(education, organization, handleClose, onSendRequest);

  const footerJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button fullWidth variant="contained" color="primary" onClick={handleSubmit(onSend)}>
        Send
      </Button>
      <Button fullWidth variant="outlined" color="primary" onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );
  const avatarJsx = (
    <div className="flex flex-col gap-[6px]">
      <span className="font-medium text-sm leading-5 text-Gray-light-mode-700">Send to*</span>
      <AvatarLabelGroup account={accountItem} avatarSize={'48px'} customStyle="!p-0" />
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="modern" iconName="shield-tick" theme="gray" size="lg" />}
      title="Request certificate"
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
            label="Send to*"
            required
            name="email"
            register={register}
            placeholder="Enter an address mail"
            startIcon={<Icon name="user-01" fontSize={20} color={variables.color_grey_500} />}
            errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
          />
        )}
        <Input
          id="creadential-name"
          label="Credential name*"
          required
          name="creadentialName"
          register={register}
          errors={errors['creadentialName']?.message ? [errors['creadentialName']?.message.toString()] : undefined}
        />
        <div className="flex gap-4 items-start">
          <SearchDropdown
            id="month"
            value={month}
            label="Awarded date*"
            options={months}
            hasDropdownIcon
            onChange={value => {
              onSelectMonth(value as OptionType);
            }}
            className="flex-1"
            placeholder="Month"
            isSearchable
            errors={errors['month']?.label?.message ? [errors['month']?.label?.message.toString()] : undefined}
          />
          <SearchDropdown
            id="day"
            value={day}
            options={days}
            hasDropdownIcon
            onChange={value => {
              onSelectDay(value as OptionType);
            }}
            label="&nbsp;"
            className="flex-1"
            placeholder="Day"
            errors={errors['day']?.label?.message ? [errors['day']?.label?.message.toString()] : undefined}
          />
          <SearchDropdown
            id="start-year"
            value={year}
            options={years}
            hasDropdownIcon
            onChange={value => {
              onSelectYear(value as OptionType);
            }}
            label="&nbsp;"
            className="flex-1"
            placeholder="Year"
            isSearchable
            errors={errors['year']?.label?.message ? [errors['year']?.label?.message.toString()] : undefined}
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
          <span className="text-sm ml-6 text-Gray-light-mode-600">
            Your employer will be requested to fill in these details.
          </span>
        </div>
        <Input
          id="message"
          name="message"
          label="Message*"
          multiline
          customHeight="130px"
          register={register}
          placeholder="Type your message..."
          errors={errors['message']?.message ? [errors['message']?.message.toString()] : undefined}
        />
      </div>
    </Modal>
  );
};
