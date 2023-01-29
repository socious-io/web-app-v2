import css from './mobile.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { IdentityReq } from '../../../../../core/types';
import { RootState } from '../../../../../store/store';
import { Input } from '../../../../atoms/input/input';
import { Textarea } from '../../../../atoms/textarea/textarea';
import { Divider } from '../../../../templates/divider/divider';
import { Dropdown } from '../../../../atoms/dropdown/dropdown';
import { RadioGroup } from '../../../../molecules/radio-group/radio-group';
import { jobLength, jobType, paymentTerms, paymentTypeRadioList } from '../info.services';
import { Button } from '../../../../atoms/button/button';
import { createForm } from '../../../../../core/form';

const form = createForm({
  jobTitle: {
    value: '',
    validations: [
      {
        validation: 'regex',
        errorMsg: 'bla mal pla is wrong',
      },
    ],
    required: true,
  },
});

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

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
              <Input placeholder="title" variant="outline" label="Job title" />
              <Input placeholder="category" variant="outline" label="Job category" />
              <Textarea placeholder="job description" label="Job description" variant="outline" />
              <Dropdown
                label="Country"
                placeholder="Country"
                list={jobType}
                onGetValue={console.log}
              />
              <Dropdown
                label="Job type"
                placeholder="Job type"
                list={jobType}
                onGetValue={console.log}
              />
              <Dropdown
                label="Job length"
                placeholder="Job length"
                list={jobLength}
                onGetValue={console.log}
              />
            </div>
          </Divider>
          <Divider title="Payment" divider="space">
            <div className={css.dividerContainer}>
              <RadioGroup
                name="paymentType"
                value={'PAID'}
                onChange={console.log}
                label="Payment type"
                list={paymentTypeRadioList}
              />
              <RadioGroup
                name="PaymentTerms"
                value={'PAID'}
                onChange={console.log}
                label="Payment terms"
                list={paymentTerms}
              />
              <div className={css.paymentRange}>
                <div className={css.paymentRangeTitle}>Payment range</div>
                <div className={css.paymentRangeInputs}>
                  <Input variant="outline" label="Minimum" placeholder="minimum" />
                  <Input variant="outline" label="Maximum" placeholder="maximum" />
                </div>
                <div className={css.priceNotifying}>Prices will be shown in USD ($)</div>
              </div>
            </div>
          </Divider>
          <Divider title="Experience & skills" divider="space">
            <div className={css.dividerContainer}>
              <Dropdown
                label="Experience level"
                placeholder="Experience level"
                list={jobLength}
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
