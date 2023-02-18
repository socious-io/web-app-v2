import css from './mobile.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { COUNTRIES } from '../../../../../core/constants/COUNTRIES';
import { CreateOrgWizard } from '../../../../../store/reducers/createOrgWizard.reducer';
import { RootState } from '../../../../../store/store';
import { Button } from '../../../../atoms/button/button';
import { Dropdown } from '../../../../atoms/dropdown/dropdown';
import { DropdownItem } from '../../../../atoms/dropdown/dropdown.types';
import { Input } from '../../../../atoms/input/input';
import { Steps } from '../../../../atoms/steps/steps';
import { Textarea } from '../../../../atoms/textarea/textarea';
import { Divider } from '../../../../templates/divider/divider';
import { formIsValid, updateCityList, updateForm } from '../profile.services';
import { REGEX } from '../../../../../core/constants/REGEX';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateField = updateForm(dispatch);
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const formValues = useSelector<RootState, CreateOrgWizard>((state) => state.createOrgWizard);
  const { register, watch, formState } = useForm();

  function formWatcher(value: CreateOrgWizard, field: { name: keyof CreateOrgWizard }) {
    updateField(field.name, value[field.name]);
  }

  useEffect(() => {
    const subscription = watch(formWatcher);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: '../social-causes' })}>
          <img height={24} src="/icons/chevron-left.svg" />
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
              register={register}
              name="organizationName"
              value={formValues.organizationName}
              label="Organization name"
              placeholder="Organization name"
            />
            <Textarea
              value={formValues.bio}
              register={register}
              name="bio"
              label="Bio"
              placeholder="Your organization's bio"
            />
          </div>
        </Divider>
        <Divider title="Contact" divider="space">
          <div className={css.formContainer}>
            <Input
              register={register}
              value={formValues.organizationEmail}
              validations={{ pattern: REGEX.email }}
              name="organizationEmail"
              label="Organization email"
              placeholder="Organization email"
            />
            <Dropdown
              selectedValue={formValues.country}
              label="Country"
              list={COUNTRIES}
              placeholder="Country"
              onValueChange={(value) => {
                updateCityList(setCities)(value);
                updateField('country', value);
              }}
            />
            <Dropdown
              selectedValue={formValues.city}
              label="City"
              placeholder="City"
              list={cities}
              onValueChange={(value) => {
                const cityName = cities.find((city) => city.value === value)!.title;
                updateField('geoname_id', value);
                updateField('city', cityName);
              }}
            />
            <Input
              value={formValues.address}
              register={register}
              name="address"
              optional
              label="Address"
              placeholder="Address"
            />
            <div>
              <div className={css.phoneNumberLabel}>
                Phone Number <span className={css.labelOptional}>(optional)</span>
              </div>
              <div className={css.phoneNumber}>
                <Input
                  value={formValues.countryMobileCode}
                  register={register}
                  name="countryMobileCode"
                  optional
                  placeholder="+1"
                />
                <Input
                  value={formValues.phoneNumber}
                  register={register}
                  name="phoneNumber"
                  optional
                  placeholder="Phone number"
                />
              </div>
            </div>
            <Input
              value={formValues.website}
              register={register}
              name="website"
              optional
              label="Website"
              placeholder="Website"
            />
          </div>
        </Divider>
      </div>
      <div className={css.bottom}>
        <Button disabled={formIsValid(formState.isValid, formValues)} onClick={() => navigate({ to: '../mission' })}>
          Continue
        </Button>
      </div>
    </div>
  );
};
