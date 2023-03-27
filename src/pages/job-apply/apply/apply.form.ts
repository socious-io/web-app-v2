import { noEmptyString } from './../../../core/form/customValidators/customValidators';
import { required } from '../../../core/form';
import { website } from '../../../core/form/customValidators/customValidators';
import { FormModel } from '../../../core/form/useForm/useForm.types';
import { QuestionsRes } from 'src/core/types';

export function generateFormModel(questions: QuestionsRes['questions']): FormModel {
  const obj = {
    cover_letter: {
      initialValue: '',
      validators: [noEmptyString()],
    },
    cv_link: { initialValue: '', validators: [website()] },
    cv_name: { initialValue: '' },
  };

  questions.forEach((q) => {
    Object.assign(obj, { [q.id]: { initialValue: '', validators: [] } });
    if (q.required) {
      obj[q.id].validators.push(required());
    }
  });
  return obj;
}
