import { noEmptyString } from 'src/core/form/customValidators/customValidators';
import { CreateQuestionWizard } from 'src/store/reducers/createQuestionWizard.reducer';
import { FormModel } from 'src/core/form/useForm/useForm.types';

export function formModel(formState: CreateQuestionWizard): FormModel {
  const choicesValidation = Array.from({ length: formState.add_choices }).map((_, index) => {
    return {
      [`choice-${index + 1}`]: {
        initialValue: formState?.choices[`choice-${index + 1}`] || '',
        validators: [noEmptyString()],
      },
    };
  });
  
  const formModelObjects = {
    question: {
      initialValue: formState.question,
      validators: [noEmptyString()],
    },
  };

  return formState.question_type === 'TEXT' ? formModelObjects : Object.assign(formModelObjects, ...choicesValidation);
}
