import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import {
  CreateQuestionWizard,
  CreatedQuestionsType,
  setCreatedQuestions,
} from 'src/store/reducers/createQuestionWizard.reducer';
import { removeCreateQuestion } from './created.service';

export const useCreatedShared = () => {
  const dispatch = useDispatch();
  const formState = useSelector<RootState, CreateQuestionWizard>((state) => state.createQuestionWizard);

  function onRemoveCreatedQuestion(question: CreatedQuestionsType) {
    dispatch(setCreatedQuestions(formState.created_questions.filter((_) => _.id !== question.id)));
    removeCreateQuestion(formState.question_project_id);
  }

  return { questions: formState.created_questions, onRemoveCreatedQuestion };
};
