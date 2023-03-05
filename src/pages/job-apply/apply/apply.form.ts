import { required } from '../../../core/form';
import { FormModel } from '../../../core/form/useForm/useForm.types';

export const formModel: FormModel = {
  cover_letter: { initialValue: '', validators: [required()] },
  cv_link: { initialValue: '' },
  cv_name: { initialValue: '' },
};
