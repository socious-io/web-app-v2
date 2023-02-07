import { get } from '../../../core/http';
import { QuestionsRes } from '../../../core/types';

export async function getScreeningQuestions(id: string): Promise<QuestionsRes> {
  return get(`projects/${id}/questions`).then(({ data }) => data);
}
