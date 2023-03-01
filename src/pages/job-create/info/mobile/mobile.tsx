import css from './mobile.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { CategoriesResp } from '../../../../core/types';
import { Input } from '../../../../components/atoms/input/input';
import { Textarea } from '../../../../components/atoms/textarea/textarea';
import { Divider } from '../../../../components/templates/divider/divider';
import { Dropdown } from '../../../../components/atoms/dropdown/dropdown';
import { RadioGroup } from '../../../../components/molecules/radio-group/radio-group';
import { createPost, getCityList } from '../info.services';
import { Button } from '../../../../components/atoms/button/button';
import { COUNTRIES } from '../../../../constants/COUNTRIES';
import { citiesToCategories, jobCategoriesToDropdown } from '../../../../core/adaptors';
import { PROJECT_REMOTE_PREFERENCES } from '../../../../constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_PAYMENT_TYPE } from '../../../../constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_TYPE } from '../../../../constants/PROJECT_TYPES';
import { PROJECT_LENGTH } from '../../../../constants/PROJECT_LENGTH';
import { CURRENCIES } from '../../../../constants/PAYMENT_CURRENCY';
import { PROJECT_PAYMENT_SCHEME } from '../../../../constants/PROJECT_PAYMENT_SCHEME';
import { EXPERIENCE_LEVEL } from '../../../../constants/EXPERIENCE_LEVEL';
import { ChangeEvent, useState } from 'react';
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
  setPostPaymentCurrency,
  setPostPaymentScheme,
  setPostPaymentType,
  setPostProjectLength,
  setPostProjectType,
  setPostRemotePreference,
  setPostTitle,
} from '../../../../store/reducers/createPostWizard.reducer';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const resolvedJobCategories = useMatch().ownData.categories as CategoriesResp['categories'];
  const categories = jobCategoriesToDropdown(resolvedJobCategories);

  function updateCityList(countryCode: string) {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  }

  const form = useSelector<RootState, CreatePostWizard>((state) => {
    return state.createPostWizard;
  });

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
                value={form.title}
                onChange={(e) => dispatch(setPostTitle(e.target.value))}
                errors={[]}
                placeholder="title"
                variant="outline"
                label="Job title"
              />
              <Dropdown
                selectedValue={form.job_category_id}
                onValueChange={(value) => dispatch(setPostJobCategoryId(value))}
                label="Job category"
                placeholder="Project Length"
                list={categories}
              />
              <Textarea
                onValueChange={(value) => dispatch(setPostDescriptionTitle(value))}
                value={form.description}
                placeholder="job description"
                label="Job description"
              />
              <Dropdown
                label="Country"
                placeholder="country"
                list={COUNTRIES}
                selectedValue={form.country}
                onValueChange={(value) => {
                  updateCityList(value);
                  dispatch(setPostCountry(value));
                }}
              />
              <Dropdown
                label="City"
                placeholder="city"
                selectedValue={form.city}
                list={cities}
                onValueChange={(value) => {
                  const cityName = cities.find((city) => city.value === value)?.title;
                  dispatch(setPostCity(cityName));
                }}
              />
              <Dropdown
                selectedValue={form.remote_preference}
                onValueChange={(value) => dispatch(setPostRemotePreference(value))}
                label="Remote Preference"
                placeholder="Remote Preference"
                list={PROJECT_REMOTE_PREFERENCES}
              />
              <Dropdown
                selectedValue={form.project_type}
                onValueChange={(value) => dispatch(setPostProjectType(value))}
                label="Project Type"
                placeholder="Project Type"
                list={PROJECT_TYPE}
              />
              <Dropdown
                selectedValue={form.project_length}
                onValueChange={(value) => dispatch(setPostProjectLength(value))}
                label="Project Length"
                placeholder="Project Length"
                list={PROJECT_LENGTH}
              />
            </div>
          </Divider>
          <Divider title="Payment" divider="space">
            <div className={css.dividerContainer}>
              <Dropdown
                selectedValue={form.payment_currency}
                onValueChange={(value) => dispatch(setPostPaymentCurrency(value))}
                label="Payment Currency"
                placeholder="payment currency"
                list={CURRENCIES}
              />
              <RadioGroup
                name="paymentType"
                value={form.payment_type}
                onChange={(value) => dispatch(setPostPaymentType(value))}
                label="Payment type"
                list={PROJECT_PAYMENT_TYPE}
              />
              <RadioGroup
                name="PaymentScheme"
                value={form.payment_scheme}
                onChange={(value) => dispatch(setPostPaymentScheme(value))}
                label="Payment scheme"
                list={PROJECT_PAYMENT_SCHEME}
              />
            </div>
          </Divider>
          <Divider title="Experience & skills" divider="space">
            <div className={css.dividerContainer}>
              <Dropdown
                selectedValue={form.experience_level}
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
            <Button onClick={() => submit(form)}>Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
