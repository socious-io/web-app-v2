import css from './mobile.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { CategoriesResp } from '../../../../../core/types';
import { Input } from '../../../../atoms/input/input';
import { Textarea } from '../../../../atoms/textarea/textarea';
import { Divider } from '../../../../templates/divider/divider';
import { Dropdown } from '../../../../atoms/dropdown/dropdown';
import { RadioGroup } from '../../../../molecules/radio-group/radio-group';
import { formModel, getCityList } from '../info.services';
import { Button } from '../../../../atoms/button/button';
import { COUNTRIES } from '../../../../../core/constants/COUNTRIES';
import { citiesToCategories, jobCategoriesToDropdown } from '../../../../../core/adaptors';
import { PROJECT_REMOTE_PREFERENCES } from '../../../../../core/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_PAYMENT_TYPE } from '../../../../../core/constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_TYPE } from '../../../../../core/constants/PROJECT_TYPES';
import { PROJECT_LENGTH } from '../../../../../core/constants/PROJECT_LENGTH';
import { CURRENCIES } from '../../../../../core/constants/PAYMENT_CURRENCY';
import { PROJECT_PAYMENT_SCHEME } from '../../../../../core/constants/PROJECT_PAYMENT_SCHEME';
import { EXPERIENCE_LEVEL } from '../../../../../core/constants/EXPERIENCE_LEVEL';
import { useState } from 'react';
import { DropdownItem } from '../../../../atoms/dropdown/dropdown.types';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const [cities, setCities] = useState<DropdownItem[]>([]);
  //   const form = useForm(formModel);
  const resolvedJobCategories = useMatch().ownData.categories as CategoriesResp['categories'];
  const categories = jobCategoriesToDropdown(resolvedJobCategories);

  function updateCityList(countryCode: string) {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
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
              <Input errors={[]} placeholder="title" variant="outline" label="Job title" />
              <Dropdown label="Job category" placeholder="Project Length" list={categories} onGetValue={console.log} />
              <Textarea placeholder="job description" label="Job description" variant="outline" />
              <Dropdown label="Country" placeholder="country" list={COUNTRIES} onValueChange={updateCityList} />
              <Dropdown label="City" placeholder="city" list={cities} />
              <Dropdown
                label="Remote Preference"
                placeholder="Remote Preference"
                list={PROJECT_REMOTE_PREFERENCES}
                onGetValue={console.log}
              />
              <Dropdown label="Project Type" placeholder="Project Type" list={PROJECT_TYPE} onGetValue={console.log} />
              <Dropdown label="Project Length" placeholder="Project Length" list={PROJECT_LENGTH} onGetValue={console.log} />
            </div>
          </Divider>
          <Divider title="Payment" divider="space">
            <div className={css.dividerContainer}>
              <Dropdown label="Payment Currency" placeholder="payment currency" list={CURRENCIES} onGetValue={console.log} />
              <RadioGroup
                name="paymentType"
                value={'PAID'}
                onChange={console.log}
                label="Payment type"
                list={PROJECT_PAYMENT_TYPE}
              />
              <RadioGroup
                name="PaymentScheme"
                value="PAID"
                onChange={console.log}
                label="Payment scheme"
                list={PROJECT_PAYMENT_SCHEME}
              />
              {/* {form.paymentTerms.value === 'HOURLY' && (
                <div className={css.paymentRange}>
                  <div className={css.paymentRangeTitle}>Total commitment</div>
                  <div className={css.paymentRangeInputs}>
                    <Input variant="outline" label="Minimum" placeholder="minimum" />
                    <Input variant="outline" label="Maximum" placeholder="maximum" />
                  </div>
                  {/* <div className={css.priceNotifying}>Prices will be shown in USD ($)</div> */}
              {/* </div> */}
              {/* )} */}
            </div>
          </Divider>
          <Divider title="Experience & skills" divider="space">
            <div className={css.dividerContainer}>
              <Dropdown
                label="Experience level"
                placeholder="Experience level"
                list={EXPERIENCE_LEVEL}
                onGetValue={console.log}
              />
            </div>
          </Divider>
          <div className={css.btnContainer}>
            <Button>Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
