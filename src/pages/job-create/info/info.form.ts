import { required } from '../../../core/form';
import { FormModel } from '../../../core/form/useForm/useForm.types';
import { CreatePostWizard } from '../../../store/reducers/createPostWizard.reducer';

export function formModel(formState: CreatePostWizard): FormModel {
  return {
    title: {
      initialValue: formState.title,
      validators: [required()],
    },
    job_category_id: {
      initialValue: formState.job_category_id,
      validators: [required()],
    },
    description: {
      initialValue: formState.description,
      validators: [required()],
    },
    country: {
      initialValue: formState.country,
      validators: [required()],
    },
    city: {
      initialValue: formState.city,
      validators: [required()],
    },
    remote_preference: {
      initialValue: formState.remote_preference,
      validators: [required()],
    },
    project_type: {
      initialValue: formState.project_type,
      validators: [required()],
    },
    project_length: {
      initialValue: formState.project_length,
      validators: [required()],
    },
    experience_level: {
      initialValue: formState.experience_level,
      validators: [required()],
    },
  };
}
