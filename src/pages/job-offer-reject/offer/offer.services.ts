import { get } from 'src/core/http';
import { min, pattern, required } from '../../../core/form';
import { noEmptyString, number } from '../../../core/form/customValidators/customValidators';
import { FormModel } from '../../../core/form/useForm/useForm.types';

type InitialFormType = {
  estimatedTotalHours: string;
  message: string;
  weeklyLimit:string
  job:string
  paid_hourly_rate:string
};

export const formModel = (isHourly:boolean,isPaid: boolean, isFiat: boolean, initialForm: InitialFormType): FormModel => {
  const patternNumber = pattern('patternName', /^[+-]?\d+(\.\d+)?$/, 'value should be a number');
  const assignTotalPaid = isFiat
    ? [required(), min(22, 'Amount for fiat mode should not be less than 22$'), patternNumber]
    : [required(), patternNumber];
  const assignTotalValidators = isPaid && !isHourly ? assignTotalPaid : [];
  const estimatedTotalHoursValidators =  !isHourly ? [required(), patternNumber] : [];
  const messageValidators =  !isHourly ? [noEmptyString()] : [];
  const weeklyLimitValidators =  isHourly ? [required()] : [];
  const jobValidators =  isHourly ? [required()] : [];
  const paid_hourly_rateValidators =  isHourly ? [required()] : [];
  return {
    assignmentTotal: { initialValue: '', validators: assignTotalValidators },
    estimatedTotalHours: { initialValue: initialForm.estimatedTotalHours || '', validators: estimatedTotalHoursValidators },
    message: { initialValue: initialForm.message || '', validators:messageValidators  },
    weeklyLimit: { initialValue: '',validators:weeklyLimitValidators },
    job: { initialValue: '',validators:jobValidators },
    paid_hourly_rate: { initialValue: '',validators:paid_hourly_rateValidators },
  };
};

export async function findTokenRate(id: string) {
  return get(`/payments/crypto/rate?token=${id}`).then(({ data }) => data);
}
