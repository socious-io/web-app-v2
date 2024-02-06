import { QuestionReq } from 'src/core/api';

export interface ScreenQuestionProps {
  question: QuestionReq;
  index: number;
  handleDelete: (index: number) => void;
}
