import { get } from 'src/core/http';
import { min, pattern, required } from '../../../core/form';
import { noEmptyString, number } from '../../../core/form/customValidators/customValidators';
import { FormModel } from '../../../core/form/useForm/useForm.types';

type InitialFormType = {
  estimatedTotalHours: string;
  message: string;
  weekly_limit:string
};

export const formModel = (isHourly:boolean,isPaid: boolean, isFiat: boolean, initialForm: InitialFormType): FormModel => {
  const patternNumber = pattern('patternName', /^[+-]?\d+(\.\d+)?$/, 'value should be a number');
  const assignTotalPaid = isFiat
    ? [required(), min(22, 'Amount for fiat mode should not be less than 22$'), patternNumber]
    : [required(), patternNumber];
  const assignTotalValidators = isPaid ? assignTotalPaid : [];
  const weeklyLimitValidators =  isHourly ? [required()] : [];
  const estimatedTotalHoursValidators =  isHourly ? [] : [required(), patternNumber];
  return {
    assignmentTotal: { initialValue: '', validators: assignTotalValidators },
    estimatedTotalHours: { initialValue: initialForm.estimatedTotalHours || '', validators: estimatedTotalHoursValidators },
    message: { initialValue: initialForm.message || '', validators:[noEmptyString()]  },
    weekly_limit: { initialValue: '',validators:weeklyLimitValidators },
  };
};

export async function findTokenRate(id: string) {
  return get(`/payments/crypto/rate?token=${id}`).then(({ data }) => data);
}
