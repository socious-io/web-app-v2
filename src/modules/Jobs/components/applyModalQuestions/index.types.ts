import { Answer } from 'src/core/api';

export interface ApplyModalQuestionsProps {
  answers: Answer[];
  setAnswers: (newVal: Answer[]) => void;
  questionErrors: { id: string; message: string }[];
}
