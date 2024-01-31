import React from 'react';
import { AdditionalRes } from 'src/core/api/additionals/additionals.types';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

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
  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-5 overflow-y-auto">
      <Input
        id="name"
        label="Name*"
        required
        name="name"
        register={register}
        placeholder="Certificate name"
        errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
      />
      <SearchDropdown
        required
        id="organization"
        placeholder="Search for organization"
        cacheOptions
        value={orgVal}
        isAsync
        loadOptions={searchOrgs}
        defaultOptions
        icon="search-lg"
        hasDropdownIcon={false}
        label="Issuing organization*"
        onChange={(value) => {
          onSelectOrg(value);
        }}
        noOptionsMessage={({ inputValue }) => inputValue}
        errors={errors['orgName']?.message ? [errors['orgName']?.message.toString()] : undefined}
      />

      <div className="flex gap-4 items-end">
        <SearchDropdown
          id="issue-month"
          value={issueMonth}
          label="Issue date"
          options={months}
          hasDropdownIcon
          onChange={(value) => {
            onSelectIssueMonth(value);
          }}
          className="flex-1"
          placeholder="Month"
          isSearchable
          errors={errors['issueMonth']?.message ? [errors['issueMonth']?.message.toString()] : undefined}
        />
        <SearchDropdown
          id="issue-year"
          value={issueYear}
          options={years}
          hasDropdownIcon
          onChange={(value) => {
            onSelectIssueYear(value);
          }}
          className="flex-1"
          placeholder="Year"
          isSearchable
          errors={errors['issueYear']?.message ? [errors['issueYear']?.message.toString()] : undefined}
        />
      </div>
      <div className="flex gap-4 items-end">
        <SearchDropdown
          id="expiration-month"
          value={expMonth}
          label="Expiration date"
          options={months}
          hasDropdownIcon
          onChange={(value) => {
            onSelectExpMonth(value);
          }}
          placeholder="Month"
          className="flex-1"
          isSearchable
          errors={errors['expireMonth']?.message ? [errors['expireMonth']?.message.toString()] : undefined}
        />
        <SearchDropdown
          id="expiration-year"
          value={expYear}
          options={years}
          hasDropdownIcon
          onChange={(value) => {
            onSelectExpYear(value);
          }}
          className="flex-1"
          placeholder="Year"
          isSearchable
          errors={errors['expireYear']?.message ? [errors['expireYear']?.message.toString()] : undefined}
        />
      </div>
      <Input
        id="credential-id"
        label="Credential ID"
        name="credentialId"
        register={register}
        placeholder="ID"
        errors={errors['credentialId']?.message ? [errors['credentialId']?.message.toString()] : undefined}
      />
      <Input
        id="credential-url"
        name="credentialUrl"
        label="Credential URL"
        register={register}
        placeholder="www.example.com"
        errors={errors['credentialUrl']?.message ? [errors['credentialUrl']?.message.toString()] : undefined}
        prefix="https://"
      />
      <Input
        id="description"
        name="description"
        label="Description"
        multiline
        customHeight="130px"
        register={register}
        placeholder="Enter a description..."
      />
    </div>
  );
  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(onSave)}>
        {certificate ? 'Save' : 'Add certificate'}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleClose}>
        Cancel
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
      title={certificate ? 'Edit certificate' : 'Add certificate'}
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};

export default CreateUpdateCertificate;
