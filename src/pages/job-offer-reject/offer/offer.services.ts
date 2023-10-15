import { tokenRate } from 'src/core/api';
import { min, pattern, required } from 'src/core/form';
import { noEmptyString } from 'src/core/form/customValidators/customValidators';
import { FormModel } from 'src/core/form/useForm/useForm.types';

type InitialFormType = {
  estimatedTotalHours: string;
  message: string;
};

export const formModel = (isPaid: boolean, isFiat: boolean, initialForm: InitialFormType): FormModel => {
  const patternNumber = pattern('patternName', /^[+-]?\d+(\.\d+)?$/, 'value should be a number');
  const assignTotalPaid = isFiat
    ? [required(), min(22, 'Amount for fiat mode should not be less than 22$'), patternNumber]
    : [required(), patternNumber];
  const assignTotalValidators = isPaid ? assignTotalPaid : [];
  return {
    assignmentTotal: { initialValue: '', validators: assignTotalValidators },
    estimatedTotalHours: {
      initialValue: initialForm.estimatedTotalHours || '',
      validators: [required(), patternNumber],
    },
    message: { initialValue: initialForm.message || '', validators: [noEmptyString()] },
  };
};

export async function findTokenRate(id: string) {
  return tokenRate(id);
}
