import { min, pattern, required } from '../../../core/form';
import { noEmptyString, number } from '../../../core/form/customValidators/customValidators';
import { FormModel } from '../../../core/form/useForm/useForm.types';

export const formModel = (isPaid: boolean, isFiat: boolean): FormModel => {
  const patternNumber = pattern('patternName', /^[+-]?\d+(\.\d+)?$/, 'value should be a number');
  const assignTotalPaid = isFiat
    ? [required(), min(22, 'Amount for fiat mode should not be less than 22$'), patternNumber]
    : [required(), patternNumber];
  const assignTotalValidators = isPaid ? assignTotalPaid : [patternNumber];
  return {
    assignmentTotal: { initialValue: '', validators: assignTotalValidators },
    estimatedTotalHours: { initialValue: '', validators: [required(), patternNumber] },
    message: { initialValue: '', validators: [noEmptyString()] },
  };
};
