import css from './mobile.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { CategoriesResp } from '../../../../core/types';
import { Input } from '../../../../components/atoms/input/input';
import { Textarea } from '../../../../components/atoms/textarea/textarea';
import { Divider } from '../../../../components/templates/divider/divider';
import { Dropdown } from '../../../../components/atoms/dropdown-v2/dropdown';
import { RadioGroup } from '../../../../components/molecules/radio-group/radio-group';
import { createPost, getCityList, updateForm } from '../info.services';
import { Button } from '../../../../components/atoms/button/button';
import { COUNTRIES } from '../../../../constants/COUNTRIES';
import { citiesToCategories, jobCategoriesToDropdown } from '../../../../core/adaptors';
import { PROJECT_REMOTE_PREFERENCES_V2 } from '../../../../constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_PAYMENT_TYPE } from '../../../../constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_TYPE_V2 } from '../../../../constants/PROJECT_TYPES';
import { PROJECT_LENGTH_V2 } from '../../../../constants/PROJECT_LENGTH';
import { PROJECT_PAYMENT_SCHEME } from '../../../../constants/PROJECT_PAYMENT_SCHEME';
import { EXPERIENCE_LEVEL_V2 } from '../../../../constants/EXPERIENCE_LEVEL';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../../../store/store';
import {
  CreatePostWizard,
  resetCreatePostWizard,
  setPostPaymentScheme,
  setPostPaymentType,
} from '../../../../store/reducers/createPostWizard.reducer';
import { useForm } from '../../../../core/form';
import { formModel } from '../info.form';
import { DropdownItem } from '../../../../components/atoms/dropdown-v2/dropdown.types';
import { dialog } from '../../../../core/dialog/dialog';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateField = updateForm(dispatch);
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const resolvedJobCategories = useMatch().ownData.categories as CategoriesResp['categories'];
  const categories = jobCategoriesToDropdown(resolvedJobCategories);
  const formState = useSelector<RootState, CreatePostWizard>((state) => state.createPostWizard);
  const memoizedFormState = useMemo(() => formModel(formState), []);
  const form = useForm(memoizedFormState);

  Object.keys(formModel(formState)).forEach((prop) => {
    const p = prop as keyof ReturnType<typeof formModel>;
    form.controls[prop].subscribe((v) => {
      updateField(p, v);
    });
  });

  function updateCityList(countryCode: string) {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  }

  function submit(payload: CreatePostWizard) {
    createPost(payload).then((resp) => {
      dialog.alert({ title: 'Successfully', message: 'You have successfully created a job post' }).then(() => {
        navigate({ to: `/jobs/created/${resp.identity_id}` });
        store.dispatch(resetCreatePostWizard());
      });
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
              <Input value={formState.title} register={form} name="title" placeholder="title" label="Job title" />
              <Dropdown
                value={formState.job_category_id}
                register={form}
                name="job_category_id"
                label="Job category"
                placeholder="job category"
                list={categories}
              />
              <Textarea
                register={form}
                name="description"
                defaultValue={formState.description}
                placeholder="job description"
                label="Job description"
              />
              <Dropdown
                label="Country"
                placeholder="country"
                name="country"
                list={COUNTRIES}
                value={formState.country}
                register={form}
                onValueChange={(option) => {
                  updateCityList(option.value as string);
                  form.controls.city.setValue('');
                }}
              />
              <Dropdown register={form} label="City" placeholder="city" name="city" value={formState.city} list={cities} />
              <Dropdown
                register={form}
                value={formState.remote_preference}
                name="remote_preference"
                label="Remote Preference"
                placeholder="Remote Preference"
                list={PROJECT_REMOTE_PREFERENCES_V2}
              />
              <Dropdown
                register={form}
                value={formState.project_type}
                name="project_type"
                label="Job Type"
                placeholder="Job Type"
                list={PROJECT_TYPE_V2}
              />
              <Dropdown
                register={form}
                name="project_length"
                value={formState.project_length}
                label="Job Length"
                placeholder="Job Length"
                list={PROJECT_LENGTH_V2}
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
                value={formState.experience_level}
                register={form}
                name="experience_level"
                label="Experience level"
                placeholder="Experience level"
                list={EXPERIENCE_LEVEL_V2}
              />
            </div>
          </Divider>
          <div className={css.btnContainer}>
            <Button disabled={!form.isValid} onClick={() => submit(formState)}>
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
