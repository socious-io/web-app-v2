import { required } from 'src/core/form';
import { FormModel } from 'src/core/form/useForm/useForm.types';

export const formModel: FormModel = {
  country: {
    initialValue: '',
    validators: [required()],
  },
};
