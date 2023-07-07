import { Job } from 'src/components/organisms/job-list/job-list.types';
import { QuestionsRes } from 'src/core/types';

export type JobDetailCardProps = {
  job: Job;
  screeningQuestions: QuestionsRes['questions'];
  location: string;
  userType: 'organizations' | 'users';
};
