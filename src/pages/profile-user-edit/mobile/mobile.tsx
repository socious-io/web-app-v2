import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { Header } from 'src/components/atoms/header-v2/header';
import { Input } from 'src/components/atoms/input/input';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Category } from 'src/components/molecules/category/category';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { skillsToCategoryAdaptor, socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { User } from 'src/core/api';

import css from './mobile.module.scss';
import { useProfileUserEditShared } from '../profile-user-edit.shared';

export const Mobile = (): JSX.Element => {
  const user = useLoaderData() as User;
  const [skills, setSkills] = useState<{ value: string; label: string }[]>([]);

  const { onCoverEdit, onAvatarEdit, onSave, onCountryUpdate, updateCityList, coverImage, avatarImage, cities, form } =
    useProfileUserEditShared();

  useEffect(() => {
    updateCityList(user.country || '');
    skillsToCategoryAdaptor().then((data) => setSkills(data));
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
          <Category register={form} name="skills" label="Skills" list={skills} placeholder="skills" />
          <Textarea register={form} label="Address" name="address" placeholder="address" />
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
        </div>
      </div>
    </TopFixedMobile>
  );
};
