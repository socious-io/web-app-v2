import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Question } from 'src/core/types';
import { CreateQuestionWizard, setCreatedQuestions } from 'src/store/reducers/createQuestionWizard.reducer';
import { RootState } from 'src/store/store';

import { removeCreateQuestion } from './created.service';


export const useCreatedShared = (userQuestions: Question[]) => {
  const dispatch = useDispatch();

  const formState = useSelector<RootState, CreateQuestionWizard>((state) => state.createQuestionWizard);
  useEffect(() => {
    setFormState();
  }, [userQuestions]);
  function setFormState() {
    const questions = userQuestions.map((question, index) => ({
      id: `Question ${index + 1}`,
      type: question.options ? 'MULTIPLE' : 'TEXT',
      question: question.question,
      required: question.required,
      options: question.options,
    }));
    dispatch(setCreatedQuestions(questions));
  }
  async function onRemoveCreatedQuestion({ questionId, projectId }: { questionId: string; projectId: string }) {
    dispatch(setCreatedQuestions(formState.created_questions.filter((_) => _.id !== questionId)));
    await removeCreateQuestion({ questionId, projectId });
  }

  return { questions: formState.created_questions, onRemoveCreatedQuestion, setFormState };
};
