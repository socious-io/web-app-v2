import { MissionsResp, Pagination, QuestionsRes, UserApplicantResp } from '../../../core/types';
import { Job } from '../../organisms/job-list/job-list.types';

export type Loader = {
  jobOverview: Job;
  screeningQuestions: { questions: QuestionsRes[] };
  reviewList: Pagination<UserApplicantResp[]>;
  declinedList: Pagination<UserApplicantResp[]>;
  hiredList: MissionsResp;
  endHiredList: MissionsResp;
};
