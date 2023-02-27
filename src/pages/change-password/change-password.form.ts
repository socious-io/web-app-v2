import { required, minLength } from '../../core/form';
import { FormModel } from '../../core/form/useForm/useForm.types';

export const formModel: FormModel = {
  current_password: {
    initialValue: '',
    validators: [
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
    ],
  },
  password: {
    initialValue: '',
    validators: [
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
    ],
  },
  confirm_new_password: {
    initialValue: '',
    validators: [required(), minLength(8, 'Incorrect password')],
  },
};
