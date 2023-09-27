import { Job } from '../../../../../components/organisms/job-list/job-list.types';
import { QuestionsRes } from '../../../../../core/types';

export type OverviewProps = {
  data: Job;
  questions: QuestionsRes[];
  updateApplicantList: () => void;
};
