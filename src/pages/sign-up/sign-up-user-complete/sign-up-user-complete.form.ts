import { required } from '../../../core/form';
import { FormModel } from '../../../core/form/useForm/useForm.types';

const formModel: FormModel = {
  firstName: {
    initialValue: '',
    validators: [required()],
  },
  lastName: {
    initialValue: '',
    validators: [required()],
  },
};
