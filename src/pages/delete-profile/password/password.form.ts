import { minLength } from './../../../core/form/useForm/validations';
import { required } from '../../../core/form';
import { FormModel } from '../../../core/form/useForm/useForm.types';

export const formModel: FormModel = {
  password: {
    initialValue: '',
    validators: [required(), minLength(6)],
  },
};
