import { QuestionsRes } from '../../../../../core/types';
import { Job } from '../../../../../components/organisms/job-list/job-list.types';

export type OverviewProps = {
  data: Job;
  questions: QuestionsRes[];
  updateApplicantList: () => void;
};
