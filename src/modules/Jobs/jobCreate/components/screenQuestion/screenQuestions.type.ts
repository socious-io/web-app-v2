import { Question } from 'src/core/types';

export interface ScreenQuestionProps {
  question: Question;
  index: number;
  handleDelete: (index: number) => void;
  handleEdit: (index: number) => void;
}
