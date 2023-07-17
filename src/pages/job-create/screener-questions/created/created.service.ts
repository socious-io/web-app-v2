import { post } from 'src/core/http';

export async function removeCreateQuestion(payload: { project_id: string; question_id: string }) {
  return post(`/projects/remove/${payload.project_id}/questions/${payload.question_id}`, {}).then(({ data }) => data);
}
