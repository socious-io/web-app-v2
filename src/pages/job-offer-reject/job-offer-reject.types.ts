import { MissionsResp, Offer, Pagination, QuestionsRes, UserApplicantResp } from '../../core/types';
import { Job } from '../../components/organisms/job-list/job-list.types';

export type Loader = {
  offerOverview: Offer;
  jobOverview: Job;
  screeningQuestions: { questions: QuestionsRes[] };
  reviewList: Pagination<UserApplicantResp[]>;
  declinedList: Pagination<UserApplicantResp[]>;
  hiredList: MissionsResp;
  endHiredList: MissionsResp;
  sent: Pagination<Offer[]>;
  approved: Pagination<Offer[]>;
  hired: Pagination<Offer[]>;
  closed: Pagination<Offer[]>;
};
