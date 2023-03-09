import { required } from '../../../core/form';
import { website } from '../../../core/form/customValidators/customValidators';
import { FormModel } from '../../../core/form/useForm/useForm.types';

export const formModel: FormModel = {
  cover_letter: {
    initialValue: '',
    validators: [
      {
        name: 'bla',
        message: 'blaaaa',
        validateWith: (value: string) => {
            console.log(value.trim().length > 0)
          return value.trim().length > 0;
        },
      },
    ],
  },
  cv_link: { initialValue: '', validators: [website()] },
  cv_name: { initialValue: '' },
};
