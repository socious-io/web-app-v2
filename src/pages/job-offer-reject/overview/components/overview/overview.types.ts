import { QuestionsRes } from 'src/core/types';
import { Job } from 'src/components/organisms/job-list/job-list.types';

export type OverviewProps = {
  data: Job;
  questions: QuestionsRes[];
  updateApplicantList: () => void;
};
