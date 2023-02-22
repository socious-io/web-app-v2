import { minLength, required } from '../../core/form';
import { email } from '../../core/form/customValidators/customValidators';
import { FormModel } from '../../core/form/useForm/useForm.types';

export const formModel: FormModel = {
  email: {
    initialValue: '',
    validators: [required(), email()],
  },
  password: {
    initialValue: '',
    validators: [required(), minLength(6, 'Incorrect password')],
  },
};
