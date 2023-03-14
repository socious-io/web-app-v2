import { noEmptyString } from './../../../core/form/customValidators/customValidators';
import { required } from '../../../core/form';
import { website } from '../../../core/form/customValidators/customValidators';
import { FormModel } from '../../../core/form/useForm/useForm.types';

export const formModel: FormModel = {
  cover_letter: {
    initialValue: '',
    validators: [noEmptyString()],
  },
  cv_link: { initialValue: '', validators: [website()] },
  cv_name: { initialValue: '' },
};
