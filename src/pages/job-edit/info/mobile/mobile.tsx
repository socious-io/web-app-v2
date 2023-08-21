import { useMatch, useNavigate } from '@tanstack/react-location';
import { useDispatch } from 'react-redux';
import { Input } from 'src/components/atoms/input/input';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Divider } from 'src/components/templates/divider/divider';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { RadioGroup } from 'src/components/molecules/radio-group/radio-group';
import { Button } from 'src/components/atoms/button/button';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_TYPE_V2 } from 'src/constants/PROJECT_TYPES';
import { PROJECT_LENGTH_V2 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_PAYMENT_SCHEME } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { jobCategoriesToDropdown } from 'src/core/adaptors';
import {
  setPostPaymentScheme,
  setPostPaymentType,
  setInitPostWizard,
} from 'src/store/reducers/createPostWizard.reducer';
import { printWhen } from 'src/core/utils';
import { CategoriesResp, CreatePostPayload } from 'src/core/types';
import { createFormInitState, jobEditRequest } from '../info.services';
import { useInfoShared } from '../info.shared';
import css from './mobile.module.scss';
import { useEffect } from 'react';
import { Job } from 'src/components/organisms/job-list/job-list.types';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formState, form, updateCityList, cities, errors, rangeLabel } = useInfoShared();
  const resolvedJobCategories = useMatch().ownData.jobCategories?.categories as CategoriesResp['categories'];
  const overview = useMatch().ownData.overview as Job;
  const categories = jobCategoriesToDropdown(resolvedJobCategories);
  useEffect(() => {
    dispatch(setInitPostWizard(createFormInitState(overview)));
  }, []);

  function editJob(id: string, payload: CreatePostPayload) {
    jobEditRequest(overview.id, payload).then(() => {
      navigate({ to: `/m/jobs/created/${id}/overview` });
    });
  }

  const errorsJSX = (
    <div style={{ height: '`${errors.length}rem`' }} className={css.errorsContainer}>
      {errors.map((error, i) => (
        <div className={css.errorItem} key={i}>
          <>- {error}</>
        </div>
      ))}
    </div>
  );
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: `/m/jobs/created/${overview.id}/overview` })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Edit job</div>
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
              <Dropdown
                register={form}
                label="City"
                placeholder="city"
                name="city"
                value={formState.city}
                list={cities}
              />
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
                onChange={(value) => {
                  dispatch(setPostPaymentType(value));
                  dispatch(setPostPaymentScheme('FIXED'));
                }}
                label="Payment type"
                list={PROJECT_PAYMENT_TYPE}
              />
              <RadioGroup
                name="PaymentScheme"
                value={formState.payment_scheme}
                onChange={console.log}
                label="Payment terms"
                list={PROJECT_PAYMENT_SCHEME}
              />
              <div className={css.paymentRange}>
                <span className={css.label}>{rangeLabel}</span>
                <div className={css.inputs}>
                  <div className={css.input}>
                    Minimum
                    <Input
                      placeholder="Min"
                      register={form}
                      name="payment_range_lower"
                      value={formState.payment_range_lower}
                    />
                  </div>
                  <div className={css.input}>
                    Maximum
                    <Input
                      placeholder="Max"
                      register={form}
                      name="payment_range_higher"
                      value={formState.payment_range_higher}
                    />
                  </div>
                </div>
                {printWhen(
                  errorsJSX,
                  !!errors.length && (!!formState.payment_range_lower || !!formState.payment_range_higher)
                )}
                {printWhen(
                  <span className={css.info}>Prices will be shown in USD ($)</span>,
                  formState.payment_type === 'PAID'
                )}
              </div>
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
            <Button color="primary" onClick={() => editJob(overview.id, formState)}>
              Save changes
            </Button>
            <Button color="white" onClick={() => navigate({ to: `/m/jobs/created/${overview.id}/overview` })}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
