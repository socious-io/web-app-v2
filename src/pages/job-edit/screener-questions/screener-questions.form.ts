import { noEmptyString } from 'src/core/form/customValidators/customValidators';
import { FormModel } from 'src/core/form/useForm/useForm.types';
import { CreateQuestionWizard } from 'src/store/reducers/createQuestionWizard.reducer';

export function formModel(formState: CreateQuestionWizard): FormModel {
  const choicesValidation = Object.keys(formState.choices).map((key) => {
    return {
      [key]: {
        initialValue: formState?.choices[key] || '',
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
