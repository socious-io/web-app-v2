import { QuestionsRes } from '../../../../../../core/types';
import { Job } from '../../../../../organisms/job-list/job-list.types';

export type OverviewProps = {
  data: Job;
  questions: QuestionsRes[]
};
