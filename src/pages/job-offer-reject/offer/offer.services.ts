import { min, required } from '../../../core/form';
import { noEmptyString, number } from '../../../core/form/customValidators/customValidators';
import { FormModel } from '../../../core/form/useForm/useForm.types';

export const formModel = (isPaid: boolean, isFiat: boolean): FormModel => {
  const assignTotalPaid = isFiat
    ? [required(), number(), min(22, 'Amount for fiat mode should not be less than 22$')]
    : [required(), number()];
  const assignTotalValidators = isPaid ? assignTotalPaid : [number()];
  return {
    assignmentTotal: { initialValue: '', validators: assignTotalValidators },
    estimatedTotalHours: { initialValue: '', validators: [required(), number()] },
    message: { initialValue: '', validators: [noEmptyString()] },
  };
};
