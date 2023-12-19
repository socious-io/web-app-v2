import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import MultiSelect from 'src/Nowruz/modules/general/components/multiSelect/multiSelect';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

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
    isUsernameValid,
    searchCities,
    onSelectCity,
    cityVal,
    socialCauseItems,
    SocialCauses,
    setSocialCauses,
    handleSubmit,
    saveUser,
    languages,
    setLanguages,
    langErrors,
    setLangErrors,
    causesErrors,
    closeModal,
  } = useEditInfo(handleClose);
  const modalContent = (
    <form className={css.editInfoModal}>
      <Input
        required
        id="first-name"
        label="First name"
        name="firstName"
        defaultValue={user?.first_name}
        register={register}
        errors={errors['firstName']?.message ? [errors['firstName']?.message.toString()] : undefined}
      />
      <Input
        required
        id="last-name"
        label="Last name"
        name="lastName"
        register={register}
        defaultValue={user?.last_name}
        errors={errors['firstName']?.message ? [errors['firstName']?.message.toString()] : undefined}
      />
      <Input
        required
        id="username"
        defaultValue={user?.username}
        label="Username*"
        name="username"
        register={register}
        validMessage="Username available"
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
        value={cityVal}
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
      />
      <Input
        required
        multiline
        customHeight="92px"
        id="summary"
        label="Summary"
        name="summary"
        defaultValue={user?.mission}
        register={register}
        errors={errors['summary']?.message ? [errors['summary']?.message.toString()] : undefined}
      />
      <MultiSelect
        id={'social-causes'}
        searchTitle={'Social causes*'}
        max={5}
        maxLabel={'Max. 5 causes'}
        items={socialCauseItems.slice(0, 30)}
        placeholder={'Type a social cause'}
        componentValue={SocialCauses}
        setComponentValue={setSocialCauses}
        customHeight="118px"
        popularLabel={false}
        errors={causesErrors}
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
      title="Edit profile photo"
      subTitle="Upload a square image for best results."
      content={modalContent}
      footer={modalFooterJsx}
    />
  );
};
