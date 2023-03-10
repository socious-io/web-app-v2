import { required } from '../../../core/form';
import { noEmptyString, number } from '../../../core/form/customValidators/customValidators';
import { FormModel } from '../../../core/form/useForm/useForm.types';

export const formModel: FormModel = {
  estimatedTotalHours: { initialValue: '', validators: [required(), number()] },
  message: { initialValue: '', validators: [noEmptyString()] },
};
