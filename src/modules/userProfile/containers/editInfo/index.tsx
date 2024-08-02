import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import MultiSelect from 'src/modules/general/components/multiSelect/multiSelect';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import css from './editInfo.module.scss';
import { useEditInfo } from './useEditInfo';
import { UpdateLanguages } from '../../components/updateLanguages';

interface EditInfoModalProps {
  open: boolean;
  handleClose: () => void;
}
export const EditInfoModal: React.FC<EditInfoModalProps> = ({ open, handleClose }) => {
  const {
    register,
    errors,
    user,
    searchCities,
    onSelectCity,
    city,
    socialCauseItems,
    socialCauses,
    changeSocialCauses,
    handleSubmit,
    saveUser,
    languages,
    setLanguages,
    langErrors,
    setLangErrors,
    closeModal,
    letterCount,
    bio,
    handleChangeBio,
  } = useEditInfo(handleClose);
  const { t } = useTranslation('profile');
  const modalContent = (
    <form className={css.editInfoModal}>
      <Input
        required
        id="first-name"
        label={t('firstNameLabel')}
        name="firstName"
        defaultValue={user?.first_name}
        register={register}
        errors={errors['firstName']?.message ? [errors['firstName']?.message.toString()] : undefined}
      />
      <Input
        required
        id="last-name"
        label={t('lastNameLabel')}
        name="lastName"
        register={register}
        defaultValue={user?.last_name}
        errors={errors['lastName']?.message ? [errors['lastName']?.message.toString()] : undefined}
      />
      <Input
        required
        id="username"
        defaultValue={user?.username}
        label={t('usernameLabel')}
        name="username"
        register={register}
        validMessage={t('username_available')}
        hints={[
          {
            hint: `Lowercase letters, digits, '.', '_', and '-'; must be 6-24 characters.`,
            hide: !!errors['username'],
          },
        ]}
        prefix="socious.io/"
        isValid={!errors['username']}
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
        label={t('locationLabel')}
        onChange={value => {
          onSelectCity(value);
        }}
      />
      <div className="flex flex-col gap-[6px]">
        <Input
          required
          multiline
          customHeight="92px"
          id="bio"
          label={t('headlineLabel')}
          name="bio"
          defaultValue={user?.bio}
          value={bio}
          onChange={handleChangeBio}
          errors={errors['bio']?.message ? [errors['bio']?.message.toString()] : undefined}
        />
        <Typography variant="caption" className="text-Gray-light-mode-600 mr-0 ml-auto">
          {`${letterCount}/160`}
        </Typography>
      </div>
      <MultiSelect
        id={'social-causes'}
        searchTitle={t('socialCausesLabel')}
        max={5}
        maxLabel={t('max5Causes')}
        items={socialCauseItems.slice(0, 30)}
        placeholder={'Type a social cause'}
        componentValue={socialCauses}
        setComponentValue={changeSocialCauses}
        customHeight="118px"
        popularLabel={false}
        errors={errors['socialCauses']?.message ? [errors['socialCauses']?.message.toString()] : undefined}
        displayDefaultBadges={false}
      />
      <UpdateLanguages
        languages={languages}
        setLanguages={setLanguages}
        errors={langErrors}
        setErrors={setLangErrors}
      />
    </form>
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(saveUser)}>
        {t('saveText')}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={closeModal}>
        {t('cancelText')}
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={closeModal}
      title={t('editInformationText')}
      subTitle={t('requiredFieldsText')}
      content={modalContent}
      footer={modalFooterJsx}
    />
  );
};
