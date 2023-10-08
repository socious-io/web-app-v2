import { number } from 'src/core/form/customValidators/customValidators';
import { required } from '../../core/form';
import { FormModel } from '../../core/form/useForm/useForm.types';

export const formModel: FormModel = {
  // TODO add start and end date
  total_hours: {
    initialValue: '',
    validators: [required(), number()],
  },
};
