import { QuestionsRes } from '../../../core/types';
import { Job } from '../../organisms/job-list/job-list.types';

export type Loader = {
  jobOverview: Job;
  screeningQuestions: { questions: QuestionsRes[] };
};
