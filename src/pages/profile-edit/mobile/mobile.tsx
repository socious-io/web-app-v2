import { useMatch } from '@tanstack/react-location';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '../../../components/atoms/header-v2/header';
import { Input } from '../../../components/atoms/input/input';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { useForm } from 'src/core/form';
import { ProfileReq } from 'src/pages/profile/profile.types';
import { cityDispatcher, generateFormModel, getProfileImage } from '../profile-edit.services';
import css from './mobile.module.scss';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';

export const Mobile = (): JSX.Element => {
  const data = useMatch().data.profile as ProfileReq;
  const formModel = useMemo(() => generateFormModel(data), []);
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const form = useForm(formModel);
  const updateCityList = cityDispatcher(setCities);

  useEffect(() => {
    updateCityList(data.country);
  }, []);

  function onCountryUpdate(option: DropdownItem) {
    updateCityList(option.value as string);
  }

  return (
    <TopFixedMobile>
      <Header title="Edit" />
      <div>
        <div>
          <div className={css.header}>
            <img className={css.coverImage} src={data?.cover_image?.url} />
            <div className={css.photoIcon}>
              <img src="/icons/photos-white.svg" />
            </div>
            <div className={css.profileImgContainer}>
              <div className={css.photoIcon}>
                <img src="/icons/photos-white.svg" />
              </div>
              <img className={css.profileImage} src={getProfileImage(data)} />
            </div>
          </div>
        </div>
        <div className={css.formContainer}>
          <Input register={form} label="First name" name="first_name" placeholder="first name" />
          <Input register={form} label="Last name" name="last_name" placeholder="last name" />
          <Input register={form} label="Username" name="username" placeholder="username" />
          <Textarea register={form} label="Bio" name="bio" placeholder="biography" />
          <Textarea register={form} label="Mission" name="mission" placeholder="mission" />
          <Textarea register={form} label="Address" name="address" placeholder="address" />
          <Dropdown
            register={form}
            label="Country"
            name="country"
            list={COUNTRIES}
            placeholder="country"
            value="IR"
            onValueChange={onCountryUpdate}
          />
          <Dropdown register={form} label="City" name="city" list={cities} placeholder="city" />
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
