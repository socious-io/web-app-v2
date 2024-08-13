import React from 'react';
import { AdditionalRes } from 'src/core/api/additionals/additionals.types';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { useCreateUpdateCertificate } from './useCreateUpdateCertificate';

interface CreateUpdateCertificateProps {
  open: boolean;
  handleClose: () => void;
  certificate: AdditionalRes | undefined;
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
    issueDateErrors,
    expireDateErrors,
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
        value={orgVal}
        isAsync
        creatable
        loadOptions={searchOrgs}
        icon="search-lg"
        hasDropdownIcon={false}
        label="Issuing organization*"
        onChange={value => {
          onSelectOrg(value);
        }}
        noOptionsMessage={({ inputValue }) => inputValue}
        errors={errors['orgName']?.message ? [errors['orgName']?.message.toString()] : undefined}
      />

      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="issue-month"
          value={issueMonth}
          label="Issue date"
          options={months}
          hasDropdownIcon
          onChange={onSelectIssueMonth}
          className="flex-1"
          placeholder="Month"
          isSearchable
          errors={issueDateErrors ? [issueDateErrors.toString()] : undefined}
          maxMenuHeight={200}
        />
        <SearchDropdown
          id="issue-year"
          value={issueYear}
          label="&nbsp;"
          options={years}
          hasDropdownIcon
          onChange={onSelectIssueYear}
          className="flex-1"
          placeholder="Year"
          isSearchable
          maxMenuHeight={200}
        />
      </div>
      <div className="flex gap-4 items-start">
        <SearchDropdown
          id="expiration-month"
          value={expMonth}
          label="Expiration date"
          options={months}
          hasDropdownIcon
          onChange={onSelectExpMonth}
          placeholder="Month"
          className="flex-1"
          isSearchable
          errors={expireDateErrors ? [expireDateErrors.toString()] : undefined}
          maxMenuHeight={200}
        />
        <SearchDropdown
          id="expiration-year"
          value={expYear}
          label="&nbsp;"
          options={years}
          hasDropdownIcon
          onChange={onSelectExpYear}
          className="flex-1"
          placeholder="Year"
          isSearchable
          maxMenuHeight={200}
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
