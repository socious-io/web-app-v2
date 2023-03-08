import css from './mobile.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { CategoriesResp } from '../../../../core/types';
import { Input } from '../../../../components/atoms/input/input';
import { Textarea } from '../../../../components/atoms/textarea/textarea';
import { Divider } from '../../../../components/templates/divider/divider';
import { Dropdown } from '../../../../components/atoms/dropdown/dropdown';
import { Dropdown as Dropdown2 } from '../../../../components/atoms/dropdown-v2/dropdown';
import { RadioGroup } from '../../../../components/molecules/radio-group/radio-group';
import { createPost, getCityList } from '../info.services';
import { Button } from '../../../../components/atoms/button/button';
import { COUNTRIES } from '../../../../constants/COUNTRIES';
import { citiesToCategories, jobCategoriesToDropdown } from '../../../../core/adaptors';
import { PROJECT_REMOTE_PREFERENCES } from '../../../../constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_PAYMENT_TYPE } from '../../../../constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_TYPE } from '../../../../constants/PROJECT_TYPES';
import { PROJECT_LENGTH } from '../../../../constants/PROJECT_LENGTH';
import { PROJECT_PAYMENT_SCHEME } from '../../../../constants/PROJECT_PAYMENT_SCHEME';
import { EXPERIENCE_LEVEL } from '../../../../constants/EXPERIENCE_LEVEL';
import { useState } from 'react';
import { DropdownItem } from '../../../../components/atoms/dropdown/dropdown.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import {
  CreatePostWizard,
  setPostCity,
  setPostCountry,
  setPostDescriptionTitle,
  setPostExperienceLevel,
  setPostJobCategoryId,
  setPostPaymentScheme,
  setPostPaymentType,
  setPostProjectLength,
  setPostProjectType,
  setPostRemotePreference,
  setPostTitle,
} from '../../../../store/reducers/createPostWizard.reducer';
import { useForm } from '../../../../core/form';
import { formModel } from '../info.form';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const resolvedJobCategories = useMatch().ownData.categories as CategoriesResp['categories'];
  const categories = jobCategoriesToDropdown(resolvedJobCategories);
  const formState = useSelector<RootState, CreatePostWizard>((state) => state.createPostWizard);
  const form = useForm(formModel(formState));
  console.log('dropdown job_category_id', form.controls.job_category_id);

  function updateCityList(countryCode: string) {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  }

  function submit(payload: CreatePostWizard) {
    createPost(payload).then((resp) => {
      navigate({ to: `/jobs/created/${resp.identity_id}` });
    });
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: `/jobs/create/skills` })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Create job</div>
      </div>
      <div className={css.questionContainer}>
        <div className={css.question}>Tell us more about your job.</div>
        <div className={css.limitStatement}>Describe your job in detail.</div>
      </div>
      <div className={css.main}>
        <form>
          <Divider title="Job information" divider="space">
            <div className={css.dividerContainer}>
              <Input
                register={form}
                name="job_title"
                // onChange={(e) => dispatch(setPostTitle(e.target.value))}
                placeholder="title"
                label="Job title"
              />
              <Dropdown2 label="Job category" placeholder="job category" list={categories} />
              {/* <Dropdown
                register={form}
                name="job_category_id"
                // selectedValue={formState.job_category_id}
                // onValueChange={(value) => {
                //   console.log('value: ', value);
                //   dispatch(setPostJobCategoryId(value));
                // }}
                label="Job category"
                placeholder="job category"
                list={categories}
              /> */}
              <Textarea
                onValueChange={(value) => dispatch(setPostDescriptionTitle(value))}
                value={formState.description}
                placeholder="job description"
                label="Job description"
              />
              <Dropdown
                label="Country"
                placeholder="country"
                list={COUNTRIES}
                selectedValue={formState.country}
                onValueChange={(value) => {
                  updateCityList(value);
                  dispatch(setPostCountry(value));
                }}
              />
              <Dropdown
                label="City"
                placeholder="city"
                selectedValue={formState.city}
                list={cities}
                onValueChange={(value) => {
                  const cityName = cities.find((city) => city.value === value)?.title;
                  dispatch(setPostCity(cityName));
                }}
              />
              <Dropdown
                selectedValue={formState.remote_preference}
                onValueChange={(value) => dispatch(setPostRemotePreference(value))}
                label="Remote Preference"
                placeholder="Remote Preference"
                list={PROJECT_REMOTE_PREFERENCES}
              />
              <Dropdown
                selectedValue={formState.project_type}
                onValueChange={(value) => dispatch(setPostProjectType(value))}
                label="Job Type"
                placeholder="Job Type"
                list={PROJECT_TYPE}
              />
              <Dropdown
                selectedValue={formState.project_length}
                onValueChange={(value) => dispatch(setPostProjectLength(value))}
                label="Job Length"
                placeholder="Job Length"
                list={PROJECT_LENGTH}
              />
            </div>
          </Divider>
          <Divider title="Payment" divider="space">
            <div className={css.dividerContainer}>
              <RadioGroup
                name="paymentType"
                value={formState.payment_type}
                onChange={(value) => dispatch(setPostPaymentType(value))}
                label="Payment type"
                list={PROJECT_PAYMENT_TYPE}
              />
              <RadioGroup
                name="PaymentScheme"
                value={formState.payment_scheme}
                onChange={(value) => dispatch(setPostPaymentScheme(value))}
                label="Payment terms"
                list={PROJECT_PAYMENT_SCHEME}
              />
            </div>
          </Divider>
          <Divider title="Experience & skills" divider="space">
            <div className={css.dividerContainer}>
              <Dropdown
                selectedValue={formState.experience_level}
                onValueChange={(value) => {
                  dispatch(setPostExperienceLevel(+value));
                }}
                label="Experience level"
                placeholder="Experience level"
                list={EXPERIENCE_LEVEL}
              />
            </div>
          </Divider>
          <div className={css.btnContainer}>
            <Button onClick={() => submit(formState)}>Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
