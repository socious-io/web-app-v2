import { Question } from 'src/core/api';

export interface ScreenQuestionProps {
  question: Question;
  index: number;
  handleDelete: (index: number) => void;
  handleEdit: (index: number) => void;
}
