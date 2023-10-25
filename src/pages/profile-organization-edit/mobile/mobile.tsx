import { useEffect } from 'react';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { Header } from 'src/components/atoms/header-v2/header';
import { Input } from 'src/components/atoms/input/input';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Category } from 'src/components/molecules/category/category';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { ORGANIZATION_TYPE } from 'src/constants/ORGANIZATION_TYPE';
import { socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { useProfileOrganizationEditShared } from 'src/pages/profile-organization-edit/profile-organization-edit.shared';

import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const { onSave, onAvatarEdit, onCoverEdit, avatarImage, coverImage, updateCityList, form, cities, organization } =
    useProfileOrganizationEditShared();

  useEffect(() => {
    updateCityList(organization.country);
  }, []);

  function onCountryUpdate(option: DropdownItem) {
    updateCityList(option.value as string);
  }

  return (
    <TopFixedMobile containsMenu>
      <Header title="Edit" right={{ label: 'Save', onClick: onSave }} />
      <div>
        <div>
          <div className={css.header}>
            <div className={css.coverImage} style={{ backgroundImage: `url(${coverImage})` }} />
            <div className={css.photoIcon} onClick={onCoverEdit.mobile}>
              <img src="/icons/photos-white.svg" />
            </div>
            <div className={css.profileImgContainer}>
              <div className={css.photoIcon} onClick={onAvatarEdit.mobile}>
                <img src="/icons/photos-white.svg" />
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
    </TopFixedMobile>
  );
};
