import { useMatch } from '@tanstack/react-location';
import { useEffect } from 'react';
import { Header } from '@atoms/header-v2/header';
import { Input } from '@atoms/input/input';
import { TopFixedMobile } from '@templates/top-fixed-mobile/top-fixed-mobile';
import css from './mobile.module.scss';
import { Textarea } from '@atoms/textarea/textarea';
import { Dropdown } from '@atoms/dropdown-v2/dropdown';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { Category } from '@molecules/category/category';
import { skillsToCategoryAdaptor, socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { ProfileReq } from 'src/pages/profile-organization/profile-organization.types';
import { useProfileUserEditShared } from '../profile-user-edit.shared';

export const Mobile = (): JSX.Element => {
  const user = useMatch().data.user as ProfileReq;

  const { onCoverEdit, onAvatarEdit, onSave, onCountryUpdate, updateCityList, coverImage, avatarImage, cities, form } =
    useProfileUserEditShared();

  useEffect(() => {
    updateCityList(user.country);
  }, []);

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
          <Input register={form} label="First name" name="first_name" placeholder="first name" />
          <Input register={form} label="Last name" name="last_name" placeholder="last name" />
          <Input register={form} label="Username" name="username" placeholder="username" />
          <Textarea register={form} label="Bio" name="bio" placeholder="biography" />
          <Textarea register={form} label="Mission" name="mission" placeholder="mission" />
          <Category
            register={form}
            name="social_causes"
            label="Social causes"
            list={socialCausesToCategoryAdaptor()}
            placeholder="Social causes"
          />
          <Category
            register={form}
            name="skills"
            label="Skills"
            list={skillsToCategoryAdaptor()}
            placeholder="skills"
          />
          <Textarea register={form} label="Address" name="address" placeholder="address" />
          <Dropdown
            register={form}
            label="Country"
            name="country"
            list={COUNTRIES}
            placeholder="country"
            onValueChange={onCountryUpdate}
          />
          <Dropdown
            register={form}
            label="City"
            name="city"
            list={cities}
            placeholder="city"
            onValueChange={(option) => form.controls.geoname_id.setValue(option.id)}
          />
          <div>
            <div className={css.label}>Phone</div>
            <div className={css.phoneContainer}>
              <Dropdown register={form} name="mobile_country_code" placeholder="+1" list={COUNTRY_CODES} />
              <Input register={form} name="phone" placeholder="phone" />
            </div>
          </div>
        </div>
      </div>
    </TopFixedMobile>
  );
};
