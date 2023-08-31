import { post } from 'src/core/http';

export async function removeCreateQuestion(payload: { projectId: string; questionId: string }) {
  return post(`/projects/remove/${payload.projectId}/questions/${payload.questionId}`, {}).then(({ data }) => data);
}
