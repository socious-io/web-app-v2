import { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { Header } from 'src/components/atoms/header-v2/header';
import { Input } from 'src/components/atoms/input/input';
import { Popover } from 'src/components/atoms/popover/popover';
import { PopoverProps } from 'src/components/atoms/popover/popover.types';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Category } from 'src/components/molecules/category/category';
import { Modal } from 'src/components/templates/modal/modal';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { ORGANIZATION_TYPE } from 'src/constants/ORGANIZATION_TYPE';
import { socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { OrganizationReq, updateOrganization } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { removedEmptyProps } from 'src/core/utils';
import { useProfileOrganizationEditShared } from 'src/pages/profile-organization-edit/profile-organization-edit.shared';

import css from './edit.module.scss';
import { EditProps } from './edit.types';

export const EditOrganization = (props: EditProps): JSX.Element => {
  const {
    onAvatarEdit,
    onCoverEdit,
    avatarImage,
    coverImage,
    updateCityList,
    form,
    cities,
    organization,
    updateIdentityList,
  } = useProfileOrganizationEditShared();

  const coverLetterMenu: PopoverProps['menuList'] = [
    { id: 1, label: 'Upload image', cb: onCoverEdit.desktop('upload') },
    { id: 2, label: 'Remove image', cb: onCoverEdit.desktop('remove') },
  ];

  const avatarMenu: PopoverProps['menuList'] = [
    { id: 1, label: 'Upload image', cb: onAvatarEdit.desktop('upload') },
    { id: 2, label: 'Remove image', cb: onAvatarEdit.desktop('remove') },
  ];

  const [coverLetterMenuOpen, setCoverLetterMenu] = useState(false);
  const [avatarMenuOpen, setAvatarMenu] = useState(false);
  const avatarAnchor = useRef<null | HTMLDivElement>(null);
  const coverLetterAnchor = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    updateCityList(organization.country);
  }, []);

  function onCountryUpdate(option: DropdownItem) {
    updateCityList(option.value as string);
  }

  function onSaveDesktop() {
    if (form.isValid) {
      const payload = removedEmptyProps(getFormValues(form));
      updateOrganization(organization.id, payload as OrganizationReq).then(async (resp) => {
        await updateIdentityList();
        props?.updateOrganization(resp);
        props.onClose();
      });
    } else {
      dialog.alert({ message: 'form is invalid' });
    }
  }

  return (
    <Modal height={props.height} width={props.width} open={props.open} onClose={props.onClose} zIndex={1}>
      <>
        <div className={css.mainHeader}>
          <Header onBack={props.onClose} title="Edit" right={{ label: 'Save', onClick: onSaveDesktop }} />
        </div>
        <div>
          <div>
            <div className={css.header}>
              <div className={css.coverImage} style={{ backgroundImage: `url(${coverImage})` }} />
              <div
                ref={coverLetterAnchor}
                className={css.photoIcon}
                onClick={() => setCoverLetterMenu((prev) => !prev)}
              >
                <img src="/icons/photos-white.svg" />
                <Popover
                  anchor={coverLetterAnchor.current}
                  open={coverLetterMenuOpen}
                  onClose={() => setCoverLetterMenu(false)}
                  menuList={coverLetterMenu}
                />
              </div>
              <div className={css.profileImgContainer}>
                <div ref={avatarAnchor} className={css.photoIcon} onClick={() => setAvatarMenu((prev) => !prev)}>
                  <img src="/icons/photos-white.svg" />
                  <Popover
                    anchor={avatarAnchor.current}
                    open={avatarMenuOpen}
                    onClose={() => setAvatarMenu(false)}
                    menuList={avatarMenu}
                  />
                </div>
                <div className={css.profileImage} style={{ backgroundImage: `url(${avatarImage})` }} />
              </div>
            </div>
          </div>
          <div className={css.formContainer}>
            <Dropdown
              name="type"
              register={form}
              label="Organization type"
              list={ORGANIZATION_TYPE}
              defaultValue={ORGANIZATION_TYPE.find((type) => type.id === form.controls.type['value'])?.label || ''}
            />
            <Input label="Name" register={form} name="name" placeholder="name" />
            <Textarea label="bio" register={form} name="bio" placeholder="bio" />
            <Category
              register={form}
              name="social_causes"
              label="Social causes"
              list={socialCausesToCategoryAdaptor()}
              placeholder="Social causes"
            />
            <Input label="Email" register={form} name="email" placeholder="email" />
            <Dropdown
              register={form}
              label="Country"
              name="country"
              list={COUNTRIES}
              placeholder="country"
              onValueChange={onCountryUpdate}
              defaultValue={COUNTRIES.find((item) => item.id === form.controls.country['value'])?.label || ''}
            />
            <Dropdown
              register={form}
              label="City"
              name="city"
              list={cities}
              placeholder="city"
              onValueChange={(option) => form.controls.geoname_id.setValue(option.id)}
              defaultValue={form.controls.city['value']?.toString()}
            />
            <Input label="Address" register={form} name="address" placeholder="address" />
            <div>
              <div className={css.label}>Phone</div>
              <div className={css.phoneContainer}>
                <Dropdown
                  register={form}
                  name="mobile_country_code"
                  placeholder="+1"
                  list={COUNTRY_CODES}
                  defaultValue={form.controls.mobile_country_code.value?.toString()}
                />
                <Input register={form} name="phone" placeholder="phone" />
              </div>
            </div>
            <Input label="Website" register={form} name="website" placeholder="http://website.com" />
            <Textarea label="Mission" register={form} name="mission" placeholder="mission" />
            <Textarea label="Culture" register={form} name="culture" placeholder="culture" />
          </div>
        </div>
      </>
    </Modal>
  );
};
