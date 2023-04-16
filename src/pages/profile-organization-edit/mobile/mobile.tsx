import { useMatch, useNavigate } from '@tanstack/react-location';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '../../../components/atoms/header-v2/header';
import { Input } from '../../../components/atoms/input/input';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { useForm } from 'src/core/form';
import { cityDispatcher, showActionSheet, uploadImage } from '../profile-organization-edit.services';
import css from './mobile.module.scss';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { Camera } from '@capacitor/camera';
import { endpoint } from 'src/core/endpoints';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { Category } from 'src/components/molecules/category/category';
import { skillsToCategoryAdaptor, socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { generateFormModel } from '../profile-organization-edit.form';
import { ProfileReq } from 'src/pages/profile-organization/profile-organization.types';
import { ORGANIZATION_TYPE } from 'src/constants/ORGANIZATION_TYPE';

export const Mobile = (): JSX.Element => {
  const organization = useMatch().data.user as ProfileReq;
  const formModel = useMemo(() => generateFormModel(organization), []);
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const form = useForm(formModel);
  const updateCityList = cityDispatcher(setCities);
  const [coverImage, setCoverImage] = useState(organization?.cover_image?.url);
  const [avatarImage, setAvatarImage] = useState(organization?.image?.url);
  const navigate = useNavigate();

  useEffect(() => {
    updateCityList(organization.country);
  }, []);

  function onCountryUpdate(option: DropdownItem) {
    updateCityList(option.value as string);
  }

  async function onCoverEdit() {
    const actionResp = await showActionSheet();
    switch (actionResp) {
      case 'upload':
        const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
        const resp = await uploadImage(webPath);
        form.controls.cover_image.setValue(resp.id);
        setCoverImage(resp.url);
        break;
      case 'remove':
        break;
    }
  }

  async function onAvatarEdit() {
    const actionResp = await showActionSheet();
    switch (actionResp) {
      case 'upload':
        const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
        const resp = await uploadImage(webPath);
        form.controls.avatar.setValue(resp.id);
        setAvatarImage(resp.url);
        break;
      case 'remove':
        break;
    }
  }

  function onSave() {
    const payload = getFormValues(form);
    console.log('payload: ', payload);
    endpoint.post.organizations['orgs/update/{org_id}'](organization.id, payload).then(() => {
      navigate({ to: '/jobs' });
    });
  }

  return (
    <TopFixedMobile>
      <Header title="Edit" right={{ label: 'Save', onClick: onSave }} />
      <div>
        <div>
          <div className={css.header}>
            <div className={css.coverImage} style={{ backgroundImage: `url(${coverImage})` }} />
            <div className={css.photoIcon} onClick={onCoverEdit}>
              <img src="/icons/photos-white.svg" />
            </div>
            <div className={css.profileImgContainer}>
              <div className={css.photoIcon} onClick={onAvatarEdit}>
                <img src="/icons/photos-white.svg" />
              </div>
              <div className={css.profileImage} style={{ backgroundImage: `url(${avatarImage})` }} />
            </div>
          </div>
        </div>
        <div className={css.formContainer}>
          {/* <Dropdown label='Organization type' list={ORGANIZATION_TYPE} /> */}
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
          />
          <Dropdown
            register={form}
            label="City"
            name="city"
            list={cities}
            placeholder="city"
            onValueChange={(option) => form.controls.geoname_id.setValue(option.id)}
          />
          <Input label="Address" register={form} name="address" placeholder="address" />
          <div>
            <div className={css.label}>Phone</div>
            <div className={css.phoneContainer}>
              <Dropdown register={form} name="mobile_country_code" placeholder="+1" list={COUNTRY_CODES} />
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
