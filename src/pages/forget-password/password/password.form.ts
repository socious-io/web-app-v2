import { minLength, required } from '../../../core/form';
import { FormModel } from '../../../core/form/useForm/useForm.types';

const passwordValidations = [
  required(),
  minLength(8),
  {
    name: 'oneNumber',
    message: 'password should contain at least one number',
    validateWith: (value: string) => /\d/.test(value),
  },
  {
    name: 'oneLowercase',
    message: 'password should contain at least one lowercase',
    validateWith: (value: string) => /(?=.*[a-z])/.test(value),
  },
  {
    name: 'oneUppercase',
    message: 'password should contain at least one uppercase',
    validateWith: (value: string) => /(?=.*[A-Z])/.test(value),
  },
];

export const formModel: FormModel = {
  newPassword: {
    initialValue: '',
    validators: passwordValidations,
  },
  confirmPassword: {
    initialValue: '',
    validators: passwordValidations,
  },
};
