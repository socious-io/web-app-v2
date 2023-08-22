import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { CreatePostWizard } from 'src/store/reducers/createPostWizard.reducer';
import { CreateQuestionWizard } from 'src/store/reducers/createQuestionWizard.reducer';

export const useReviewShared = () => {
  const dispatch = useDispatch();
  const formState = useSelector<RootState, CreatePostWizard>((state) => state.createPostWizard);
  const questions = useSelector<RootState, CreateQuestionWizard>((state) => state.createQuestionWizard);
  return {
    formState,
    questions,
  };
};
