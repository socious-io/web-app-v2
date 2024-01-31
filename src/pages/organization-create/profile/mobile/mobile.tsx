import { useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { Checkbox } from 'src/components/atoms/checkbox/checkbox';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { Input } from 'src/components/atoms/input/input';
import { Steps } from 'src/components/atoms/steps/steps';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Divider } from 'src/components/templates/divider/divider';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { citiesToCategories } from 'src/core/adaptors';
import { cities as getCities } from 'src/core/api';
import { useOrganizationCreateShared } from 'src/pages/organization-create/organization-create.shared';
import { formModel } from 'src/pages/organization-create/profile/profile.form';
import { formIsInvalid } from 'src/pages/organization-create/profile/profile.services';

import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const { updateField, profileForm, formState, navigateToSocialCauses, navigateToMission } =
    useOrganizationCreateShared();
  const [cities, setCities] = useState<DropdownItem[]>([]);

  Object.keys(formModel(formState)).forEach((prop) => {
    const p = prop as keyof ReturnType<typeof formModel>;
    profileForm.controls[prop].subscribe((v) => updateField(p, v));
  });

  function updateCityList(countryCode: string) {
    getCities(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={navigateToSocialCauses}>
          <img height={24} src="/icons/chevron-left.svg" alt="" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={6} current={3} />
        </div>
      </div>
      <div className={css.questionContainer}>
        <div className={css.question}>Organization profile</div>
        <div className={css.limitStatement}>Fill the required fields</div>
      </div>

      <div className={css.main}>
        <Divider title="Basic info" divider="space">
          <div className={css.formContainer}>
            <Input
              register={profileForm}
              name="organizationName"
              label="Organization name"
              placeholder="Organization name"
            />
            <Textarea limit={160} register={profileForm} name="bio" label="Bio" placeholder="Your organization's bio" />
          </div>
        </Divider>
        <Divider title="Contact" divider="space">
          <div className={css.formContainer}>
            <Input
              register={profileForm}
              name="organizationEmail"
              label="Organization email"
              placeholder="Organization email"
            />
            <Dropdown
              label="Country"
              placeholder="country"
              name="country"
              list={COUNTRIES}
              value={formState.country}
              register={profileForm}
              onValueChange={(option) => {
                updateCityList(option.value as string);
              }}
            />
            <Dropdown
              register={profileForm}
              label="City"
              placeholder="city"
              name="city"
              value={formState.city}
              onValueChange={(options) => updateField('geoname_id', options.id!)}
              list={cities}
            />
            <Input register={profileForm} name="address" optional label="Address" placeholder="Address" />
            <div>
              <div className={css.phoneNumberLabel}>
                Phone Number <span className={css.labelOptional}>(optional)</span>
              </div>
              <div className={css.phoneNumber}>
                <Input register={profileForm} name="countryMobileCode" optional placeholder="+1" />
                <Input register={profileForm} name="phoneNumber" optional placeholder="Phone number" />
              </div>
            </div>
            <Input register={profileForm} name="website" optional label="Website" placeholder="Website" />
            <div className={css.agreement}>
              <Checkbox
                name="agreement"
                register={profileForm}
                label="I verify that I am an authorized representative of this organization and have the right to act on its behalf
                in the creation and management of this page."
                id="agreement"
                checked={formState.agreement}
              />
              <span></span>
            </div>
          </div>
        </Divider>
      </div>
      <div className={css.bottom}>
        <Button disabled={formIsInvalid(profileForm.isValid, formState)} onClick={navigateToMission}>
          Continue
        </Button>
      </div>
    </div>
  );
};
