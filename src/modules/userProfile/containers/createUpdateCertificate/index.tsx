import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdditionalRes } from 'src/core/api/additionals/additionals.types';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { useCreateUpdateCertificate } from './useCreateUpdateCertificate';

interface CreateUpdateCertificateProps {
  open: boolean;
  handleClose: () => void;
  certificate: AdditionalRes;
  setCertificate: (val: AdditionalRes) => void;
}

const CreateUpdateCertificate: React.FC<CreateUpdateCertificateProps> = ({
  open,
  handleClose,
  certificate,
  setCertificate,
}) => {
  const {
    register,
    errors,
    orgVal,
    searchOrgs,
    onSelectOrg,
    issueMonth,
    issueYear,
    expMonth,
    expYear,
    months,
    years,
    onSelectIssueMonth,
    onSelectIssueYear,
    onSelectExpMonth,
    onSelectExpYear,
    handleSubmit,
    onSave,
    onDelete,
  } = useCreateUpdateCertificate(handleClose, certificate, setCertificate);
  const { t } = useTranslation('profile');
  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-5 overflow-y-auto">
      <Input
        id="name"
        label={t('nameLabel')}
        required
        name="name"
        register={register}
        placeholder={t('certificateNameText')}
        errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
      />
      <SearchDropdown
        required
        id="organization"
        placeholder={t('searchOrganizationText')}
        cacheOptions
        value={orgVal}
        isAsync
        creatable
        loadOptions={searchOrgs}
        defaultOptions
        icon="search-lg"
        hasDropdownIcon={false}
        label={t('issuingOrganizationLabel')}
        onChange={value => {
          onSelectOrg(value);
        }}
        noOptionsMessage={({ inputValue }) => inputValue}
        errors={errors['orgName']?.message ? [errors['orgName']?.message.toString()] : undefined}
      />

      <div className="flex gap-4 items-end">
        <SearchDropdown
          id="issue-month"
          value={issueMonth}
          label={t('issueDateLabel')}
          options={months}
          hasDropdownIcon
          onChange={value => {
            onSelectIssueMonth(value);
          }}
          className="flex-1"
          placeholder={t('monthText')}
          isSearchable
          errors={errors['issueMonth']?.message ? [errors['issueMonth']?.message.toString()] : undefined}
        />
        <SearchDropdown
          id="issue-year"
          value={issueYear}
          options={years}
          hasDropdownIcon
          onChange={value => {
            onSelectIssueYear(value);
          }}
          className="flex-1"
          placeholder={t('yearText')}
          isSearchable
          errors={errors['issueYear']?.message ? [errors['issueYear']?.message.toString()] : undefined}
        />
      </div>
      <div className="flex gap-4 items-end">
        <SearchDropdown
          id="expiration-month"
          value={expMonth}
          label={t('expirationDateLabel')}
          options={months}
          hasDropdownIcon
          onChange={value => {
            onSelectExpMonth(value);
          }}
          placeholder={t('monthText')}
          className="flex-1"
          isSearchable
          errors={errors['expireMonth']?.message ? [errors['expireMonth']?.message.toString()] : undefined}
        />
        <SearchDropdown
          id="expiration-year"
          value={expYear}
          options={years}
          hasDropdownIcon
          onChange={value => {
            onSelectExpYear(value);
          }}
          className="flex-1"
          placeholder={t('yearText')}
          isSearchable
          errors={errors['expireYear']?.message ? [errors['expireYear']?.message.toString()] : undefined}
        />
      </div>
      <Input
        id="credential-id"
        label={t('credentialIdLabel')}
        name="credentialId"
        register={register}
        placeholder={t('idText')}
        errors={errors['credentialId']?.message ? [errors['credentialId']?.message.toString()] : undefined}
      />
      <Input
        id="credential-url"
        name="credentialUrl"
        label={t('credentialUrlLabel')}
        register={register}
        placeholder="www.example.com"
        errors={errors['credentialUrl']?.message ? [errors['credentialUrl']?.message.toString()] : undefined}
        prefix="https://"
      />
      <Input
        id="description"
        name="description"
        label={t('descriptionLabel')}
        multiline
        customHeight="130px"
        register={register}
        placeholder={t('enterDescriptionText')}
      />
    </div>
  );
  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(onSave)}>
        {certificate ? t('saveText') : t('addCertificate')}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleClose}>
        {t('cancelText')}
      </Button>
      {certificate && (
        <Button
          variant="text"
          color="primary"
          customStyle="ml-0 mr-auto text-Gray-light-mode-600 w-full md:w-fit"
          onClick={onDelete}
        >
          Delete certificate
        </Button>
      )}
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={certificate ? t('editCertificateText') : t('addCertificate')}
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};

export default CreateUpdateCertificate;
