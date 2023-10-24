import { removeQuestionJob } from 'src/core/api';

export async function removeCreateQuestion(payload: { project_id: string; question_id: string }) {
  return removeQuestionJob(payload.project_id, payload.question_id);
}
