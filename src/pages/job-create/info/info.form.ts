import { required } from '../../../core/form';
import { FormModel } from '../../../core/form/useForm/useForm.types';
import { CreatePostWizard } from '../../../store/reducers/createPostWizard.reducer';

export function formModel(formState: CreatePostWizard): FormModel {
  return {
    job_title: {
      initialValue: formState.title,
      validators: [required()],
    },
    job_category_id: {
      initialValue: formState.title,
      validators: [required()],
    },
  };
}
