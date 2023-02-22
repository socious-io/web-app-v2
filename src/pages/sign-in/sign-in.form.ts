import { required } from '../../core/form';
import { email } from '../../core/form/customValidators/customValidators';
import { FormModel } from '../../core/form/useForm/useForm.types';

export const formModel: FormModel = {
  email: {
    initialValue: '',
    disabled: false,
    validators: [required(), email()],
  },
  password: {
    initialValue: '',
    disabled: false,
    validators: [
      {
        name: 'required',
        message: 'required',
        validateWith: (value: string) => value,
      },
    ],
  },
};
