import { Typography } from '@mui/material';
import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import MultiSelect from 'src/Nowruz/modules/general/components/multiSelect/multiSelect';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import css from './editInfo.module.scss';
import { EditInfoOrgProps } from './editInfoOrg.types';
import { useEditInfoOrg } from './useEditInfoOrg';

export const EditInfoOrgModal: React.FC<EditInfoOrgProps> = ({ open, handleClose }) => {
  const {
    org,
    register,
    handleSubmit,
    errors,
    isUsernameValid,
    searchCities,
    onSelectCity,
    city,
    socialCauses,
    changeSocialCauses,
    socialCauseItems,
    searchIndustries,
    onSelectIndustry,
    industry,
    saveOrg,
    closeModal,
    summary,
    handleChangeSummary,
    letterCount,
    size,
    sizeOptions,
    onSelectSize,
  } = useEditInfoOrg(handleClose);
  const modalContent = (
    <form className={css.editInfoModal}>
      <Input
        required
        id="name"
        label="Organization name*"
        name="name"
        defaultValue={org.name}
        register={register}
        errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
      />

      <Input
        required
        id="username"
        defaultValue={org.shortname}
        label="Username*"
        name="username"
        register={register}
        validMessage="This username is available"
        hints={[
          {
            hint: `Lowercase letters, digits, '.', '_', and '-'; must be 6-24 characters.`,
            hide: !isUsernameValid,
          },
        ]}
        prefix="socious.io/"
        isValid={isUsernameValid}
        errors={errors['username']?.message ? [errors['username']?.message.toString()] : undefined}
      />
      <SearchDropdown
        required
        id="location"
        cacheOptions
        value={city}
        isAsync
        loadOptions={searchCities}
        defaultOptions
        className="my-5"
        icon="search-lg"
        hasDropdownIcon={false}
        label="Location*"
        onChange={(value) => {
          onSelectCity(value);
        }}
        errors={errors['city']?.label?.message ? [errors['city'].label.message.toString()] : undefined}
      />
      <SearchDropdown
        required
        id="industry"
        cacheOptions
        value={industry}
        isAsync
        loadOptions={searchIndustries}
        defaultOptions
        className="my-5"
        icon="search-lg"
        hasDropdownIcon={false}
        label="Industry*"
        onChange={(value) => {
          onSelectIndustry(value);
        }}
        errors={errors['industry']?.label?.message ? [errors['industry'].label.message.toString()] : undefined}
      />
      <SearchDropdown
        required
        id="organization-size"
        label="Organization size*"
        value={size}
        options={sizeOptions}
        className="flex-1"
        hasDropdownIcon
        onChange={(value) => {
          onSelectSize(value);
        }}
        isSearchable
        errors={errors['size']?.label?.message ? [errors['size'].label.message.toString()] : undefined}
      />
      <div className="w-full h-full flex flex-col gap-[6px]">
        <Input
          required
          multiline
          customHeight="92px"
          id="summary*"
          label="Summary"
          name="summary"
          defaultValue={org?.mission}
          value={summary}
          onChange={handleChangeSummary}
          errors={errors['summary']?.message ? [errors['summary']?.message.toString()] : undefined}
        />
        <Typography variant="caption" className="text-Gray-light-mode-600 mr-0 ml-auto">
          {`${letterCount}/2600`}
        </Typography>
      </div>
      <MultiSelect
        id={'social-causes'}
        searchTitle={'Social causes*'}
        max={5}
        maxLabel={'Max. 5 causes'}
        items={socialCauseItems.slice(0, 30)}
        placeholder={'Type a social cause'}
        componentValue={socialCauses}
        setComponentValue={changeSocialCauses} //{setSocialCauses}
        customHeight="118px"
        popularLabel={false}
        errors={errors['socialCauses']?.message ? [errors['socialCauses']?.message.toString()] : undefined}
        displayDefaultBadges={false}
      />
    </form>
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(saveOrg)}>
        Save
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={closeModal}>
        Cancel
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={closeModal}
      title="Edit Information"
      subTitle="* required fields"
      content={modalContent}
      footer={modalFooterJsx}
    />
  );
};
