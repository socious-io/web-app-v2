import { required } from '../../../core/form';
import { FormModel } from '../../../core/form/useForm/useForm.types';

export const formModel: FormModel = {
//   paymentType: { initialValue: '', validators: [required()] },
//   paymentMode: { initialValue: '', validators: [required()] },
  estimatedTotalHours: { initialValue: '', validators: [required()] },
  message: { initialValue: '', validators: [required()] },
};
