import { QuestionReq } from 'src/core/api';

export interface CreateScreenQuestionProps {
  addQuestion: (q: QuestionReq) => void;
  cancel: () => void;
}
