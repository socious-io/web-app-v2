import { get } from 'src/core/http';
import { min, pattern, required } from '../../../core/form';
import { noEmptyString, number } from '../../../core/form/customValidators/customValidators';
import { FormModel } from '../../../core/form/useForm/useForm.types';

type InitialFormType = {
  estimatedTotalHours: string;
  message: string;
  weeklyLimit:string
  job:string
};

export const formModel = (isPaid: boolean, isFiat: boolean, initialForm: InitialFormType): FormModel => {
  const patternNumber = pattern('patternName', /^[+-]?\d+(\.\d+)?$/, 'value should be a number');
  const assignTotalPaid = isFiat
    ? [required(), min(22, 'Amount for fiat mode should not be less than 22$'), patternNumber]
    : [required(), patternNumber];
  const assignTotalValidators = isPaid ? assignTotalPaid : [];
  return {
    assignmentTotal: { initialValue: '', validators: assignTotalValidators },
    estimatedTotalHours: { initialValue: initialForm.estimatedTotalHours || '', validators: [required(), patternNumber] },
    message: { initialValue: initialForm.message || '', validators: [noEmptyString()] },
    weeklyLimit: { initialValue: '' },
    job: { initialValue: '' },
  };
};

export async function findTokenRate(id: string) {
  return get(`/payments/crypto/rate?token=${id}`).then(({ data }) => data);
}
