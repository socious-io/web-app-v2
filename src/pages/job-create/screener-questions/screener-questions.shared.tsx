import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { CreateQuestionWizard, setAddChoices, setChoices } from 'src/store/reducers/createQuestionWizard.reducer';
import { useForm } from 'src/core/form';
import { formModel } from './screener-questions.form';
import { updateForm } from './screener-questions.service';

export const useScreenerQuestionsShared = () => {
  const navigate = {};
  const dispatch = useDispatch();
  const formState = useSelector<RootState, CreateQuestionWizard>((state) => state.createQuestionWizard);
  const memoizedFormState = useMemo(() => formModel(formState), [formState.question_type, formState.add_choices]);
  const form = useForm(memoizedFormState);
  const updateField = updateForm(dispatch);
  const addChoicesInValid = formState.add_choices <= 1 || formState.add_choices > 5;
  const isDisabledAddQuestion =
    formState.question_type === 'MULTIPLE' ? !form.isValid || addChoicesInValid : !form.isValid;
  const question = {
    id: `Question ${formState.created_questions?.length + 1}`,
    type: formState.question_type,
    question: formState.question,
    required: formState.required_question,
    options: Object.keys(formState.choices).map((key) => form.controls[key]?.value),
  };

  Object.keys(formModel(formState)).forEach((prop) => {
    const p = prop as keyof ReturnType<typeof formModel>;
    form.controls[prop].subscribe((v) => {
      updateField(p, v);
    });
  });

  function onAddChoice() {
    dispatch(setAddChoices(formState.add_choices + 1));
    const keys = Object.keys(formState.choices);
    const lastKey = Number(keys.sort()[keys.length - 1]) || 0;
    dispatch(setChoices({ ...formState.choices, [lastKey + 1]: '' }));
  }

  function onRemoveChoice(selectedKey: string) {
    const validChoices = Object.keys(formState.choices)
      .filter((key) => key !== selectedKey)
      .reduce((all, key) => ({ ...all, [key]: formState.choices[key] }), {});
    dispatch(setChoices({ ...validChoices }));
    dispatch(setAddChoices(formState.add_choices - 1));
  }

  function onReset() {
    dispatch(setAddChoices(0));
    dispatch(setChoices({}));
  }

  return { navigate, dispatch, formState, form, question, onAddChoice, onRemoveChoice, onReset, isDisabledAddQuestion };
};
