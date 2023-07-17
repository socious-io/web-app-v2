import { useMemo } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { CreateQuestionWizard } from 'src/store/reducers/createQuestionWizard.reducer';
import { useForm } from 'src/core/form';
import { formModel } from './screener-questions.form';
import { updateForm } from './screener-questions.service';

export const useScreenerQuestionsShared = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formState = useSelector<RootState, CreateQuestionWizard>((state) => state.createQuestionWizard);
  const memoizedFormState = useMemo(() => formModel(formState), [formState.question_type, formState.add_choices]);
  const form = useForm(memoizedFormState);
  const updateField = updateForm(dispatch);
  const question = {
    id: `Question ${formState.created_questions?.length + 1}`,
    type: formState.question_type,
    question: formState.question,
    required: formState.required_question,
    options: Array.from({ length: formState.add_choices }).map(
      (_, index) => form.controls[`choice-${index + 1}`]?.value
    ),
  };

  Object.keys(formModel(formState)).forEach((prop) => {
    const p = prop as keyof ReturnType<typeof formModel>;
    form.controls[prop].subscribe((v) => {
      updateField(p, v);
    });
  });

  return { navigate, dispatch, formState, form, question };
};
